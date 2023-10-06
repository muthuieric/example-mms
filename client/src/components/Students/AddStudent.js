import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const AddStudentForm = () => {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    Name: yup.string().required("Must enter a name").max(15),
    idnumber: yup.string().required("Must enter an ID number").max(10),
    phone: yup.string().required("Must enter a phone number").max(10),
    laptop_model: yup.string().required("Must enter a laptop model"),
    serial_number: yup.string().required("Must enter a serial number"),
    tm_name: yup.string().required("Must enter a TM name"),
  });

  const formik = useFormik({
    initialValues: {
      Name: "",
      idnumber: "",
      phone: "",
      laptop_model: "",
      serial_number: "",
      tm_name: "",
    },
    validationSchema: formSchema,
   
onSubmit: async (values) => {
    try {
      const response = await fetch("/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (response.status === 201) {
        alert("Student added successfully");
        navigate("/students");
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("An error occurred while adding the student.");
    }
  },
  
    },
  );

  return (
    <div className="mx-auto">
      <div className="bg-orange-500 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Add Student</h2>
      </div>

      <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
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
              Add
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
      </div>
    </div>
  );
};

export default AddStudentForm;
