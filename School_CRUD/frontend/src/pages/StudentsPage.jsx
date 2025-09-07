import React, { useEffect, useState } from "react";
import studentService from "../api/studentApi";
import classService from "../api/classApi"; // 👈 new service for classes

// 🔹 Simple Tailwind Button
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded font-medium transition ${
      props.variant === "outline"
        ? "border border-gray-400 text-gray-700 hover:bg-gray-100"
        : props.variant === "destructive"
        ? "bg-red-600 text-white hover:bg-red-700"
        : "bg-blue-600 text-white hover:bg-blue-700"
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

// 🔹 Simple Modal
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]); // 👈 all classes
  const [open, setOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "Male",
    street: "",
    city: "",
    state: "",
    zip: "",
    dateOfBirth: "",
    rollNumber: "",
    classId: "", // 👈 store only classId
  });

  // 🔹 Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await studentService.getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // 🔹 Fetch Classes
  const fetchClasses = async () => {
    try {
      const res = await classService.getClasses();
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // 🔹 Create or Update Student
  const handleSubmit = async () => {
    try {
      const payload = {
        fullName: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        phone: formData.phone,
        gender: formData.gender,
        rollNumber: formData.rollNumber,
        dateOfBirth: formData.dateOfBirth,
        class: formData.classId, // 👈 backend expects "class"
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
      };

      if (editingStudent) {
        await studentService.updateStudent(editingStudent._id, payload);
      } else {
        await studentService.createStudent(payload);
      }

      setOpen(false);
      setEditingStudent(null);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        gender: "Male",
        street: "",
        city: "",
        state: "",
        zip: "",
        dateOfBirth: "",
        rollNumber: "",
        classId: "",
      });
      fetchStudents();
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };
  // 🔹 Delete Student
  const handleDelete = async (id) => {
    try {
      await studentService.deleteStudent(id);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  // 🔹 Edit Student
  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      firstName: student.fullName.firstName,
      lastName: student.fullName.lastName || "",
      phone: student.phone,
      gender: student.gender,
      street: student.address?.street || "",
      city: student.address?.city || "",
      state: student.address?.state || "",
      zip: student.address?.zip || "",
      dateOfBirth: student.dateOfBirth?.split("T")[0] || "",
      rollNumber: student.rollNumber,
      classId: student.class?._id || "", // 👈 only id
    });
    setOpen(true);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students Management</h1>
        <Button
          onClick={() => {
            setEditingStudent(null);
            setFormData({
              firstName: "",
              lastName: "",
              phone: "",
              gender: "Male",
              street: "",
              city: "",
              state: "",
              zip: "",
              dateOfBirth: "",
              rollNumber: "",
              classId: "",
            });
            setOpen(true);
          }}
        >
          Add Student
        </Button>
      </div>

      {/* 🔹 Modal Form */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingStudent ? "Edit Student" : "Add Student"}
      >
        <div className="grid grid-cols-2 gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 rounded"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded col-span-2"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="Roll Number"
            className="border p-2 rounded col-span-2"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          />

          {/* 🔹 Dropdown for Class */}
          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.className} {c.section}
              </option>
            ))}
          </select>

          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            className="border p-2 rounded col-span-2"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 rounded"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-2 rounded"
          />
          <input
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="Zip"
            className="border p-2 rounded col-span-2"
          />
        </div>
        <Button onClick={handleSubmit} className="mt-4 w-full">
          {editingStudent ? "Update" : "Create"}
        </Button>
      </Modal>

      {/* 🔹 Students Table */}
      <div className="bg-zinc-500 shadow rounded-lg p-4 overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-black/80 text-white">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Roll</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">DOB</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students && students.length > 0 ? (
              students.map((s) => (
                <tr key={s._id}>
                  <td className="border px-4 py-2">
                    {s.fullName?.firstName} {s.fullName?.lastName}
                  </td>
                  <td className="border px-4 py-2">{s.rollNumber}</td>
                  <td className="border px-4 py-2">{s.phone}</td>
                  <td className="border px-4 py-2">{s.gender}</td>
                  <td className="border px-4 py-2">
                    {s.class?.className} {s.class?.section}
                  </td>
                  <td className="border px-4 py-2">
                    {s.dateOfBirth ? s.dateOfBirth.split("T")[0] : ""}
                  </td>
                  <td className="border px-4 py-2">
                    {s.address?.street}, {s.address?.city}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;
