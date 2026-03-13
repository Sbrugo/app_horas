"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { createClient } from "@/lib/supabase/client";
// import { useClasses } from "@/context/ClassesContext";
import Clases from "@/components/clases/Clases";

// Icons
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

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

export default function DashboardPage() {
  const [professorName, setProfessorName] = useState("Profesor");
  const [stats, setStats] = useState({
    classesGiven: 0,
    classesCanceledByStudent: 0,
    classesCanceledByProfessor: 0,
  });
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);

  const currentMonth = new Date().toLocaleString("es-ES", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchUserName = async () => {
      const supabase = createClient();
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setProfessorName(
            user.user_metadata.full_name || user.email || "Profesor",
          );
        }
      } catch (error: any) {
        setUserError(error.message);
        console.error("Error fetching user name:", error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hola, {professorName}
          </h1>
          <p className="text-lg text-gray-600 capitalize">{currentMonth}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Dadas este mes"
            value={stats.classesGiven}
            icon={<CalendarIcon />}
          />
          <SummaryCard
            title="Canceladas por alumno"
            value={stats.classesCanceledByStudent}
            icon={<UserXIcon />}
          />
          <SummaryCard
            title="Canceladas por profesor"
            value={stats.classesCanceledByProfessor}
            icon={<XCircleIcon />}
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <Link
            href="/dashboard/clases/nueva"
            className="w-full sm:w-auto flex-grow sm:flex-grow-0 px-6 py-3 flex items-center justify-center font-medium bg-lime-400 text-gray-900 rounded-full shadow-sm hover:bg-lime-500 transition-colors"
          >
            <PlusIcon />
            <span className="ml-2">Nueva clase</span>
          </Link>
          <Link
            href="/dashboard/clases"
            className="w-full sm:w-auto flex-grow sm:flex-grow-0 px-6 py-3 flex items-center justify-center font-medium text-white bg-blue-600 rounded-full shadow-sm hover:bg-blue-700 transition-colors"
          >
            Ver clases
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Clases Recientes
          </h2>
          <Clases />
        </div>
      </main>
    </div>
  );
}
