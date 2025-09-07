import React, { useState, useEffect } from "react";
import teacherApi from "../api/teacherApi";
import classApi from "../api/classApi";

// 🔹 Tailwind Button
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

// 🔹 Modal Component
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] relative max-h-[90vh] overflow-y-auto">
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

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    fullName: { firstName: "", lastName: "" },
    email: "",
    phone: "",
    teachingAssignments: [{ class: "", subject: "" }],
  });

  // 🔹 Fetch teachers
  const fetchTeachers = async () => {
    try {
      const res = await teacherApi.getTeachers();
      setTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  // 🔹 Fetch classes for dropdown
  const fetchClasses = async () => {
    try {
      const res = await classApi.getClasses();
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, []);

  // 🔹 Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("fullName")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        fullName: { ...formData.fullName, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAssignmentChange = (index, field, value) => {
    const updated = [...formData.teachingAssignments];
    updated[index][field] = value;
    setFormData({ ...formData, teachingAssignments: updated });
  };

  const addAssignment = () => {
    setFormData({
      ...formData,
      teachingAssignments: [...formData.teachingAssignments, { class: "", subject: "" }],
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingTeacher) {
        await teacherApi.updateTeacher(editingTeacher._id, formData);
      } else {
        await teacherApi.createTeacher(formData);
      }
      setOpen(false);
      setEditingTeacher(null);
      setFormData({
        fullName: { firstName: "", lastName: "" },
        email: "",
        phone: "",
        teachingAssignments: [{ class: "", subject: "" }],
      });
      fetchTeachers();
    } catch (err) {
      console.error("Error saving teacher:", err);
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      fullName: teacher.fullName || { firstName: "", lastName: "" },
      email: teacher.email || "",
      phone: teacher.phone || "",
      teachingAssignments:
        teacher.teachingAssignments?.map((a) => ({
          class: a.class?._id || "",
          subject: a.subject || "",
        })) || [{ class: "", subject: "" }],
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await teacherApi.deleteTeacher(id);
      setTeachers(teachers.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting teacher:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teachers Management</h1>
        <Button
          onClick={() => {
            setEditingTeacher(null);
            setFormData({
              fullName: { firstName: "", lastName: "" },
              email: "",
              phone: "",
              teachingAssignments: [{ class: "", subject: "" }],
            });
            setOpen(true);
          }}
        >
          Add Teacher
        </Button>
      </div>

      {/* 🔹 Modal Form */}
      <Modal open={open} onClose={() => setOpen(false)} title={editingTeacher ? "Edit Teacher" : "Add Teacher"}>
        <div className="space-y-3">
          <input
            name="fullName.firstName"
            placeholder="First Name"
            value={formData.fullName.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="fullName.lastName"
            placeholder="Last Name"
            value={formData.fullName.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* Teaching Assignments */}
          <div>
            <h3 className="font-medium mb-2">Teaching Assignments</h3>
            {formData.teachingAssignments.map((a, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <select
                  value={a.class}
                  onChange={(e) => handleAssignmentChange(index, "class", e.target.value)}
                  className="border p-2 rounded w-1/2"
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.className} {cls.section}
                    </option>
                  ))}
                </select>
                <input
                  placeholder="Subject"
                  value={a.subject}
                  onChange={(e) => handleAssignmentChange(index, "subject", e.target.value)}
                  className="border p-2 rounded w-1/2"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addAssignment} className="text-blue-600 hover:underline text-sm">
              + Add another assignment
            </button>
          </div>

          <Button onClick={handleSubmit} className="mt-4 w-full">
            {editingTeacher ? "Update" : "Create"}
          </Button>
        </div>
      </Modal>

      {/* 🔹 Teachers Table */}
      <div className="bg-zinc-500 shadow rounded-lg p-4 overflow-x-auto mt-4">
        <table className="w-full border">
          <thead className="bg-black/80 text-white">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Assignments</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((t) => (
                <tr key={t._id}>
                  <td className="border px-4 py-2">{t.fullName?.firstName} {t.fullName?.lastName}</td>
                  <td className="border px-4 py-2">{t.email}</td>
                  <td className="border px-4 py-2">{t.phone}</td>
                  <td className="border px-4 py-2">
                    {t.teachingAssignments?.map((a, i) => (
                      <div key={i}>
                        <span className="font-medium">{a.subject}</span> → {a.class?.className} {a.class?.section}
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => handleEdit(t)}>
                      Edit
                    </button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(t._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachersPage;
