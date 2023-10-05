
// import React, { useEffect, useState } from "react";
// import Search from "./Search";
// import CheckInList from "./CheckInList";
// import AddCheckInForm from "./AddCheckInForm";

// const CheckInListing = () => {
//   const [checkins, setCheckins] = useState([]);
//   const [refreshPage, setRefreshPage] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     console.log("FETCH!");
//     fetch("/checkins")
//       .then((res) => res.json())
//       .then((data) => {
//         setCheckins(data);
//         console.log(data);
//       });
//   }, [refreshPage]);


//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDeleteCheckIn = (id) => {
//     const updatedCheckInsArray = checkins.filter((checkin) => checkin.id !== id);
//     setCheckins(updatedCheckInsArray);
//   };

//   const handleDeleteClick = async (id) => {
//     const response = await fetch(`/checkins/${id}`, {
//       method: "DELETE",
//     });
//     if (response.ok) {
//       handleDeleteCheckIn(id);
//       alert("Deleted Successfully ");
//     }
//   };

//   return (
//     <div className="mx-auto">
//       <div className="bg-white shadow-md rounded">
//         <div className="bg-orange-500 px-6 py-5 flex justify-center items-center">
//           <h2 className="text-2xl font-semibold text-white">CheckIn</h2>
//         </div>

//         <div className="px-6 py-">
//           <AddCheckInForm />
//           <Search
//             searchTerm={searchTerm}
//             onSearchChange={setSearchTerm}
//             onPrintClick={handlePrint}
//           />
//           <CheckInList
//             checkins={checkins}
//             searchTerm={searchTerm}
//             handleDeleteCheckIn={handleDeleteCheckIn}
//             handleDeleteClick={handleDeleteClick}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckInListing;