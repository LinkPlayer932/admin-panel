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

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <span className="font-medium text-white">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full object-cover border"
        />
      </div>
    </nav>
  );
}
