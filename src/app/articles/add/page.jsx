

"use client";

import { useState, useContext } from "react";
import { ArticlesContext } from "@/context/ArticlesContext";
import { useRouter } from "next/navigation";

export default function AddArticle() {
  const [activeTab, setActiveTab] = useState("general");

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const { addArticle } = useContext(ArticlesContext);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    formData.append("author", author);

    if (image) {
      formData.append("image", image);
    }

    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("keywords", keywords);

    try {
      // CENTRALIZED: context will POST if it receives a FormData
      const saved = await addArticle(formData);

      // navigate after save
      router.push("/articles");
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Failed to save article. See console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full md:w-64 bg-white border-r shadow-sm">
        <h2 className="p-4 text-lg font-semibold border-b">Settings</h2>

        <ul className="flex flex-col">
          <li
            className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
              activeTab === "general" ? "bg-gray-100 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("general")}
          >
            General
          </li>

          <li
            className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
              activeTab === "seo" ? "bg-gray-100 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("seo")}
          >
            SEO Settings
          </li>
        </ul>
      </div>

      <div className="flex-1 p-5 md:p-10">
        <h1 className="text-3xl font-bold mb-6">Add New Article</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {activeTab === "general" && (
            <div className="grid gap-4 max-w-2xl">
              <input
                className="border p-3 rounded bg-white shadow-sm"
                placeholder="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input
                className="border p-3 rounded bg-white shadow-sm"
                placeholder="Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />

              <input
                className="border p-3 rounded bg-white shadow-sm"
                placeholder="Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />

              <input
                type="file"
                className="border p-3 rounded bg-white shadow-sm"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <textarea
                className="border p-3 rounded h-40 bg-white shadow-sm"
                placeholder="Write your article..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="grid gap-4 max-w-2xl">
              <input
                className="border p-3 rounded bg-white shadow-sm"
                placeholder="Meta Title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />

              <textarea
                className="border p-3 rounded bg-white shadow-sm h-24"
                placeholder="Meta Description"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />

              <input
                className="border p-3 rounded bg-white shadow-sm"
                placeholder="Keywords (comma separated)"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Publish Article"}
          </button>
        </form>
      </div>
    </div>
  );
}
