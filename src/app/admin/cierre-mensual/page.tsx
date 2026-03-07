"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MonthlyClosingPage() {
  const [isButtonAvailable, setIsButtonAvailable] = useState(false);

  useEffect(() => {
    const dayOfMonth = new Date().getDate();
    // Available between day 28 and 30 (inclusive)
    if (dayOfMonth >= 28 && dayOfMonth <= 30) {
      setIsButtonAvailable(true);
    }
  }, []);

  const handleCloseMonth = () => {
    // In a real app, this would trigger a backend process
    console.log("Generating reports...");
    alert("Generando reportes... (funcionalidad no implementada)");
  };

  const handleExport = (format: "Excel" | "PDF") => {
    console.log(`Exporting ${format}...`);
    alert(`Exportando a ${format}... (funcionalidad no implementada)`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Cierre Mensual Automático
          </h1>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Volver al Dashboard
          </Link>
        </header>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="text-center text-gray-950">
            <h2 className="text-xl font-semibold mb-2">Acción</h2>
            <button
              onClick={handleCloseMonth}
              disabled={!isButtonAvailable}
              className={`w-fit px-6 py-4 my-2 font-medium text-white bg-rose-700 rounded-md hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-700 transition-colors ${
                isButtonAvailable ? "visibility-visible" : "visibility-hidden"
              }`}
            >
              Cerrar mes
            </button>
            <p className="mt-2 text-sm text-gray-500">
              (Disponible entre el día 28 y 30 del mes)
            </p>
          </div>

          <hr className="my-8" />

          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-950">
              El sistema genera:
            </h2>
            <div className="max-w-md mx-auto space-y-2">
              <p className="p-3 bg-gray-100 rounded-md">Resumen por profesor</p>
              <p className="p-3 bg-gray-100 rounded-md">Resumen por alumno</p>
              <p className="p-3 bg-gray-100 rounded-md">Totales generales</p>
            </div>
          </div>

          <hr className="my-8" />

          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-950">
              Opciones de exportación:
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleExport("Excel")}
                className="px-6 py-2 font-semibold text-white bg-lime-600 rounded-md hover:bg-lime-700"
              >
                Exportar Excel
              </button>
              <button
                onClick={() => handleExport("PDF")}
                className="px-6 py-2 font-semibold text-white bg-blue-800 rounded-md hover:bg-blue-900"
              >
                Exportar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
