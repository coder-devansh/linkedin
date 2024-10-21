import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import './Navbar.css'; // Import your CSS file

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark', !isDarkMode);
    }

    return (
        <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
            <div className='container flex items-center justify-between h-16 mx-auto'>
                <div>
                    <h1 className='text-2xl font-bold logo'>
                        Job<span className='highlight'>Portal</span>
                    </h1>
                </div>
                <div className='flex items-center gap-8'>
                    <ul className='nav-links'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    <div className='flex items-center gap-4'>
                        <Button onClick={toggleTheme} className="theme-toggle">
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </Button>
                        {
                            !user ? (
                                <div className='flex items-center gap-2'>
                                    <Link to="/login"><Button variant="outline" className="btn-login">Login</Button></Link>
                                    <Link to="/signup"><Button className="btn-signup">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="avatar cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="popover-content">
                                        <div className='p-4'>
                                            <div className='flex gap-2'>
                                                <Avatar>
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.name}</h4>
                                                    <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex items-center gap-2 cursor-pointer hover:text-[#6A38C2] transition duration-300'>
                                                            <User2 />
                                                            <Link to="/profile" className="link-profile">View Profile</Link>
                                                        </div>
                                                    )
                                                }
                                                <div className='flex items-center gap-2 cursor-pointer hover:text-[#6A38C2] transition duration-300'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
