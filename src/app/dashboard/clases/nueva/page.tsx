"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const cancellationReasons = [
  "Viaje",
  "Enfermedad",
  "Trabajo",
  "Sin aviso",
  "Otro",
];

export default function NewClassPage() {
  const router = useRouter();
  const [student, setStudent] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [status, setStatus] = useState("Asistió");
  const [cancellationReason, setCancellationReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [observations, setObservations] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (date) {
      const dateObj = new Date(date + "T00:00:00"); // Ensure correct timezone handling
      const dayName = dateObj.toLocaleDateString("es-ES", { weekday: "long" });
      setDay(dayName);
    } else {
      setDay("");
    }
  }, [date]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!student || !date || !status) {
      setError("Alumno, Fecha y Estado son campos obligatorios.");
      return;
    }

    const isCancelled = status.startsWith("Cancelada");
    if (isCancelled && !cancellationReason) {
      setError("Debe seleccionar un motivo de cancelación.");
      return;
    }
    if (cancellationReason === "Otro" && !otherReason) {
      setError('Debe especificar el motivo en "Otro".');
      return;
    }

    const supabase = createClient();

    const classData = {
      student_name: student,
      date,
      day,
      status,
      cancellation_reason: isCancelled
        ? cancellationReason === "Otro"
          ? otherReason
          : cancellationReason
        : null,
      observations,
    };

    try {
      const { error } = await supabase.from("classes").insert([classData]);

      if (error) {
        throw error;
      }

      alert("Clase guardada exitosamente.");
      router.push("/dashboard");
    } catch (error: any) {
      setError(
        "Error al guardar la clase: " +
          (error.message || "Ocurrió un error inesperado."),
      );
      console.error("Error saving class:", error);
    }
  };

  const isCancelled = status.startsWith("Cancelada");

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-md font-bold text-gray-900">Cargar Nueva Clase</h1>
        <p className="text-sm text-gray-500 mt-1">
          Regla: No se puede editar después de 24 horas.
        </p>
      </header>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-4xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="student"
              className="text-md font-medium text-gray-700"
            >
              Alumno
            </label>
            <input
              id="student"
              type="text"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              placeholder="Escriba o seleccione un alumno"
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-4xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="text-md font-medium text-gray-700"
            >
              Estado de la clase
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-4xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Asistió</option>
              <option>Cancelada por alumno</option>
              <option>Cancelada por profesor</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="date"
                className="text-md font-medium text-gray-700"
              >
                Fecha
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-4xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="day"
                className="text-md font-medium text-gray-700"
              >
                Día
              </label>
              <input
                id="day"
                type="text"
                value={day}
                disabled
                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-4xl shadow-sm"
              />
            </div>
          </div>

          {isCancelled && (
            <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-4xl">
              <label
                htmlFor="cancellationReason"
                className="text-md font-medium text-gray-700"
              >
                Motivo (solo si fue cancelada)
              </label>
              <select
                id="cancellationReason"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-4xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Seleccione un motivo</option>
                {cancellationReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
              {cancellationReason === "Otro" && (
                <input
                  type="text"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="Por favor especifique"
                  className="w-full px-3 py-2 mt-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-4xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="observations"
              className="text-md font-medium text-gray-700"
            >
              Observaciones (opcional)
            </label>
            <textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-4xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {error && <p className="text-md text-red-600">{error}</p>}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-4xl hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-medium bg-lime-300 border border-lime-600 text-gray-950 rounded-4xl hover:bg-green-700"
            >
              ✔ Guardar clase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
