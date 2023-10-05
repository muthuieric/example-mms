import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar";

export const TmListing = () => {
  const [tms, setTms] = useState([]); // State for user data
  // const [refreshPage, setRefreshPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    console.log("FETCH!");
    fetch("/tms") 
      .then((res) => res.json())
      .then((data) => {
        setTms(data);
        console.log(data);
      });
  },);



  // Filter the users array based on the search term
  const filteredTms = tms
    ? tms.filter((item) =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteClick = async (id) => {
    const response = await fetch(`/tms/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      handleDeleteTm(id); // Remove the user from the state
      alert("Deleted Successfully");
    } else {
      alert("Failed to delete"); // Handle error case
    }
  };
  

  const handleDeleteTm = (id) => {
    const updatedTmsArray = tms.filter((tm) => tm.id !== id);
    setTms(updatedTmsArray);
  };

  return (
    <div className="mx-auto mt-10">
      <Navbar />

      <div className="bg-white shadow-md rounded mt-16">
        <div className="bg-orange-500 px-5 py-5 flex justify-center items-center">
          <h2 className="text-2xl font-semibold text-white">TMs</h2>
        </div>

 
        <div className="m-4 flex items-center justify-center">
          <label
            htmlFor="search"
            className="block text-black text-lg font-semibold mb-2 mr-2"
          >
            Search:
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 px-3 py-2 rounded-lg border border-black focus:outline-none focus:border-orange-500 mr-4"
          />
           <div className="m-4 flex items-center justify-center">
            <Link to="/add-tm">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded-lg cursor-pointer">
                Add Tm
              </button>
            </Link>
          </div>

          <button
            onClick={handlePrint}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded-lg cursor-pointer ml-4"
          >
            Print
          </button>
        </div>


       

        <div className="bg-white shadow-md rounded p-2 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-500 text-white ">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTms.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-2 px-4 text-center">
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredTms.map((tm, i) => (
                  <tr key={i} className="border-b text-center ">
                    <td className="py-2 px-4">{tm.id}</td>
                    <td className="py-2 px-4">{tm.Name}</td>
                    <td className="py-2 px-4">{tm.Phone}</td>
                    <td className="py-2 px-4">{tm.Email}</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-center">
                        <Link to={`/tms/${tm.id}`}>
                          <button
                            onClick={() => handleDeleteTm(tm.id)}
                            className="flex items-center text-gray-500 hover:text-gray-600 mr-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              />
                            </svg>
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDeleteClick(tm.id)}
                          className="flex items-center text-red-500 hover:text-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 cursor-pointer mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TmListing;
