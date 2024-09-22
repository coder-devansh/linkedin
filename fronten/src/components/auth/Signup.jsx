import React, { useState } from 'react';
import './Signup.css';
import Navbar from '../Shared/navBar';
import { RadioGroup } from '../ui/radio-group';
import { USER_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    file: null
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const navigate = useNavigate();
  const { loading } = useSelector(store => store.auth);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch=useDispatch();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!input.name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    }
    if (!input.email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      formErrors.email = "Email address is invalid";
      isValid = false;
    }
    if (!input.phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone number is required";
      isValid = false;
    }
    if (!input.password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (input.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    if (!input.confirmPassword) {
      formErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (input.confirmPassword !== input.password) {
      formErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (!input.role) {
      formErrors.role = "Role is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("confirmPassword", input.confirmPassword);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
    finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Signup for Job Listings</h2>
          {successMessage && <div className="success-message text-green-600 text-center mb-4">{successMessage}</div>}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="my-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={input.name}
                onChange={changeEventHandler}
                className={`w-full p-3 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.name && <p className="error-message text-red-500">{errors.name}</p>}
            </div>

            <div className="my-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={changeEventHandler}
                className={`w-full p-3 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && <p className="error-message text-red-500">{errors.email}</p>}
            </div>

            <div className="my-2">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className={`w-full p-3 border rounded ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.phoneNumber && <p className="error-message text-red-500">{errors.phoneNumber}</p>}
            </div>

            <div className="my-2">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={changeEventHandler}
                className={`w-full p-3 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.password && <p className="error-message text-red-500">{errors.password}</p>}
            </div>

            <div className="my-2">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={input.confirmPassword}
                onChange={changeEventHandler}
                className={`w-full p-3 border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.confirmPassword && <p className="error-message text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="my-5">
              <RadioGroup className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                    required
                  />
                  <label>Student</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                    required
                  />
                  <label>Recruiter</label>
                </div>
              </RadioGroup>
              {errors.role && <p className="error-message text-red-500">{errors.role}</p>}
            </div>

            <div className="my-5">
              <label className="block mb-2">Profile Image</label>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full border rounded p-2 cursor-pointer"
              />
              {input.file && <p className="text-gray-600">{input.file.name}</p>}
            </div>

            {loading ? (
              <button className='w-full my-4 flex items-center justify-center'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
              </button>
            ) : (
              <button
                type="submit"
                className="submit-button w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Signup
              </button>
            )}
            <div className='ar mt-4 text-center'>
              <p className="text-gray-600">
                Already Registered?&nbsp;
                <a href='/login' className='text-blue-600 hover:underline'>Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
