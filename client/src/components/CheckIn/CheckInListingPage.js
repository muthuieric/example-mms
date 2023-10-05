import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";



export const CheckInListing = () => {
  const [checkins, setCheckins] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term


  useEffect(() => {
    console.log("FETCH!");
    fetch("/checkins")
      .then((res) => res.json())
      .then((data) => {
        setCheckins(data);
        console.log(data);
      });
  }, [refreshPage]);

  const formSchema = yup.object().shape({
    Name: yup.string().required("Must enter a name").max(15),
    Room_number: yup.number().positive().integer().required("Must enter room number"),
  });

  const formik = useFormik({
    initialValues: {
      Name: "",
      Room_number: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => { // Destructure resetForm from formik
      fetch("/checkins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.status === 201) {
          setRefreshPage(!refreshPage); // Update state to trigger a re-fetch
          resetForm(); // Reset the form data
        }
      });
    },
    
    
    
  });

  // Filter the checkins array based on the search term
  const filteredCheckins = checkins
    ? checkins.filter((item) =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteClick = async (id) => { // Define the 'id' variable as a parameter
    const response = await fetch(`/checkins/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      handleDeleteCheckIn(id); // Correct function name to 'handleDeleteCheckIn'
      alert("Deleted Successfully ");
    }
  };
  


  const handleDeleteCheckIn = (id) => {
    const updatedCheckInsArray = checkins.filter((checkin) => checkin.id !== id);
    setCheckins(updatedCheckInsArray);
  };


  return (
    <div className="mx-auto">
    <div className="bg-white shadow-md rounded">
        <div className="bg-orange-500 px-5 py-5 flex justify-center items-center">
          <h2 className="text-2xl font-semibold text-white">CheckIn</h2>
        </div>
  
  <div className="flex flex-col justify-center items-center">
  <form onSubmit={formik.handleSubmit} className="w-1/2  justify-center items-center sm:flex-row">
<div className="mt-3">
    {/* <label htmlFor="Name" className="block text-black text-lg font-semibold mb-2">
      Name:
    </label> */}
    <input
      id="Name"
      name="Name"
      placeholder="Name"
      onChange={formik.handleChange}
      value={formik.values.Name}
      className=" w-full p-2 border border-solid border-gray-300 rounded focus:outline-none focus:border-solid focus:border-orange-500 mr-6"
    />
    {formik.errors.Name && (
      <p className="text-orange-500 text-sm mt-1">{formik.errors.Name}</p>
    )}
    </div>
    
  <div className="mt-2">
  <select
    id="Room_number"
    name="Room_number"
    onChange={formik.handleChange}
    value={formik.values.Room_number}
    className="w-full p-2 border border-solid bg-white border-gray-300 rounded focus:outline-none focus:border-solid focus:border-orange-500"
  >
    <option value="" >Room Number</option>
    <option value="101">Room 101</option>
    <option value="102">Room 102</option>
    <option value="103">Room 103</option>
    <option value="104">Room 104</option>
    <option value="105">Room 105</option>
    <option value="106">Room 106</option>
  </select>
  {formik.errors.Room_number && (
    <p className="text-orange-500 text-sm mt-1">{formik.errors.Room_number}</p>
  )}
</div>



<div className="mt-2 flex justify-center items-center" >
    <button
      type="submit"
      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-3 rounded-lg cursor-pointer "
    >
      Add Cheking
    </button>
</div>

</form>
</div>


<div className="m-4 flex items-center justify-center"> 
  <label htmlFor="search" className="block text-black text-lg font-semibold mb-2 mr-2"> 
    Search:
  </label>
  <input
    id="search"
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-1/2 px-3 py-2 rounded-lg border border-black focus:outline-none focus:border-orange-500 mr-4"
  />
  <button
    onClick={handlePrint}
    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-3 rounded-lg cursor-pointer ml-4"
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
        <th className="py-2 px-4">Room Number</th>
        <th className="py-2 px-4">Time In</th>
        <th className="py-2 px-4">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredCheckins.length === 0 ? (
        <tr>
          <td colSpan="5" className="py-2 px-4 text-center">
            No records found.
          </td>
        </tr>
      ) : (
        filteredCheckins.map((checkin, i) => (
          <tr key={i} className="border-b text-center ">
            <td className="py-2 px-4">{checkin.id}</td>
            <td className="py-2 px-4">{checkin.Name}</td>
            <td className="py-2 px-4">{checkin.Room_number}</td>
            <td className="py-2 px-4">{checkin.time_in}</td>
            <td className="py-2 px-4">
            <div className="flex items-center justify-center">

              <Link to={`/checkin/${checkin.id}`}>
            <button onClick={() => handleDeleteCheckIn(checkin.id)} className="flex items-center text-gray-500 hover:text-gray-600 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>  
            </button>
          </Link>

            <button onClick={() => handleDeleteClick(checkin.id)} className="flex items-center text-red-500 hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 cursor-pointer mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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

export default CheckInListing














