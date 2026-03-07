import Link from 'next/link';

// Placeholder data for classes
const classes = [
  { id: 1, student: 'Facundo', date: '02/02', status: 'Asistió', reason: '-' },
  { id: 2, student: 'Joaquín', date: '03/02', status: 'Cancelada Alumno', reason: 'Trabajo' },
  { id: 3, student: 'Ana', date: '05/02', status: 'Asistió', reason: '-' },
  { id: 4, student: 'Facundo', date: '09/02', status: 'Asistió', reason: '-' },
  { id: 5, student: 'Mariana', date: '11/02', status: 'Cancelada Profesor', reason: 'Enfermedad' },
];

// Placeholder data for filters
const students = ['Facundo', 'Joaquín', 'Ana', 'Mariana'];
const statuses = ['Asistió', 'Cancelada Alumno', 'Cancelada Profesor'];


export default function MyClassesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Mis Clases (Vista Mensual)</h1>
           <Link href="/dashboard" className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
              Volver al Dashboard
            </Link>
        </header>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="filter-student" className="text-sm font-medium text-gray-700">Filtrar por Alumno:</label>
            <select id="filter-student" className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option>Todos</option>
              {students.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="filter-status" className="text-sm font-medium text-gray-700">Filtrar por Estado:</label>
            <select id="filter-status" className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option>Todos</option>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alumno</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes.map((c) => (
                <tr key={c.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.student}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
