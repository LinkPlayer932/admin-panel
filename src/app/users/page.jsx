"use client";
import { useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Editor",
    avatar: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);
    setForm({ ...form, avatar: imgUrl });
  };

  const handleSubmit = () => {
    if (editUser) {
      setUsers(users.map((u) => (u.id === editUser.id ? { ...u, ...form } : u)));
    } else {
      setUsers([...users, { id: Date.now(), ...form }]);
    }

    setForm({ name: "", email: "", role: "Editor", avatar: "" });
    setEditUser(null);
    setShowForm(false);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const openEdit = (user) => {
    setEditUser(user);
    setForm(user);
    setShowForm(true);
  };

  return (
    <div className="ml-[250px] p-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <button
        onClick={() => {
          setEditUser(null);
          setForm({ name: "", email: "", role: "Editor", avatar: "" });
          setShowForm(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
      >
        + Add User
      </button>

      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Avatar</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-3">
                  <img
                    src={u.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="p-3 font-semibold">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {u.role}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => openEdit(u)}
                    className="text-blue-600 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="p-3 text-gray-500 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 w-[400px] rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              {editUser ? "Edit User" : "Add User"}
            </h2>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-2 mb-3 rounded"
            />

            <input type="file" accept="image/*" onChange={handleImage} />

            {form.avatar && (
              <img
                src={form.avatar}
                className="w-20 h-20 rounded-full mt-3 object-cover"
              />
            )}

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border p-2 mt-3 rounded"
            >
              <option>Editor</option>
              <option>Admin</option>
              <option>Author</option>
            </select>

            <div className="flex justify-end mt-5">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 mr-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
