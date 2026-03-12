"use client";

import { useState } from "react";
import Link from "next/link";
import SummaryCard from "@/components/dashboard/SummaryCard";

// Icons
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const XCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const UserXIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-yellow-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 17h8m-4-4v4m-4-4H3a2 2 0 01-2-2V5c0-1.1.9-2 2-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-5m-4 0a2 2 0 100 4 2 2 0 000-4z"
    />
  </svg>
);

const professors = ["Profesor A", "Profesor B", "Profesor C"];

const professorData: any = {
  "Profesor A": {
    classesGiven: 50,
    canceledByStudent: 5,
    canceledByProfessor: 2,
    history: [
      { date: "01/02", student: "Alumno X", status: "Asistió" },
      { date: "08/02", student: "Alumno Y", status: "Cancelada por alumno" },
      { date: "15/02", student: "Alumno Z", status: "Asistió" },
    ],
  },
  "Profesor B": {
    classesGiven: 45,
    canceledByStudent: 3,
    canceledByProfessor: 1,
    history: [
      { date: "02/02", student: "Alumno A", status: "Asistió" },
      { date: "09/02", student: "Alumno B", status: "Asistió" },
      { date: "16/02", student: "Alumno C", status: "Cancelada por profesor" },
    ],
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <SummaryCard
                  title="Clases dadas"
                  value={data.classesGiven}
                  icon={<CalendarIcon />}
                />
                <SummaryCard
                  title="Canceladas por alumno"
                  value={data.canceledByStudent}
                  icon={<UserXIcon />}
                />
                <SummaryCard
                  title="Canceladas por profesor"
                  value={data.canceledByProfessor}
                  icon={<XCircleIcon />}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Historial completo:</h4>
                  <ul className="list-disc list-inside">
                    {data.history.map((h: any, i: number) => (
                      <li key={i}>
                        {h.date} - {h.student} - {h.status}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

