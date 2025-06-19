import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                    <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-base sm:text-lg">
                    Curated opportunities to level up your career.
                </p>
            </div>

            {allJobs.length <= 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    No jobs available at the moment.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default LatestJobs;
