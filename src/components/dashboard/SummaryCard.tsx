interface SummaryCardProps {
  title: string;
  value: number | string;
}

export default function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="p-10 bg-gray-50 rounded-xl shadow-lg flex flex-col">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}
