import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); // Changed to an object
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault(); // Prevent form submission
    setErrors({}); // Reset errors

    // Check if both username, password, and confirmPassword have values
    if (!username || !password || !confirmPassword) {
      setErrors({ ...errors, general: "Please fill in all fields" });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return;
    }

    // Perform user existence check (You should replace this with your actual check)
    const userExists = false; // Replace with your logic to check if user already exists

    if (userExists) {
      setErrors({
        ...errors,
        general: "Username already exists. Please choose a different one.",
      });
      return;
    }

    // Perform any Register-related tasks here

    // Navigate to the user's dashboard (replace "/dashboard" with the actual path)
    navigate("/dashboard");
  }

  return (
    <div className="grid grid-cols-1 h-screen w-full">
      <div className="bg-gray-800 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8"
          onSubmit={handleRegister}
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            SIGN UP
          </h2>
          {errors.general && (
            <p className="text-red-500 text-sm mb-2">{errors.general}</p>
          )}
          <div className="flex flex-col text-gray-400 py-2">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              required
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            type="submit" // Changed to type="submit" to handle form submission
          >
            Register
          </button>
          <div className="flex justify-center items-center py-2">
            <p className="text-center">
              {" Already a member ? "}
              <Link className="text-blue-400" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
