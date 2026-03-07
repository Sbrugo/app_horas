interface RankingListProps {
  title: string;
  items: { name: string; value: number | string }[];
}

export default function RankingList({ title, items }: RankingListProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="text-gray-700">{item.name}</span>
            <span className="font-bold text-gray-900">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
