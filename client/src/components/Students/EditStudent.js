import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const EditStudentForm = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    Name: yup.string().required("Name is required").max(15),
    idnumber: yup.string().required("ID Number is required").max(10),
    phone: yup.string().required("Phone is required").max(10),
    laptop_model: yup.string().required("Laptop Model is required"),
    serial_number: yup.string().required("Serial Number is required"),
    tm_name: yup.string().required("TM Name is required"),
  });

  useEffect(() => {
    fetch(`/students/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudentData(data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      Name: studentData.Name || "",
      idnumber: studentData.idnumber || "",
      phone: studentData.phone || "",
      laptop_model: studentData.laptop_model || "",
      serial_number: studentData.serial_number || "",
      tm_name: studentData.tm_name || "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetch(`/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          setStudentData(data);
          setFormSubmitted(true);
          navigate("/students");
        })
        .catch((error) => {
          console.error("Error updating student:", error);
          alert("An error occurred while updating the student.");
        });
    },
  });

  return (
    <div className="mx-auto">
      <div className="bg-orange-500 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Edit Student</h2>
      </div>

      <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
        {formSubmitted ? (
          <div>
            <p className="text-orange-500 mb-6 md:mb-12">
              Student data updated successfully!
            </p>
            <Link
              to="/students"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-3 md:px-4 md:py-4 justify-center items-center rounded cursor-pointer"
            >
              Back to Student Listing
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
                id="idnumber"
                placeholder="ID Number"
                name="idnumber"
                onChange={formik.handleChange}
                value={formik.values.idnumber}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
              />
              {formik.errors.idnumber && (
                <p className="text-orange-500 mt-1">{formik.errors.idnumber}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="text"
                id="phone"
                placeholder="Phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
              />
              {formik.errors.phone && (
                <p className="text-orange-500 mt-1">{formik.errors.phone}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="text"
                id="laptop_model"
                placeholder="Laptop Model"
                name="laptop_model"
                onChange={formik.handleChange}
                value={formik.values.laptop_model}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
              />
              {formik.errors.laptop_model && (
                <p className="text-orange-500 mt-1">{formik.errors.laptop_model}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="text"
                id="serial_number"
                placeholder="Serial Number"
                name="serial_number"
                onChange={formik.handleChange}
                value={formik.values.serial_number}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
              />
              {formik.errors.serial_number && (
                <p className="text-orange-500 mt-1">{formik.errors.serial_number}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="text"
                id="tm_name"
                placeholder="TM Name"
                name="tm_name"
                onChange={formik.handleChange}
                value={formik.values.tm_name}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
              />
              {formik.errors.tm_name && (
                <p className="text-orange-500 mt-1">{formik.errors.tm_name}</p>
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
                to="/students"
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

export default EditStudentForm;
