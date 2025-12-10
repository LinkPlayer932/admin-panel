"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      return toast.error("All fields are required!");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      }

      toast.success("Account created successfully!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 800);
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster />
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
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

          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline">
              {" "}
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
