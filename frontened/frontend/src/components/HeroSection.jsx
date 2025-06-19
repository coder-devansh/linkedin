import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search, MessageCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const [showChat, setShowChat] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim() === '') return;
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <section
            className={`relative py-24 px-4 transition-colors duration-300
                bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500
                dark:from-gray-900 dark:via-gray-800 dark:to-black text-white`}
        >
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 text-center">
                {/* Badge */}
                <span className="px-5 py-2 rounded-full bg-white text-indigo-600 font-semibold text-sm shadow-md dark:bg-gray-200 dark:text-indigo-700">
                    🚀 No. 1 Job Hunt Website
                </span>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                    Search, Apply & <br />
                    Get Your{' '}
                    <span className="text-yellow-300 dark:text-yellow-400">Dream Job</span>
                </h1>

                {/* Subheading */}
                <p className="text-base md:text-lg max-w-2xl text-white/90 dark:text-white/80">
                    Unlock your future with top career opportunities across industries, tailored for your growth.
                </p>

                {/* Search Bar */}
                <div className="w-full max-w-xl bg-white rounded-full shadow-lg flex items-center overflow-hidden dark:bg-gray-200">
                    <input
                        type="text"
                        placeholder="Search jobs by title, company, or skill..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 px-5 py-3 text-gray-800 placeholder-gray-500 outline-none text-sm md:text-base bg-transparent"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-none rounded-r-full bg-indigo-600 hover:bg-indigo-700 px-5 py-3 transition-colors duration-300"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>

            {/* Chatbot Toggle Button */}
            <button
                onClick={() => setShowChat(!showChat)}
                className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 z-50"
            >
                <MessageCircle className="w-5 h-5" />
            </button>

            {/* Chatbot Container */}
            {showChat && (
                <div className="fixed bottom-20 right-6 w-[320px] h-[400px] bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-2xl z-50 overflow-hidden">
                    <div className="flex justify-between items-center p-3 border-b dark:border-gray-700">
                        <h2 className="font-semibold text-lg">Chat Assistant</h2>
                        <button onClick={() => setShowChat(false)} className="text-sm text-red-500 hover:underline">Close</button>
                    </div>
                    <div className="p-4 h-full flex flex-col">
                        <p className="text-sm">Hi! How can I help you today?</p>
                        {/* You can replace below with real chat service */}
                        <textarea className="flex-1 mt-2 p-2 text-sm rounded border dark:border-gray-700 bg-white dark:bg-gray-800 resize-none" placeholder="Type your message..." />
                        <Button className="mt-2 self-end bg-indigo-600 hover:bg-indigo-700">Send</Button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HeroSection;
