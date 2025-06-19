import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgo = (date) => {
    const created = new Date(date);
    const now = new Date();
    return Math.floor((now - created) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 sm:p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-all duration-300 w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">{daysAgo(job.createdAt) === 0 ? 'Today' : `${daysAgo(job.createdAt)} day(s) ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="text-gray-600 dark:text-gray-300" />
        </Button>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 my-4">
        <Avatar className="w-12 h-12 ring-1 ring-gray-200 dark:ring-gray-600">
          <AvatarImage src={job.company?.logo} />
        </Avatar>
        <div>
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">{job.company?.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">India</p>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <h1 className="text-lg font-bold text-indigo-700 dark:text-indigo-300 mb-1">{job.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{job.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200">{job.position} Position{job.position > 1 ? 's' : ''}</Badge>
        <Badge className="bg-red-100 dark:bg-red-800 text-[#F83002] dark:text-red-300">{job.jobType}</Badge>
        <Badge className="bg-purple-100 dark:bg-purple-800 text-[#7209b7] dark:text-purple-200">{job.salary} LPA</Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
          className="w-full sm:w-auto text-indigo-600 border-indigo-300 dark:text-indigo-300 dark:border-indigo-600"
        >
          Details
        </Button>
        <Button className="w-full sm:w-auto bg-[#7209b7] hover:bg-[#5e0899] text-white transition">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
