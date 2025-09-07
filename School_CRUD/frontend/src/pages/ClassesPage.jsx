import React, { useEffect, useState } from "react";
import classService from "../api/classApi";

// Tailwind Button
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

// Modal Component
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

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    subjects: "",
  });

  // Fetch Classes
  const fetchClasses = async () => {
    try {
      const res = await classService.getClasses();
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingClass) {
        await classService.updateClass(editingClass._id, formData);
      } else {
        await classService.createClass(formData);
      }
      setOpen(false);
      setEditingClass(null);
      setFormData({ className: "", section: "", subjects: "" });
      fetchClasses();
    } catch (err) {
      console.error("Error saving class:", err);
    }
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setFormData({
      className: cls.className,
      section: cls.section,
      subjects: cls.subjects.join(", "),
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await classService.deleteClass(id);
      fetchClasses();
    } catch (err) {
      console.error("Error deleting class:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Classes Management</h1>
        <Button
          onClick={() => {
            setEditingClass(null);
            setFormData({ className: "", section: "", subjects: "" });
            setOpen(true);
          }}
        >
          Add Class
        </Button>
      </div>

      {/* Modal Form */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingClass ? "Edit Class" : "Add Class"}
      >
        <div className="grid grid-cols-2 gap-3">
          <input
            name="className"
            value={formData.className}
            onChange={handleChange}
            placeholder="Class Name"
            className="border p-2 rounded col-span-2"
          />
          <input
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="Section"
            className="border p-2 rounded col-span-2"
          />
          <input
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            placeholder="Subjects (comma separated)"
            className="border p-2 rounded col-span-2"
          />
        </div>
        <Button onClick={handleSubmit} className="mt-4 w-full">
          {editingClass ? "Update" : "Create"}
        </Button>
      </Modal>

      {/* Classes Table */}
      <div className="bg-zinc-500 shadow rounded-lg p-4 overflow-x-auto mt-4">
        <table className="w-full border">
          <thead className="bg-black/80 text-white ">
            <tr>
              <th className="border px-4 py-2">Class Name</th>
              <th className="border px-4 py-2">Section</th>
              <th className="border px-4 py-2">Subjects</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length > 0 ? (
              classes.map((cls) => (
                <tr key={cls._id}>
                  <td className="border px-4 py-2">{cls.className}</td>
                  <td className="border px-4 py-2">{cls.section}</td>
                  <td className="border px-4 py-2">{cls.subjects.join(", ")}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={() => handleEdit(cls)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(cls._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No classes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassesPage;
