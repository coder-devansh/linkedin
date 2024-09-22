import React, { useState } from 'react';
import './Signup.css';
import Navbar from '../Shared/navBar';
import { RadioGroup } from '../ui/radio-group';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const { loading } = useSelector(store => store.auth);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!input.email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      formErrors.email = "Email address is invalid";
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

    if (!validateForm()) return; // Validate form before submission

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data) {
        navigate("/"); // Redirect to home or dashboard
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
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

            {loading ? (
              <button className='w-full my-4 flex items-center justify-center'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
              </button>
            ) : (
              <button
                type="submit"
                className="submit-button w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            )}

            <div className='ar mt-4 text-center'>
              <p className="text-gray-600">
                Don't have an account?&nbsp;
                <a href='/signup' className='text-blue-600 hover:underline'>Signup</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
