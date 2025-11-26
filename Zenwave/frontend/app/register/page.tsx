/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await register(form.name, form.email, form.password);

    if (!res) return alert("Registration failed");

    router.push("/login");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-xl w-80 border border-white/20"
      >
        <h1 className="text-2xl font-bold mb-6">Register</h1>

        <input
          className="w-full p-2 mb-4 bg-black/30 rounded"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-2 mb-4 bg-black/30 rounded"
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-2 mb-6 bg-black/30 rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full py-2 bg-blue-500 rounded hover:bg-blue-400 transition">
          Register
        </button>
      </form>
    </div>
  );
}
