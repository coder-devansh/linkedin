import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, LogOut, User2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import axios from 'axios';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Logout failed');
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const renderLinks = () => (
    <>
      {user?.role === 'recruiter' ? (
        <>
          <Link to="/admin/companies" onClick={() => setMenuOpen(false)}>Companies</Link>
          <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
        </>
      ) : (
        <>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
          <Link to="/browse" onClick={() => setMenuOpen(false)}>Browse</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            Hire<span className="text-purple-600 dark:text-purple-400">Sphere</span>
          </h1>

          <div className="hidden md:flex gap-6 text-gray-700 dark:text-gray-200 font-medium">
            {renderLinks()}
          </div>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button onClick={toggleTheme} variant="ghost">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {!user ? (
            <>
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button>Signup</Button></Link>
            </>
          ) : (
            <div className="relative group">
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
              </Avatar>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 hidden group-hover:block z-50">
                <div className="px-4 py-2 text-sm">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-500">{user?.profile?.bio}</p>
                </div>
                {user?.role === 'student' && (
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">View Profile</Link>
                )}
                <button onClick={logoutHandler} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger for Mobile */}
        <button className="md:hidden text-gray-700 dark:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 border-t dark:border-gray-700">
          <div className="flex flex-col gap-4 text-gray-700 dark:text-white">
            {renderLinks()}
          </div>
          <div className="mt-4 space-y-3">
            <Button onClick={toggleTheme} variant="outline" className="w-full">
              {isDark ? <Sun size={18} /> : <Moon size={18} />} Toggle Theme
            </Button>
            {!user ? (
              <>
                <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                <Link to="/signup"><Button className="w-full">Signup</Button></Link>
              </>
            ) : (
              <Button onClick={logoutHandler} variant="outline" className="w-full">Logout</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
