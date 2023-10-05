import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Updated import
import { useFormik } from "formik";
import * as yup from "yup";

const EditTmForm = () => {
  const { id } = useParams();
  const [tmData, setTmData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate(); // Updated hook

  const validationSchema = yup.object().shape({
    Name: yup.string().required("Name is required"),
    Phone: yup.string().required("Phone is required"),
    Email: yup.string().email("Invalid email address").required("Email is required"),
  });

  useEffect(() => {
    fetch(`/tms/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTmData(data);
      })
      .catch((error) => {
        console.error("Error fetching Tm data:", error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      Name: tmData.Name || "",
      Phone: tmData.Phone || "",
      Email: tmData.Email || "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetch(`/tms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          setTmData(data); // Update the state with the updated data
          setFormSubmitted(true);

          // Navigate back to the TM listing page
          navigate("/tms"); // Use navigate to go back
        });
    },
  });



  return (
    <div className="mx-auto">
      <div className="bg-orange-500 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Edit Tm</h2>
      </div>

      <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
        {formSubmitted ? (
          <div>
            <p className="text-orange-500 mb-6 md:mb-12">Tm data updated successfully!</p>
            <Link
              to="/tms"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-3 md:px-4 md:py-4 justify-center items-center rounded cursor-pointer"
            >
              Back to TMs Page
            </Link>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="w-full md:w-1/2">
            <div className="m-5">
              <input
                type="text"
                id="Name"
                placeholder="Name"
                name="Name"
                onChange={formik.handleChange}
                value={formik.values.Name}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
              />
              {formik.errors.Name && (
                <p className="text-orange-500 mt-1">{formik.errors.Name}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="text"
                id="Phone"
                placeholder="Phone"
                name="Phone"
                onChange={formik.handleChange}
                value={formik.values.Phone}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
              />
              {formik.errors.Phone && (
                <p className="text-orange-500 mt-1">{formik.errors.Phone}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="text"
                id="Email"
                placeholder="Email"
                name="Email"
                onChange={formik.handleChange}
                value={formik.values.Email}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
              />
              {formik.errors.Email && (
                <p className="text-orange-500 mt-1">{formik.errors.Email}</p>
              )}
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center mt-8 space-x-20">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded cursor-pointer mb-4 md:mb-0"
              >
                Update
              </button>
              <Link
                to="/tms"
                className="bg-orange-500 hover-bg-orange-600 text-white font-bold px-4 py-3 rounded cursor-pointer md:ml-4"
              >
                Back
              </Link>
            </div>
            <button type="submit" className="hidden" />
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTmForm;
