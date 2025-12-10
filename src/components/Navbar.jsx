export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow sticky top-0 z-10">

      {/* Logo */}
      <div className="text-2xl font-bold text-white">MyAdmin</div>

      {/* Search Bar */}
      <div className="flex-1 mx-10">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-amber-100 bg-white rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Logout Button */}
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

    </nav>
  );
}
