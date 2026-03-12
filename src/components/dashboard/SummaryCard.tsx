interface SummaryCardProps {
  title: string;
  value: number | string;
}

export default function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="py-10 px-6 rounded-xl shadow-lg flex flex-col items-center justify-center bg-white w-fit">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-md text-gray-600">{title}</p>
    </div>
  );
}
