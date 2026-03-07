"use client";

import { useState } from "react";
import Link from "next/link";
import SummaryCard from "@/components/dashboard/SummaryCard";

const professors = ["Profesor A", "Profesor B", "Profesor C"];

const professorData: any = {
  "Profesor A": {
    classesGiven: 50,
    canceledByStudent: 5,
    canceledByProfessor: 2,
    frequentReasons: "Enfermedad (3), Viaje (2)",
    frequentDays: "Lunes 18hs (2)",
  },
  "Profesor B": {
    classesGiven: 60,
    canceledByStudent: 3,
    canceledByProfessor: 4,
    frequentReasons: "Trabajo (4)",
    frequentDays: "Miércoles 10hs (3)",
  },
};

export default function AdminByProfessorPage() {
  const [selectedProfessor, setSelectedProfessor] = useState("");

  const data = selectedProfessor ? professorData[selectedProfessor] : null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Administrador
          </h1>
        </header>

        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-4">
            <Link
              href="/admin/dashboard"
              className="px-3 py-2 font-medium text-gray-500 hover:text-gray-700"
            >
              A. Vista General
            </Link>
            <Link
              href="/admin/dashboard/por-profesor"
              className="px-3 py-2 font-medium text-indigo-600 border-b-2 border-indigo-600"
            >
              B. Vista por Profesor
            </Link>
            <Link
              href="/admin/dashboard/por-alumno"
              className="px-3 py-2 font-medium text-gray-500 hover:text-gray-700"
            >
              C. Vista por Alumno
            </Link>
          </nav>
        </div>

        {/* B. Vista por Profesor */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="select-professor"
              className="text-sm font-medium text-gray-700"
            >
              Seleccionar Profesor:
            </label>
            <select
              id="select-professor"
              value={selectedProfessor}
              onChange={(e) => setSelectedProfessor(e.target.value)}
              className="w-full max-w-xs mt-1 px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Seleccione --</option>
              {professors.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {data && (
            <div className="p-6 bg-white text-gray-950 rounded-lg shadow-md animate-fade-in">
              <h2 className="text-xl font-bold mb-4">{selectedProfessor}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SummaryCard title="Clases dadas" value={data.classesGiven} />
                <SummaryCard
                  title="Canceladas por alumno"
                  value={data.canceledByStudent}
                />
                <SummaryCard
                  title="Canceladas por profesor"
                  value={data.canceledByProfessor}
                />
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-semibold">Motivos más frecuentes:</h4>
                  <p>{data.frequentReasons}</p>
                </div>
                <div>
                  <h4 className="font-semibold">
                    Días/horarios con más cancelaciones:
                  </h4>
                  <p>{data.frequentDays}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
