import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const EditCheckInForm = () => {
  const { id } = useParams();
  const [checkInData, setCheckInData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validationSchema = yup.object().shape({
    Name: yup.string().required("Name is required"),
    Room_number: yup
      .number()
      .required("Room number is required")
      .positive()
      .integer(),
  });

  useEffect(() => {
    fetch(`/checkins/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCheckInData(data);
      })
      .catch((error) => {
        console.error("Error fetching CheckIn data:", error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      Name: checkInData.Name || "",
      Room_number: checkInData.Room_number || "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetch(`/checkins/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          setCheckInData(data); // Update the state with the updated data
          setFormSubmitted(true);
        });
    },
  });

  return (
    <div className="mx-auto">
      <div className="bg-orange-500 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Edit CheckIn</h2>
      </div>

      <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
        {formSubmitted ? (
          <div>
            <p className="text-orange-500 mb-6 md:mb-12">CheckIn data updated successfully!</p>
            <Link
              to="/checkin"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-3 md:px-4 md:py-4 justify-center items-center rounded cursor-pointer"
            >
              Back to Check-In Page
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
              <select
                id="Room_number"
                name="Room_number"
                onChange={formik.handleChange}
                value={formik.values.Room_number}
                className="w-full p-2 border border-solid bg-white border-gray-300 rounded focus:outline-none focus:border-solid focus:border-orange-500"
              >
                <option value="">Room Number</option>
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

            <div className="flex flex-col md:flex-row justify-center items-center mt-8 space-x-20">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded cursor-pointer mb-4 md:mb-0"
              >
                Update
              </button>
              <Link
                to="/checkin"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded cursor-pointer md:ml-4"
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

export default EditCheckInForm;
