// import React from "react";
// import { Link } from "react-router-dom";

// function CheckInList({ checkins, searchTerm, handleDeleteCheckIn, handleDeleteClick }) {
//   const filteredCheckins = checkins.filter((checkin) =>
//     checkin.Name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-white shadow-md rounded p-4 mt-4 overflow-x-auto">
//       <table className="w-full">
//         <thead>
//           <tr className="bg-orange-500 text-white ">
//             <th className="py-2 px-4">ID</th>
//             <th className="py-2 px-4">Name</th>
//             <th className="py-2 px-4">Room Number</th>
//             <th className="py-2 px-4">Time In</th>
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredCheckins.length === 0 ? (
//             <tr>
//               <td colSpan="5" className="py-2 px-4 text-center">
//                 No records found.
//               </td>
//             </tr>
//           ) : (
//             filteredCheckins.map((checkin) => (
//               <tr key={checkin.id} className="border-b">
//                 <td className="py-2 px-4">{checkin.id}</td>
//                 <td className="py-2 px-4">{checkin.Name}</td>
//                 <td className="py-2 px-4">{checkin.Room_number}</td>
//                 <td className="py-2 px-4">{checkin.time_in}</td>
//                 <td className="py-2 px-4">
//                   <div className="flex items-center">
//                     <Link to={`/checkin/${checkin.id}`}>
//                       <button
//                         onClick={() => handleDeleteCheckIn(checkin.id)}
//                         className="flex items-center text-gray-500 hover:text-gray-600 mr-2"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.5}
//                           stroke="currentColor"
//                           className="w-6 h-6"
//                         >
//                           {/* ... Icon SVG */}
//                         </svg>
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => handleDeleteClick(checkin.id)}
//                       className="flex items-center text-red-500 hover:text-red-600"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={1.5}
//                         stroke="currentColor"
//                         className="w-6 cursor-pointer mr-1"
//                       >
//                         {/* ... Icon SVG */}
//                       </svg>
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CheckInList;
