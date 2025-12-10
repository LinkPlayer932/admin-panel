// 'use client';
// import "./globals.css";
// import { ArticlesProvider } from "@/context/ArticlesContext";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// // import { Toaster } from "react-hot-toast";

// export const metadata = {
//   title: "Admin Panel",
//   description: "Admin panel dashboard",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         {/* <Toaster position="top-right" /> */}
//         <ArticlesProvider>
//           <Sidebar />
//           <div className="flex-1">
//             <Navbar />
//             <main>{children}</main>
//           </div>
//         </ArticlesProvider>
//       </body>
//     </html>
//   );
// }
'use client';
import "./globals.css";
import { ArticlesProvider } from "@/context/ArticlesContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const path = usePathname();

  // Public Pages (No Sidebar, No Navbar)
  const publicRoutes = ["/login", "/signup"];
  const isPublic = publicRoutes.includes(path);

  return (
    <html lang="en">
      <body>
        <ArticlesProvider>
          {!isPublic && <Sidebar />}
          <div className="flex-1">
            {!isPublic && <Navbar />}
            <main>{children}</main>
          </div>
        </ArticlesProvider>
      </body>
    </html>
  );
}
