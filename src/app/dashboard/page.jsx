// "use client";

// import { useContext, useMemo, useEffect } from "react";
// import { ArticlesContext } from "@/context/ArticlesContext";
// import {
//   FileText,
//   Users,
//   Image,
//   Clock,
//   TrendingUp,
//   Newspaper,
// } from "lucide-react";


// export default function Dashboard() {
//   const { articles } = useContext(ArticlesContext);

//   useEffect(() => {
//     const isLoggedIn = document.cookie.includes("token=");
//     if (!isLoggedIn) window.location.href = "/login";
//   }, []);

//   // Compute dashboard stats
//   const stats = useMemo(() => {
//     const total = articles.length;
//     const withImages = articles.filter((a) => a.image).length;
//     const authors = new Set(articles.map((a) => a.author)).size;
//     const latest = articles[articles.length - 1]?.title || "None";

//     return { total, withImages, authors, latest };
//   }, [articles]);

//   return (
//     <div className="p-6 ml-[250px]">
//       <h1 className="text-3xl font-extrabold mb-8">Dashboard Overview</h1>

//       {/* TOP STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <DashboardCard
//           icon={<FileText size={28} />}
//           title="Total Articles"
//           value={stats.total}
//           color="bg-blue-600"
//         />

//         <DashboardCard
//           icon={<Image size={28} />}
//           title="Articles w/ Images"
//           value={stats.withImages}
//           color="bg-purple-600"
//         />

//         <DashboardCard
//           icon={<Users size={28} />}
//           title="Authors"
//           value={stats.authors}
//           color="bg-green-600"
//         />

//         <DashboardCard
//           icon={<TrendingUp size={28} />}
//           title="Engagement Growth"
//           value="+12.5%"
//           color="bg-orange-600"
//         />
//       </div>

//       {/* MAIN GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

//         {/* LATEST ARTICLES */}
//         <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl shadow rounded-2xl p-6 border border-white/40">
//           <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//             <Newspaper size={22} /> Latest Articles
//           </h2>

//           {articles.length === 0 ? (
//             <p className="text-gray-500">No articles created yet.</p>
//           ) : (
//             <ul className="divide-y">

//               {articles.slice(-5).reverse().map((a) => (
//                 <li
//                   key={a._id}               // 🔥 FIXED HERE
//                   className="py-4 flex justify-between items-center"
//                 >
//                   <div>
//                     <h3 className="font-semibold text-gray-900">{a.title}</h3>
//                     <p className="text-sm text-gray-500 flex items-center gap-1">
//                       <Clock size={14} /> Just now
//                     </p>
//                   </div>

//                   {a.image && (
//                     <img
//                       src={typeof a.image === "string" ? a.image : ""}
//                       className="w-16 h-16 rounded object-cover"
//                       alt="thumbnail"
//                     />
//                   )}
//                 </li>
//               ))}

//             </ul>
//           )}
//         </div>

//         {/* SUMMARY BOX */}
//         <div className="bg-white/60 backdrop-blur-xl shadow rounded-2xl p-6 border border-white/40">
//           <h2 className="text-xl font-bold mb-3">Summary</h2>

//           <p className="text-gray-700 mb-4">
//             Quick overview of your articles and performance.
//           </p>

//           <ul className="space-y-3 text-gray-600">
//             <li>• Total articles published: {stats.total}</li>
//             <li>• Articles with images: {stats.withImages}</li>
//             <li>• Unique authors: {stats.authors}</li>
//             <li>• Latest article: {stats.latest}</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* CARD COMPONENT */
// function DashboardCard({ icon, title, value, color }) {
//   return (
//     <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl hover:scale-[1.02] transition-all">
//       <div className={`p-4 text-white rounded-xl ${color}`}>{icon}</div>
//       <div>
//         <p className="text-gray-600 text-sm">{title}</p>
//         <h2 className="text-3xl font-bold">{value}</h2>
//       </div>
//     </div>
//   );
// }
"use client";

import { useContext, useMemo, useEffect } from "react";
import { ArticlesContext } from "@/context/ArticlesContext";
import {
  FileText,
  Users,
  Image,
  Clock,
  TrendingUp,
  Newspaper,
} from "lucide-react";

export default function Dashboard() {
  const { articles } = useContext(ArticlesContext);

  useEffect(() => {
    const isLoggedIn = document.cookie.includes("token=");
    if (!isLoggedIn) window.location.href = "/login";
  }, []);

  // Compute dashboard stats
  const stats = useMemo(() => {
    const total = articles.length;
    const withImages = articles.filter((a) => a.image).length;
    const authors = new Set(articles.map((a) => a.author)).size;
    const latest = articles[articles.length - 1]?.title || "None";

    return { total, withImages, authors, latest };
  }, [articles]);

  return (
    <div className="p-6 ml-[250px]">

      {/* 🔥 LOGOUT BUTTON */}
      {/* <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/login";
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div> */}

      <h1 className="text-3xl font-extrabold mb-8">Dashboard Overview</h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={<FileText size={28} />}
          title="Total Articles"
          value={stats.total}
          color="bg-blue-600"
        />

        <DashboardCard
          icon={<Image size={28} />}
          title="Articles w/ Images"
          value={stats.withImages}
          color="bg-purple-600"
        />

        <DashboardCard
          icon={<Users size={28} />}
          title="Authors"
          value={stats.authors}
          color="bg-green-600"
        />

        <DashboardCard
          icon={<TrendingUp size={28} />}
          title="Engagement Growth"
          value="+12.5%"
          color="bg-orange-600"
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

        {/* LATEST ARTICLES */}
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl shadow rounded-2xl p-6 border border-white/40">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Newspaper size={22} /> Latest Articles
          </h2>

          {articles.length === 0 ? (
            <p className="text-gray-500">No articles created yet.</p>
          ) : (
            <ul className="divide-y">

              {articles.slice(-5).reverse().map((a) => (
                <li
                  key={a._id}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{a.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock size={14} /> Just now
                    </p>
                  </div>

                  {a.image && (
                    <img
                      src={typeof a.image === "string" ? a.image : ""}
                      className="w-16 h-16 rounded object-cover"
                      alt="thumbnail"
                    />
                  )}
                </li>
              ))}

            </ul>
          )}
        </div>

        {/* SUMMARY BOX */}
        <div className="bg-white/60 backdrop-blur-xl shadow rounded-2xl p-6 border border-white/40">
          <h2 className="text-xl font-bold mb-3">Summary</h2>

          <p className="text-gray-700 mb-4">
            Quick overview of your articles and performance.
          </p>

          <ul className="space-y-3 text-gray-600">
            <li>• Total articles published: {stats.total}</li>
            <li>• Articles with images: {stats.withImages}</li>
            <li>• Unique authors: {stats.authors}</li>
            <li>• Latest article: {stats.latest}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* CARD COMPONENT */
function DashboardCard({ icon, title, value, color }) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl hover:scale-[1.02] transition-all">
      <div className={`p-4 text-white rounded-xl ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
}
