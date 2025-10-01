export default function DailyUpdateCard({ update }) {
  return (
    <div className="p-4 bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200">
      {/* Clickable Image */}
      <img
        src="/DailyNews.png"
        alt={update.title}
        className="w-full h-36 object-cover rounded-md mb-3 cursor-pointer"
        onClick={() => alert(`You clicked on: ${update.title}`)} // replace with actual click logic
      />

      <h2 className="text-lg font-semibold text-gray-800 mb-1">{update.title}</h2>
      <p className="text-gray-600 mb-2 text-sm">{update.content}</p>
      <small className="text-gray-500 block text-xs">
        {new Date(update.createdAt).toLocaleDateString()}
      </small>
    </div>
  );
}
