export default function StatsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Okunmamış:</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">12</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Arşivlenen:</span>
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">45</span>
      </div>
      <hr />
      <p className="text-[10px] text-gray-400">Veriler anlık olarak güncellenmektedir.</p>
    </div>
  );
}