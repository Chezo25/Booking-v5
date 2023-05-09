import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
    } else {
      console.log("Registration success");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 py-10 rounded-lg shadow-md w-1/2" onSubmit={onSubmit}>
        <h2 className="text-center text-2xl font-medium mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Email Address"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            minLength="6"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            minLength="6"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
        >
          Register
        </button>
        <p className="text-center text-gray-700 text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
