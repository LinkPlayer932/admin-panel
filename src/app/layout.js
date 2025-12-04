// import "./globals.css";
// import { ArticlesProvider } from "@/context/ArticlesContext";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// export const metadata = {
//   title: "Admin Panel",
//   description: "Admin Panel built with Next.js",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="flex">
//         <ArticlesProvider>
//           <Sidebar />
//           <div className="flex-1">
//             <Navbar />
//             <main className="p-6">{children}</main>
//           </div>
//         </ArticlesProvider>
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import { ArticlesProvider } from "@/context/ArticlesContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "Admin Panel",
  description: "Admin panel dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ArticlesProvider>
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <main>{children}</main>
          </div>
        </ArticlesProvider>
      </body>
    </html>
  );
}
