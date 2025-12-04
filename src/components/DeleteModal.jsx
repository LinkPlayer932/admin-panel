"use client";

export default function DeleteModal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] animate-fadeIn">
      <div className="bg-white w-96 p-6 rounded-xl shadow-xl animate-scaleIn text-center">
        <h2 className="text-xl font-bold mb-3">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this article?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
