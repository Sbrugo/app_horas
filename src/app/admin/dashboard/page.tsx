import SummaryCard from "@/components/dashboard/SummaryCard";
import RankingList from "@/components/admin/RankingList";
import Link from "next/link";

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

export default function AdminDashboardPage() {
  // Placeholder data
  const totalClasses = 150;
  const totalCancellations = 25;

  const professorRanking = [
    { name: "Profesor A", value: 10 },
    { name: "Profesor B", value: 7 },
    { name: "Profesor C", value: 5 },
  ];

  const studentRanking = [
    { name: "Alumno X", value: 5 },
    { name: "Alumno Y", value: 3 },
    { name: "Alumno Z", value: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Administrador
          </h1>
        </header>

        {/* Main Tabs/Sections */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-4">
            <Link
              href="/admin/dashboard"
              className="px-3 py-2 font-medium text-purple-500 border-b-2 border-purple-500"
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
              className="px-3 py-2 font-medium text-gray-500 hover:text-gray-700"
            >
              C. Vista por Alumno
            </Link>
          </nav>
        </div>

        {/* A. Vista General */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SummaryCard
              title="Total de clases del mes"
              value={totalClasses}
              icon={<CalendarIcon />}
            />
            <SummaryCard
              title="Total de cancelaciones"
              value={totalCancellations}
              icon={<XCircleIcon />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RankingList
              title="Ranking de cancelaciones por profesor"
              items={professorRanking}
            />
            <RankingList
              title="Ranking de cancelaciones por alumno"
              items={studentRanking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
