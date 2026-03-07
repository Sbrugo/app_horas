"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !dni) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // This is a placeholder for the actual login logic.
    // You will need to implement the logic to authenticate the user
    // with Supabase. This might involve checking the DNI against a
    // 'professors' table and then signing in the user with email and password.

    console.log("Attempting to log in with:", { email, dni });
    alert("Funcionalidad de login no implementada. Redirigiendo al dashboard.");
    router.push("/dashboard");

    /*
    // Example Supabase login logic (you need to adapt this)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      // Additionally, you might want to verify the DNI against your tables
      // before redirecting.
      router.push('/dashboard')
    }
    */
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">SyR</h1>
          <h2 className="text-xl font-semibold text-gray-600">Login</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-md font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-md font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="dni" className="text-md font-medium text-gray-700">
              DNI
            </label>
            <input
              id="dni"
              name="dni"
              type="text"
              required
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-fit px-10 py-4 font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
