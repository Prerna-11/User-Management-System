import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // New state for email validation error

  const { name, username, email } = user;

  const onInputChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      try {
        const response = await axios.get(`http://localhost:8080/isValidEmail?email=${e.target.value}`);
        setEmailError(response.data ? "" : "Invalid email address");
      } catch (error) {
        console.error("Error checking email validity:", error.message);
        setEmailError("Error checking email validity");
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (emailError) {
      return;
    }

    try {
      await axios.post("http://localhost:8080/user", user);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Username already exists");
      } else {
        console.error("Error:", error.message);
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col col-md-5 text-center border rounded p-4 mt-2 shadow">
          <form onSubmit={(e) => onSubmit(e)}>
            <h2 className="display-4">Register User</h2>

            <div className="form-row py-1">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="form-row py-1">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
              {error && <small className="text-danger font-weight-bold">{error}</small>}
            </div>

            <div className="form-row py-1">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className={`form-control ${emailError ? "is-invalid" : ""}`} // Apply "is-invalid" class for styling
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
              {emailError && <small className="text-danger font-weight-bold">{emailError}</small>}
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
