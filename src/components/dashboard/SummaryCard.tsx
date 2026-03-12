interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

export default function SummaryCard({ title, value, icon }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out flex items-center space-x-4">
      <div className="bg-gray-100 rounded-full p-3">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
}
