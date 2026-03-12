"use client";

import Link from "next/link";
import { useClasses } from "@/context/ClassesContext";
import Clases from "@/components/clases/Clases";

export default function MyClassesPage() {
  const { classes, loading, error } = useClasses();
  console.log("Clases en MyClassesPage:", classes);
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <p>Cargando clases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-fit mx-auto bg-white p-8 rounded-lg shadow-md">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Mis Clases (Vista Mensual)
          </h1>
          <Link
            href="/dashboard"
            className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Volver al Dashboard
          </Link>
        </header>

        <Clases></Clases>
      </div>
    </div>
  );
}
