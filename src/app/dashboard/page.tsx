import Link from "next/link";
import SummaryCard from "@/components/dashboard/SummaryCard";

export default function DashboardPage() {
  const professorName = "Tomás"; // Placeholder
  const currentMonth = new Date().toLocaleString("es-ES", {
    month: "long",
    year: "numeric",
  });

  // Placeholder data
  const stats = {
    classesGiven: 15,
    classesCanceledByStudent: 2,
    classesCanceledByProfessor: 1,
  };

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
            className="w-fit p-4 text-gray-100 bg-purple-600 rounded-xl border-purple-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <span className="text-md text-gray-100">Nueva clase</span>
          </Link>
          <Link
            href="/dashboard/clases"
            className="w-fit p-4 text-gray-100 bg-blue-600 rounded-xl border-blue-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="text-md text-gray-100">Ver clases</span>
          </Link>
        </div>

        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard
            title="Clases dadas este mes"
            value={stats.classesGiven}
          />
          <SummaryCard
            title="Clases canceladas por alumno"
            value={stats.classesCanceledByStudent}
          />
          <SummaryCard
            title="Clases canceladas por profesor"
            value={stats.classesCanceledByProfessor}
          />
        </div>
      </div>
    </div>
  );
}
