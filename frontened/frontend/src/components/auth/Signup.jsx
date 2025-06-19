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
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: '',
    file: ''
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (key === "file" && value) {
        formData.append("file", value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] transition-colors duration-300">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-md shadow-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Create Your Account</h2>

          <div>
            <Label className="dark:text-gray-300">Full Name</Label>
            <Input
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="John Doe"
              className="dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <Label className="dark:text-gray-300">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="john@example.com"
              className="dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <Label className="dark:text-gray-300">Phone Number</Label>
            <Input
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="123-456-7890"
              className="dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <Label className="dark:text-gray-300">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
              className="dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <Label className="dark:text-gray-300">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={changeEventHandler}
              placeholder="********"
              className="dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <Label className="block mb-1 dark:text-gray-300">Role</Label>
            <RadioGroup className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="accent-indigo-500"
                />
                Student
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="accent-indigo-500"
                />
                Recruiter
              </label>
            </RadioGroup>
          </div>

          <div>
            <Label className="dark:text-gray-300">Profile Picture</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </div>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
