import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import { ACCESS_TOKEN } from "../../constants";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // Check if both username and password have values
    e.preventDefault();
    if (username && password) {
      // Perform any login-related tasks here
      // Then navigate to the desired page
      try {
        const res = await api.post("/api/token/", { username, password });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(ACCESS_TOKEN, res.data.refresh);
        navigate("/home");
      } catch (error) {
        alert(error);
      }
    } else {
      // You may want to provide some feedback to the user (e.g., show an error message)
      console.log("Please enter both username and password");
    }
  };

  return (
    <div className="grid grid-cols-1 h-screen w-full">
      <div className="bg-gray-800 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
          <h2 className="text-4xl dark:text-white font-bold text-center">
            SIGN IN
          </h2>
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
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button
            className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            onClick={handleLogin}
            disabled={!username || !password} // Disable the button if either username or password is empty
          >
            SIGNIN
          </button>
          <div className="flex justify-center items-center py-2">
            <p className="text-center">
              {" "}
              <Link className="text-blue-400" to="/register">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
