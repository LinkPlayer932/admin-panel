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

