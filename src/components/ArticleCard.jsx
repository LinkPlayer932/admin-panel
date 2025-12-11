// // export default function ArticleCard({ title, content }) {
// //   return (
// //     <div className="border p-4 rounded-lg bg-white shadow hover:shadow-md transition">
// //       <h2 className="text-xl font-semibold">{title}</h2>
// //       <p className="text-gray-600 mt-2">
// //         {content.substring(0, 120)}...
// //       </p>
// //     </div>
// //   );
// // }
// export default function ArticleCard({ title, subtitle, author, content, image, onEdit, onDelete }) {
//   return (
//     <div className="flex flex-col border p-4 rounded-xl bg-white shadow hover:shadow-md transition h-full">

//       {/* Image */}
//       {image && (
//         <img
//           src={image}
//           className="w-full h-48 object-cover rounded-lg"
//           alt={title}
//         />
//       )}

//       {/* Content */}
//       <div className="flex-grow mt-3">
//         <h2 className="text-xl font-semibold">{title}</h2>
//         <p className="text-gray-600 text-sm">{subtitle}</p>

//         <p className="text-gray-500 text-sm mt-2">
//           📝 {author}
//         </p>

//         <p className="text-gray-700 mt-3">
//           {content?.substring(0, 160)}...
//         </p>
//       </div>

//       {/* Buttons (Bottom pinned) */}
//       <div className="flex justify-between mt-4 pt-3 border-t">
//         <button
//           onClick={onEdit}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           Edit
//         </button>

//         <button
//           onClick={onDelete}
//           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }
