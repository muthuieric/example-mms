import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TmCreate = () => {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const tmdata = { name, email, phone, active };

    fetch("http://localhost:8000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(tmdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
      <div className="bg-orange-500 px-6 py-5 flex justify-center items-center">
          <h2 className="text-2xl font-semibold text-white">Add TM</h2>
        </div>
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2 className="mt-3">TM Create</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group w-full px-4 py-2 mb-4 rounded border focus:outline-none focus:border-purple-500">
                      <input
                        value={id}
                        disabled="disabled"
                        className="form-control"
                        placeholder="ID"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group w-full px-4 py-2 mb-4 rounded border focus:outline-none focus:border-purple-500">
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className={`form-control ${
                          name.length === 0 && validation ? "is-invalid" : ""
                        }`}
                        placeholder="Name"
                      ></input>
                      {name.length === 0 && validation && (
                        <span className="text-danger"></span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        className="form-control"
                        placeholder="Email"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        value={phone}
                        onChange={(e) => phonechange(e.target.value)}
                        className="form-control"
                        placeholder="Phone"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => activechange(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button
                        className="btn btn-primary bg-orange-500 hover:bg-orange-600 m-6 text-white font-bold px-3 py-3 rounded-lg cursor-pointer"
                        type="submit"
                      >
                        Save
                      </button>
                      <Link
                        to="/"
                        className="btn btn-primary bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-3 rounded-lg cursor-pointer"
                      >
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TmCreate;
