
"use client";

import { useContext, useState, useEffect } from "react";
import { ArticlesContext } from "@/context/ArticlesContext";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import DeleteModal from "@/components/DeleteModal"; // <-- add this

function ArticleCard({ article, onDeleteClick }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    let url;
    const img = article?.image;

    if (!img) {
      setPreview(null);
      return;
    }

    if (typeof img === "string") {
      setPreview(img);
      return;
    }

    if (img instanceof File || img instanceof Blob) {
      url = URL.createObjectURL(img);
      setPreview(url);
      return () => url && URL.revokeObjectURL(url);
    }

    try {
      setPreview(String(img));
    } catch {
      setPreview(null);
    }

    return () => url && URL.revokeObjectURL(url);
  }, [article.image]);

  return (
    <div className="bg-white/60 backdrop-blur-xl shadow-lg rounded-2xl border border-white/40 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col">

      {preview ? (
        <img src={preview} alt={article.title} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold">{article.title}</h2>
        <p className="text-gray-600 text-sm mt-1">{article.subtitle}</p>
        <p className="text-gray-500 text-xs mt-1">✍️ {article.author}</p>

        <p className="text-gray-700 mt-3 line-clamp-3 text-sm">{article.content}</p>

        <div className="flex justify-between mt-5 pt-3 border-t">
          <Link
            href={`/articles/edit/${article._id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Edit size={14} /> Edit
          </Link>

          <button
            onClick={() => onDeleteClick(article._id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  const { articles, deleteArticle } = useContext(ArticlesContext);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await deleteArticle(selectedId);
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div className="p-6 md:ml-[250px] ml-0">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">All Articles</h1>

        <Link
          href="/articles/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          ➕ Add Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center text-gray-600 py-10 text-lg">
          No articles available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ArticleCard
              key={article._id || index}
              article={article}
              onDeleteClick={openDeleteModal}
            />
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
