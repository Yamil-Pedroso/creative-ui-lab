/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(email, password);

      if (!data) throw new Error("Invalid credentials");

      // Redirigir
      router.push("/meditations");
    } catch (error: any) {
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-xl w-80 border border-white/20"
      >
        <h1 className="text-2xl font-bold mb-6 text-white">Login</h1>

        <input
          className="w-full p-2 mb-4 bg-black/30 rounded text-white"
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-6 bg-black/30 rounded text-white"
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full py-2 bg-purple-500 rounded hover:bg-purple-400 transition font-semibold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-white/70 text-sm mt-4 text-center">
          Don&apos;t have an account?
          <a href="/register" className="text-purple-300 ml-1 underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
