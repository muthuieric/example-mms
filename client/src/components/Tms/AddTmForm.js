import { Link, useNavigate } from "react-router-dom"; // Updated import
import { useFormik } from "formik";
import * as yup from "yup";

const AddTmForm = () => {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const formSchema = yup.object().shape({
    Name: yup.string().required("Must enter a name").max(15),
    Phone: yup.string().required("Must enter a phone number").max(10),
    Email: yup.string().email("Invalid email address").required("Must enter an email"),
  });

  const formik = useFormik({
    initialValues: {
      Name: "",
      Phone: "",
      Email: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/add-tm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.status === 201) {
          alert("Tm added successfully");
          navigate("/tms"); // Use navigate to redirect to the TmListing page
        }
      });
    },
  });

  return (
    <div className="mx-auto">
      <div className="bg-orange-500 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Add Tm</h2>
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
              Add
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
      </div>
    </div>
  );
};

export default AddTmForm;
