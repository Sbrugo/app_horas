"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { createClient } from "@/lib/supabase/client"; // Keep createClient for user auth
import { useClasses } from "@/context/ClassesContext";

export default function DashboardPage() {
  const {
    classes,
    loading: classesLoading,
    error: classesError,
  } = useClasses();
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

  useEffect(() => {
    if (!classesLoading && !classesError && classes) {
      const currentMonthIndex = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const monthlyStats = classes.reduce(
        (acc, c) => {
          const classDate = new Date(c.date);
          if (
            classDate.getMonth() === currentMonthIndex &&
            classDate.getFullYear() === currentYear
          ) {
            if (c.status === "Asistió") {
              acc.classesGiven++;
            } else if (c.status === "Cancelada por alumno") {
              acc.classesCanceledByStudent++;
            } else if (c.status === "Cancelada por profesor") {
              acc.classesCanceledByProfessor++;
            }
          }
          return acc;
        },
        {
          classesGiven: 0,
          classesCanceledByStudent: 0,
          classesCanceledByProfessor: 0,
        },
      );
      setStats(monthlyStats);
    }
  }, [classes, classesLoading, classesError]);

  if (userLoading || classesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (userError || classesError) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <p className="text-red-500">Error: {userError || classesError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hola, {professorName}
          </h1>
          <p className="text-lg text-gray-600 capitalize">{currentMonth}</p>
        </header>

        <div className="flex space-x-4 mb-8">
          <Link
            href="/dashboard/clases/nueva"
            className="w-fit px-4 py-2 flex items-center font-medium bg-lime-300 border border-lime-600 text-gray-950 rounded-4xl"
          >
            <span className="text-md text-gray-950">Nueva clase</span>
          </Link>
          <Link
            href="/dashboard/clases"
            className="w-fit px-4 py-3 text-gray-100 bg-blue-600 rounded-4xl border-blue-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="text-md text-gray-100">Ver clases</span>
          </Link>
        </div>

        <div className="mb-8 flex gap-6">
          <SummaryCard title="Dadas este mes" value={stats.classesGiven} />
          <SummaryCard
            title="Canceladas por alumno"
            value={stats.classesCanceledByStudent}
          />
          <SummaryCard
            title="Canceladas por profesor"
            value={stats.classesCanceledByProfessor}
          />
        </div>
      </div>
    </div>
  );
}
