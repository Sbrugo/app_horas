"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError(null);
    setSuccess(null);

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

  const handleRegisterClick = async () => {
    if (!isRegistering) {
      setIsRegistering(true);
      return;
    }

    setError(null);
    setSuccess(null);

    if (!email || !password || !name) {
      setError("El Email y DNI son obligatorios para registrarse.");
      return;
    }

    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      console.log("Data session:", data.session);
      console.log("Data user:", data.user);

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        setSuccess(
          // "¡Registro exitoso! Revisa tu correo para confirmar la cuenta.",
          "¡Registro exitoso!",
        );
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Ocurrió un error inesperado. Por favor, intente de nuevo.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 m-10 rounded-2xl bg-white shadow-lg">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">SyR</h1>
          {name && <p className="text-gray-700 mb-4">Hola, {name}</p>}
        </div>
        <div className="space-y-6">
          {isRegistering && (
            <div className="flex flex-col items-center">
              <label
                htmlFor="name"
                className="text-md font-medium text-gray-700"
              >
                ¿Cuál querés que sea tu nombre de usuario?
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-4xl shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          )}
          {!isRegistering && (
            <>
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
            </>
          )}

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {success && (
            <p className="text-sm text-green-600 text-center">{success}</p>
          )}
          <div className="flex justify-center space-x-4">
            {!isRegistering && (
              <button
                type="button"
                onClick={handleLogin}
                className="w-fit px-10 py-3 font-medium text-gray-950 bg-lime-300 border border-lime-600  rounded-4xl hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
              >
                Ingresar
              </button>
            )}
            <button
              type="button"
              onClick={handleRegisterClick}
              className="w-fit px-10 py-3 font-medium text-gray-950 bg-gray-200 border border-gray-400  rounded-4xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {isRegistering ? "Continuar" : "Registrarse"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
