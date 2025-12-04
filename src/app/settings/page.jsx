// "use client";

// import { useState, useEffect } from "react";

// export default function SettingsPage() {
//   const [settings, setSettings] = useState({
//     siteName: "",
//     footerText: "",
//     theme: "light",
//     logo: "",
//   });

//   useEffect(() => {
//     const saved = localStorage.getItem("site_settings");
//     if (saved) setSettings(JSON.parse(saved));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("site_settings", JSON.stringify(settings));
//   }, [settings]);

//   const handleChange = (e) => {
//     setSettings({ ...settings, [e.target.name]: e.target.value });
//   };

//   const handleLogo = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const url = URL.createObjectURL(file);
//     setSettings({ ...settings, logo: url });
//   };

//   return (
//     <div className="ml-[250px] p-8">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">
//         Settings ⚙️
//       </h1>

//       <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl border border-gray-100">
        
//         {/* SITE INFO SECTION */}
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">
//           General Information
//         </h2>

//         <div className="space-y-5">
//           <div>
//             <label className="block mb-1 font-medium text-gray-600">
//               Website Name
//             </label>
//             <input
//               type="text"
//               name="siteName"
//               value={settings.siteName}
//               onChange={handleChange}
//               placeholder="Enter Website Name"
//               className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium text-gray-600">
//               Footer Text
//             </label>
//             <input
//               type="text"
//               name="footerText"
//               value={settings.footerText}
//               onChange={handleChange}
//               placeholder="Footer text like (© 2025 MySite)"
//               className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
//             />
//           </div>
//         </div>

//         {/* SEPARATOR */}
//         <div className="my-7 border-t border-gray-200"></div>

//         {/* THEME SECTION */}
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">
//           Appearance
//         </h2>

//         <div>
//           <label className="block mb-1 font-medium text-gray-600">
//             Theme Mode
//           </label>
//           <select
//             name="theme"
//             value={settings.theme}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
//           >
//             <option value="light">🌤 Light</option>
//             <option value="dark">🌙 Dark</option>
//           </select>
//         </div>

//         {/* SEPARATOR */}
//         <div className="my-7 border-t border-gray-200"></div>

//         {/* LOGO SECTION */}
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">
//           Branding
//         </h2>

//         <div>
//           <label className="block mb-1 font-medium text-gray-600">
//             Upload Logo
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleLogo}
//             className="w-full border border-gray-300 p-2 rounded-xl cursor-pointer"
//           />

//           {settings.logo && (
//             <img
//               src={settings.logo}
//               className="w-28 h-28 mt-4 rounded-xl object-cover border shadow-md"
//             />
//           )}
//         </div>

//         {/* AUTO SAVE MESSAGE */}
//         <p className="mt-6 text-green-600 font-medium text-center">
//           ✔ Settings auto-saved!
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteTitle: "",
    metaDescription: "",
    keywords: "",
    ogImage: "",
  });

  // Fetch existing settings on load
  useEffect(() => {
    const loadSettings = async () => {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data);
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      alert("Settings updated successfully!");
    } else {
      alert("Error updating settings!");
    }
  };

  return (
    <div className="p-6 ml-[250px]">
      <h1 className="text-3xl font-bold mb-6">Site Settings</h1>

      {/* Site Title */}
      <label>Site Title</label>
      <input
        value={settings.siteTitle}
        onChange={(e) =>
          setSettings({ ...settings, siteTitle: e.target.value })
        }
        className="w-full border p-3 rounded mb-4"
        placeholder="My Website Name"
      />

      {/* Meta Description */}
      <label>Meta Description</label>
      <textarea
        value={settings.metaDescription}
        onChange={(e) =>
          setSettings({ ...settings, metaDescription: e.target.value })
        }
        className="w-full border p-3 rounded mb-4"
        placeholder="Short description about your website"
      ></textarea>

      {/* keywords */}
      <label>Keywords</label>
      <input
        value={settings.keywords}
        onChange={(e) =>
          setSettings({ ...settings, keywords: e.target.value })
        }
        className="w-full border p-3 rounded mb-4"
        placeholder="keyword1, keyword2"
      />

      {/* OG Image */}
      <label>OG Image URL</label>
      <input
        value={settings.ogImage}
        onChange={(e) =>
          setSettings({ ...settings, ogImage: e.target.value })
        }
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
