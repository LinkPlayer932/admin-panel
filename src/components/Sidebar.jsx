"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Add Article", path: "/articles/add" },
    { name: "Users", path: "/users" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="bg-gray-900 text-white h-screen w-64 p-5 fixed">
      <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>

      <ul className="space-y-4">
        {menu.map((item, i) => (
          <li key={i}>
            <Link
              href={item.path}
              className={`block px-3 py-2 rounded ${
                pathname === item.path
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
