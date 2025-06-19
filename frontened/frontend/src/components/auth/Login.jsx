import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill all fields.");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message || "Login failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f172a] transition-colors duration-300">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md transition-all duration-300">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Login to Your Account</h1>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <Label className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="example@mail.com"
                required
                disabled={loading}
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <Label className="text-gray-700 dark:text-gray-300">Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
                required
                disabled={loading}
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Login as</Label>
              <RadioGroup className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="accent-indigo-500"
                    disabled={loading}
                  />
                  Student
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="accent-indigo-500"
                    disabled={loading}
                  />
                  Recruiter
                </label>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait
                </>
              ) : (
                'Login'
              )}
            </Button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:underline dark:text-indigo-400">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
