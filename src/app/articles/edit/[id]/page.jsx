// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";

// export default function EditArticle() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState(null); // can be File or string
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Fetch article from backend
//   useEffect(() => {
//     async function fetchArticle() {
//       try {
//         const res = await fetch(`http://localhost:5000/api/articles/${id}`);
//         const data = await res.json();

//         setTitle(data.title || "");
//         setSubtitle(data.subtitle || "");
//         setAuthor(data.author || "");
//         setContent(data.content || "");

//         // Image may be a URL
//         if (data.image) {
//           setImage(data.image);
//           setPreview(data.image);
//         }

//       } catch (err) {
//         console.log("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (id) fetchArticle();
//   }, [id]);

//   // Image change
//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setImage(file);          
//     setPreview(URL.createObjectURL(file));  
//   };

//   // Submit to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("subtitle", subtitle);
//     formData.append("author", author);
//     formData.append("content", content);

//     // If user uploads new image
//     if (image instanceof File) {
//       formData.append("image", image);
//     }

//     try {
//       await fetch(`http://localhost:5000/api/articles/${id}`, {
//         method: "PUT",
//         body: formData,
//       });

//       router.push("/articles");
//     } catch (err) {
//       console.log("Update Error:", err);
//     }
//   };

//   if (loading) return <p className="ml-[250px] p-6">Loading...</p>;

//   return (
//     <div className="ml-[250px] p-6 max-w-3xl">
//       <h1 className="text-3xl font-bold mb-6">Edit Article</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           className="w-full border p-3 rounded"
//           placeholder="Article Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <input
//           className="w-full border p-3 rounded"
//           placeholder="Subtitle"
//           value={subtitle}
//           onChange={(e) => setSubtitle(e.target.value)}
//         />

//         <input
//           className="w-full border p-3 rounded"
//           placeholder="Author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//         />

//         <div>
//           <p className="font-semibold mb-1">Article Image</p>

//           {preview && (
//             <img
//               src={preview}
//               className="w-40 h-28 object-cover mb-3 rounded"
//               alt="Preview"
//             />
//           )}

//           <input
//             type="file"
//             onChange={handleImageChange}
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         <textarea
//           className="w-full border p-3 rounded h-40"
//           placeholder="Article Content..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />

//         <button className="w-full bg-green-600 text-white p-3 rounded font-semibold">
//           Update
//         </button>
//       </form>
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";

// export default function EditArticle() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState(null); // File OR URL string
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(true);

//   // ================================================
//   // FETCH ARTICLE
//   // ================================================
//   useEffect(() => {
//     if (!id) return;

//     async function fetchArticle() {
//       try {
//         const res = await fetch(`http://localhost:5000/api/articles/${id}`);

//         if (!res.ok) {
//           console.error("Invalid Response:", await res.text());
//           return;
//         }

//         const data = await res.json();

//         if (!data?._id) {
//           console.error("Article Not Found");
//           router.push("/articles");
//           return;
//         }

//         setTitle(data.title || "");
//         setSubtitle(data.subtitle || "");
//         setAuthor(data.author || "");
//         setContent(data.content || "");

//         if (data.image) {
//           setImage(data.image); // URL string
//           setPreview(data.image);
//         }
//       } catch (err) {
//         console.log("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchArticle();
//   }, [id, router]);

//   // ================================================
//   // IMAGE CHANGE
//   // ================================================
//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   // ================================================
//   // SUBMIT UPDATE
//   // ================================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("subtitle", subtitle);
//     formData.append("author", author);
//     formData.append("content", content);

//     // Only append new image if selected
//     if (image instanceof File) {
//       formData.append("image", image);
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/articles/${id}`, {
//         method: "PUT",
//         body: formData,
//       });

//       if (!res.ok) {
//         console.error("Update Error:", await res.text());
//         alert("Update failed. Check console.");
//         return;
//       }

//       router.push("/articles");
//     } catch (err) {
//       console.log("Update Error:", err);
//     }
//   };

//   // ================================================
//   // LOADING
//   // ================================================
//   if (loading) return <p className="ml-[250px] p-6">Loading...</p>;

//   // ================================================
//   // UI
//   // ================================================
//   return (
//     <div className="ml-[250px] p-6 max-w-3xl">
//       <h1 className="text-3xl font-bold mb-6">Edit Article</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           className="w-full border p-3 rounded"
//           placeholder="Article Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <input
//           className="w-full border p-3 rounded"
//           placeholder="Subtitle"
//           value={subtitle}
//           onChange={(e) => setSubtitle(e.target.value)}
//         />

//         <input
//           className="w-full border p-3 rounded"
//           placeholder="Author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           required
//         />

//         <div>
//           <p className="font-semibold mb-1">Article Image</p>

//           {preview && (
//             <img
//               src={preview}
//               className="w-40 h-28 object-cover mb-3 rounded border"
//               alt="Preview"
//             />
//           )}

//           <input
//             type="file"
//             onChange={handleImageChange}
//             className="border p-2 rounded w-full"
//             accept="image/*"
//           />
//         </div>

//         <textarea
//           className="w-full border p-3 rounded h-40"
//           placeholder="Article Content..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//         />

//         <button className="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700 transition">
//           Update
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditArticle() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // ⭐ NEW SEO FIELDS
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  const [loading, setLoading] = useState(true);

  // Fetch article
  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`https://nest-solution-backend.vercel.app/api/articles/${id}`);
        const data = await res.json();

        setTitle(data.title || "");
        setSubtitle(data.subtitle || "");
        setAuthor(data.author || "");
        setContent(data.content || "");
        setMetaTitle(data.metaTitle || "");
        setMetaDescription(data.metaDescription || "");
        setKeywords(data.keywords || "");

        if (data.image) {
          setImage(data.image);
          setPreview(data.image);
        }
      } catch (err) {
        console.log("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchArticle();
  }, [id]);

  // Handle Image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("author", author);
    formData.append("content", content);

    // ⭐ SEO
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("keywords", keywords);

    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      await fetch(`https://nest-solution-backend.vercel.app/api/articles/${id}`, {
        method: "PUT",
        body: formData,
      });

      router.push("/articles");
    } catch (err) {
      console.log("Update Error:", err);
    }
  };

  if (loading) return <p className="ml-[250px] p-6">Loading...</p>;

  return (
    <div className="ml-[250px] p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <input
          className="w-full border p-3 rounded"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Subtitle */}
        <input
          className="w-full border p-3 rounded"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        {/* Author */}
        <input
          className="w-full border p-3 rounded"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        {/* Image */}
        <div>
          <p className="font-semibold mb-1">Article Image</p>

          {preview && (
            <img
              src={preview}
              className="w-40 h-28 object-cover mb-3 rounded"
              alt="Preview"
            />
          )}

          <input
            type="file"
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Content */}
        <textarea
          className="w-full border p-3 rounded h-40"
          placeholder="Article Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* ⭐ NEW SEO FIELDS */}

        <input
          className="w-full border p-3 rounded"
          placeholder="Meta Title"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded h-24"
          placeholder="Meta Description"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-3 rounded font-semibold">
          Update
        </button>
      </form>
    </div>
  );
}
