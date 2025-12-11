
"use client";

import { createContext, useState, useEffect } from "react";

export const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);

  // -----------------------------
  // FETCH ALL ARTICLES
  // -----------------------------
  const fetchArticles = async () => {
    try {
      const res = await fetch("https://nest-solution-backend.vercel.app/api/articles");
      if (!res.ok) {
        console.error("Fetch Error - status:", res.status);
        return;
      }
      const data = await res.json();
      setArticles(data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // -----------------------------
  // ADD ARTICLE (flexible)
  // If arg is FormData -> POST to backend and add result to state
  // If arg is a plain object (saved article) -> just push it into state
  // -----------------------------
  const addArticle = async (payload) => {
    try {
      // If caller passed a FormData — context will make the POST
      if (payload instanceof FormData) {
        const res = await fetch("https://nest-solution-backend.vercel.app/api/articles", {
          method: "POST",
          body: payload,
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => null);
          console.error("Add Article - server error:", res.status, txt);
          throw new Error(txt || `Server error ${res.status}`);
        }

        const saved = await res.json();
        setArticles((prev) => [...prev, saved]);
        return saved;
      }

      // If caller passed a saved article object already
      if (payload && typeof payload === "object") {
        setArticles((prev) => [...prev, payload]);
        return payload;
      }

      throw new Error("addArticle expects FormData or article object");
    } catch (error) {
      console.error("Add Error:", error);
      throw error;
    }
  };

  // -----------------------------
  // UPDATE ARTICLE (WITH FORMDATA OR object)
  // If payload is FormData -> server call
  // If payload is an object { id, updateData } -> optimistic update
  // -----------------------------
  const updateArticle = async (id, formDataOrObj) => {
    try {
      // If caller provided FormData, send to backend
      if (formDataOrObj instanceof FormData) {
        const res = await fetch(`https://nest-solution-backend.vercel.app/api/articles/${id}`, {
          method: "PUT",
          body: formDataOrObj,
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => null);
          console.error("Update Error - server:", res.status, txt);
          throw new Error(txt || `Server error ${res.status}`);
        }

        const updated = await res.json();
        setArticles((prev) => prev.map((a) => (a._id === id ? updated : a)));
        return updated;
      }

      // If caller provided plain update object, apply locally (no server)
      if (formDataOrObj && typeof formDataOrObj === "object") {
        setArticles((prev) =>
          prev.map((a) => (a._id === id ? { ...a, ...formDataOrObj } : a))
        );
        return { id, ...formDataOrObj };
      }

      throw new Error("updateArticle expects FormData or update object");
    } catch (error) {
      console.error("Update Error:", error);
      throw error;
    }
  };

  // -----------------------------
  // DELETE ARTICLE
  // -----------------------------
  const deleteArticle = async (id) => {
    try {
      const res = await fetch(`https://nest-solution-backend.vercel.app/api/articles/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        console.error("Delete Error - server:", res.status, txt);
        throw new Error(txt || `Server error ${res.status}`);
      }

      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
      throw error;
    }
  };

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        setArticles,
        addArticle,
        updateArticle,
        deleteArticle,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export default ArticlesProvider;
