"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  if (!emailOrUsername || !password) {
    return toast.error("All fields are required");
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrUsername, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return toast.error(data.message || "Invalid credentials");
    }

    toast.success("Login successful!");

    // 🔥 Save token in cookie (middleware-readable)
    document.cookie = `token=${data.token}; path=/; max-age=86400`;

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 800);

  } catch (error) {
    toast.error("Server error!");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster />
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 font-medium">Email / Username</label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter your email or username"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don't have an account?
            <a href="/signup" className="text-blue-600 hover:underline">
              {" "}
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
