export default function ArticleCard({ title, content }) {
  return (
    <div className="border p-4 rounded-lg bg-white shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">
        {content.substring(0, 120)}...
      </p>
    </div>
  );
}
