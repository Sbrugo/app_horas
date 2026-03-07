"use client";

import { useState } from "react";
import Link from "next/link";
import SummaryCard from "@/components/dashboard/SummaryCard";

const students = ["Alumno X", "Alumno Y", "Alumno Z"];

const studentData: any = {
  "Alumno X": {
    totalClasses: 20,
    canceledClasses: 5,
    history: [
      { date: "01/02", status: "Asistió" },
      { date: "08/02", status: "Cancelada", reason: "Viaje" },
      { date: "15/02", status: "Asistió" },
    ],
    observations: "Mejora notable en las últimas semanas.",
  },
  "Alumno Y": {
    totalClasses: 18,
    canceledClasses: 3,
    history: [
      { date: "02/02", status: "Asistió" },
      { date: "09/02", status: "Asistió" },
      { date: "16/02", status: "Cancelada", reason: "Enfermedad" },
    ],
    observations: "A veces olvida las tareas.",
  },
};

export default function AdminByStudentPage() {
  const [selectedStudent, setSelectedStudent] = useState("");

  const data = selectedStudent ? studentData[selectedStudent] : null;

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
              className="px-3 py-2 font-medium text-gray-500 hover:text-gray-700"
            >
              B. Vista por Profesor
            </Link>
            <Link
              href="/admin/dashboard/por-alumno"
              className="px-3 py-2 font-medium text-indigo-600 border-b-2 border-indigo-600"
            >
              C. Vista por Alumno
            </Link>
          </nav>
        </div>

        {/* C. Vista por Alumno */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="select-student"
              className="text-sm font-medium text-gray-700"
            >
              Seleccionar Alumno:
            </label>
            <select
              id="select-student"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full max-w-xs mt-1 px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Seleccione --</option>
              {students.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {data && (
            <div className="p-6 bg-white text-gray-950 rounded-lg shadow-md animate-fade-in">
              <h2 className="text-xl font-bold mb-4">{selectedStudent}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <SummaryCard title="Clases totales" value={data.totalClasses} />
                <SummaryCard
                  title="Clases canceladas"
                  value={data.canceledClasses}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Historial completo:</h4>
                  <ul className="list-disc list-inside">
                    {data.history.map((h: any, i: number) => (
                      <li key={i}>
                        {h.date} - {h.status} {h.reason ? `(${h.reason})` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Observaciones:</h4>
                  <p>{data.observations}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
