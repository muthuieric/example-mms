import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../NavBar";

const TmListing = () => {
  const [tmdata, setTmData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/tm/detail/" + id);
  };

  const LoadEdit = (id) => {
    navigate("/tm/edit/" + id);
  };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/tm/" + id, {
        method: "DELETE"
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/tm")
      .then((res) => res.json())
      .then((resp) => {
        setTmData(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Filter the tmdata array based on the search term
  const filteredTmData = tmdata
    ? tmdata.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  return (
    <div className="mx-auto mt-10">
      <Navbar />
      <div className="bg-white shadow-md rounded">
        <div className="bg-orange-500 px-6 py-5 flex justify-center items-center">
          <h2 className="text-2xl font-semibold text-white">TMs</h2>
        </div>
        <div className="px-6 py-4">
          <div className="px-6 py-0 mb-8 flex justify-end items-center">
             {/* Add search input */}
             <label htmlFor="search" className="block text-black text-xl font-medium mr-2">
                    Search:
            </label>
             <input
              type="text"
              className=' form-control w-3/4 px-3 py-2 mr-12  rounded-lg border border-black focus:outline-none focus:border-orange-500'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link
              to="create"
              className="btn btn-primary bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-3 rounded-lg cursor-pointer mr-4"
            >
              Add TM
            </Link>
            <button
              className="btn btn-primary bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-3 rounded-lg cursor-pointer"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTmData &&
                filteredTmData.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 px-4">{item.id}</td>
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.phone}</td>
                    <td className="py-2 px-4">{item.email}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => LoadEdit(item.id)}
                        className="btn btn-success bg-orange-500 hover:bg-orange-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => Removefunction(item.id)}
                        className="btn btn-danger bg-orange-500 hover:bg-orange-600 mr-2"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => LoadDetail(item.id)}
                        className="btn btn-primary bg-orange-500 hover:bg-orange-600"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TmListing;
