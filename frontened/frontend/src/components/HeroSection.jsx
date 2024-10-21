import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20">
            <div className="flex flex-col gap-5 text-center">
                <span className="mx-auto px-4 py-2 rounded-full bg-white text-[#F83002] font-medium shadow-md">
                    No. 1 Job Hunt Website
                </span>
                <h1 className="text-5xl font-bold leading-tight">
                    Search, Apply & <br /> Get Your <span className="text-yellow-400">Dream Jobs</span>
                </h1>
                <p className="text-lg max-w-md mx-auto">
                    Discover your potential with the best job opportunities in the industry!
                </p>
                <div className="flex w-[90%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-300 rounded-full overflow-hidden mx-auto">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full py-2 px-4"
                    />
                    <Button onClick={searchJobHandler} className="rounded-full bg-[#6A38C2] hover:bg-[#5A31A6] transition duration-300 ease-in-out">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;
