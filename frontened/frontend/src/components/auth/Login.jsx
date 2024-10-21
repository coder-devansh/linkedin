import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar'; // Import the Navbar component
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

        if (!validateInputs()) {
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data && res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/");
            } else {
                toast.error(res.data.message || "Login failed, please try again.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleLogout = () => {
        // Clear user data from Redux
        dispatch(setUser(null));
        toast.success("You have logged out successfully.");
        navigate("/login"); // Redirect to login page or wherever you want
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar /> {/* Add the Navbar component here */}
            <div className="flex-1 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/path/to/hospital-background.jpg')" }}>
                <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
                  
                    <h1 className="font-bold text-xl text-center mb-5">Login</h1>
                    <form onSubmit={submitHandler}>
                        <div className="my-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="patel@gmail.com"
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="my-2">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="********"
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <RadioGroup className="flex items-center gap-4 my-5">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                        disabled={loading}
                                    />
                                    <Label htmlFor="r1">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                        disabled={loading}
                                    />
                                    <Label htmlFor="r2">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        {
                            loading 
                                ? <Button className="w-full my-4" disabled> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> 
                                : <Button type="submit" className="w-full my-4">Login</Button>
                        }
                        <span className="text-sm text-center">Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></span>
                    </form>

                    {user && (
                        <div className="flex flex-col items-center">
                            <h2 className="font-bold text-lg">Welcome, {user.name || "User"}!</h2>
                            <Button onClick={handleLogout} className="my-4">Logout</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
