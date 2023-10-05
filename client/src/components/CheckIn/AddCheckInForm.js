// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const AddCheckInForm = ({ onAddCheckIn }) => {
//   const formSchema = Yup.object().shape({
//     Name: Yup.string().required("Must enter a name").max(15),
//     Room_number: Yup.number().positive().integer().required("Must enter room number"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       Name: "",
//       Room_number: "",
//     },
//     validationSchema: formSchema,
//     onSubmit: (values) => {
//       onAddCheckIn(values); // Use the same function name here
//       formik.resetForm();
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit} className="px-4 py-4 mb-4 flex flex-col justify-center items-center sm:flex-row">
//       <div className="w-full mb-4 sm:w-1/2 sm:mr-4">
//         <label htmlFor="Name" className="block text-black text-lg font-semibold mb-2">
//           Name:
//         </label>
//         <input
//           id="Name"
//           name="Name"
//           placeholder=""
//           onChange={formik.handleChange}
//           value={formik.values.Name}
//           className="w-full p-2 border border-solid border-gray-300 rounded focus:outline-none focus:border-solid focus:border-orange-500"
//         />
//         {formik.errors.Name && (
//           <p className="text-orange-500 text-sm mt-1">{formik.errors.Name}</p>
//         )}
//       </div>
  
//       <div className="w-full mb-4 sm:w-1/2 sm:mr-4">
//         <label htmlFor="Room_number" className="block text-black text-lg font-semibold mb-2">
//           Room Number:
//         </label>
//         <input
//           id="Room_number"
//           name="Room_number"
//           onChange={formik.handleChange}
//           value={formik.values.Room_number}
//           className="w-full p-2 border border-solid border-gray-300 rounded focus:outline-none focus:border-solid focus:border-orange-500"
//         />
//         {formik.errors.Room_number && (
//           <p className="text-orange-500 text-sm mt-1">{formik.errors.Room_number}</p>
//         )}
//       </div>
  
//       <div>
//         <button
//           type="submit"
//           className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-3 rounded-lg cursor-pointer mb-4 sm:mb-0"
//         >
//           Add CheckIn
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddCheckInForm;
