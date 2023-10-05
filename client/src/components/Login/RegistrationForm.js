import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const validationSchema = yup.object().shape({
    Name: yup.string().required("Name is required"),
    Phone: yup.string().required("Phone is required"),
    Email: yup.string().email("Invalid email").required("Email is required"),
    IDNumber: yup.string().required("ID Number is required"),
    Password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    RepeatPassword: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Passwords must match"),
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Registration successful:", responseData);
        // Optionally, you can redirect to the login page
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      Name: "",
      Phone: "",
      Email: "",
      IDNumber: "",
      Password: "",
      RepeatPassword: "",
    },
    validationSchema,
    onSubmit,
  });


  return (
    <div className="mx-auto">
      <div className="bg-orange-500 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Sign Up</h2>
      </div>
  
  <div className="bg-white flex flex-col items-center justify-center">
  
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

        <div className="m-5">
          <input
            type="text"
            id="IDNumber"
            placeholder="ID Number"
            name="IDNumber"
            onChange={formik.handleChange}
            value={formik.values.IDNumber}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
          />
          {formik.errors.IDNumber && (
            <p className="text-orange-500 mt-1">{formik.errors.IDNumber}</p>
          )}
        </div>

        <div className="m-5">
          <input
            type="password"
            id="Password"
            placeholder="Password"
            name="Password"
            onChange={formik.handleChange}
            value={formik.values.Password}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
          />
          {formik.errors.Password && (
            <p className="text-orange-500 mt-1">{formik.errors.Password}</p>
          )}
        </div>

        <div className="m-5">
          <input
            type="password"
            id="RepeatPassword"
            placeholder="Repeat Password"
            name="RepeatPassword"
            onChange={formik.handleChange}
            value={formik.values.RepeatPassword}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
          />
          {formik.errors.RepeatPassword && (
            <p className="text-orange-500 mt-1">{formik.errors.RepeatPassword}</p>
          )}
        </div>

        <div className="flex lg:flex-col md:flex-row justify-center items-center mt-8">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded cursor-pointer mb-4 md:mb-0"
          >
            Register
          </button>
          <Link
              to="/login"
              className="text-black "
            >
              Already have an account? <span className="font-bold text-orange-500 hover:underline">Login</span>
          </Link>
        </div>
        
        <button type="submit" className="hidden" />
      </form>
    </div>
    </div>
  );
};

export default RegistrationForm;
