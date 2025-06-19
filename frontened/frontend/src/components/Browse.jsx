import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import FilterCard from './FilterCard';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(state => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Search Results ({allJobs.length})
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="w-full lg:w-1/3">
            <FilterCard />
          </div>

          {/* Job Listings */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allJobs.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 col-span-full">No jobs found.</p>
            ) : (
              allJobs.map((job) => <Job key={job._id} job={job} />)
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Browse;
