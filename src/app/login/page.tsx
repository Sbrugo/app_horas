"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email y DNI son obligatorios.");
      return;
    }

    const supabase = createClient();

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Email o DNI incorrectos.");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("Ocurrió un error inesperado. Por favor, intente de nuevo.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 m-10 rounded-2xl">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">SyR</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col items-center">
            <label
              htmlFor="email"
              className="text-md font-medium text-gray-700"
            >
              EMAIL
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-4xl shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex flex-col items-center">
            <label
              htmlFor="password"
              className="text-md font-medium text-gray-700"
            >
              DNI
            </label>
            <input
              id="password"
              name="password"
              type="tel"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-4xl shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-fit px-10 py-3 font-medium text-gray-950 bg-lime-300 border border-lime-600  rounded-4xl hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
