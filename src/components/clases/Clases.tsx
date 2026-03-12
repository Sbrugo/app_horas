import { useClasses } from "@/context/ClassesContext";
import React from "react";

const Clases = () => {
  const { classes, loading, error } = useClasses();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Alumno
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Fecha
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Estado
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Motivo
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y text-gray-950 divide-gray-200">
          {classes.map((c) => (
            <tr key={c.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {c.students.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {c.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {c.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {c.cancellation_reason || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clases;
