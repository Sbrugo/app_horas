"use client";
import StudentCombobox from "@/components/clases/StudentCombobox";
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
interface Student {
  id: string;
  name: string;
}
export default function NewClassPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [studentName, setStudentName] = useState("");
  const [status, setStatus] = useState("Asistió");
  const [cancellationReason, setCancellationReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [observations, setObservations] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (date) {
      const dateObj = new Date(date + "T00:00:00");
      const dayName = dateObj.toLocaleDateString("es-ES", { weekday: "long" });
      setDay(dayName);
    } else {
      setDay("");
    }
  }, [date]);

  useEffect(() => {
    const fetchStudents = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("students")
        .select("id, name")
        .order("name");

      if (error) {
        console.error(error);
        return;
      }

      setStudents(data);
    };

    fetchStudents();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if ((!selectedStudentId && !studentName) || !date || !status) {
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
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Usuario no autenticado");
      return;
    }

    let studentId = selectedStudentId;

    if (!studentId && studentName) {
      const { data: newStudent, error } = await supabase
        .from("students")
        .insert({ name: studentName, user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      studentId = newStudent.id;
    }
    const classData = {
      student_id: studentId,
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
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Cargar Nueva Clase
          </h1>
          <p className="text-lg text-gray-600">
            Regla: No se puede editar después de 24 horas.
          </p>
        </header>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="student"
                className="block text-sm font-medium text-gray-700"
              >
                Alumno
              </label>
              <StudentCombobox
                students={students}
                onSelectStudent={setSelectedStudentId}
                onInputChange={setStudentName}
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Estado de la clase
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 text-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option>Asistió</option>
                <option>Cancelada por alumno</option>
                <option>Cancelada por profesor</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 text-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="day"
                  className="block text-sm font-medium text-gray-700"
                >
                  Día
                </label>
                <input
                  id="day"
                  type="text"
                  value={day}
                  disabled
                  className="mt-1 block w-full px-4 py-3 bg-gray-200 border border-gray-300 text-gray-700 rounded-xl shadow-sm cursor-not-allowed"
                />
              </div>
            </div>

            {isCancelled && (
              <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-xl space-y-4">
                <div>
                  <label
                    htmlFor="cancellationReason"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Motivo (solo si fue cancelada)
                  </label>
                  <select
                    id="cancellationReason"
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Seleccione un motivo</option>
                    {cancellationReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>
                {cancellationReason === "Otro" && (
                  <input
                    type="text"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Por favor especifique"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="observations"
                className="block text-sm font-medium text-gray-700"
              >
                Observaciones (opcional)
              </label>
              <textarea
                id="observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                rows={3}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 font-medium bg-lime-400 text-gray-900 rounded-full hover:bg-lime-500 transition-colors"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
