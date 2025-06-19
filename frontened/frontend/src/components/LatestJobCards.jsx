import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-5 rounded-xl shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
        >
            {/* Company Info */}
            <div className="mb-1">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-base">
                    {job?.company?.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">India</p>
            </div>

            {/* Job Title & Description */}
            <div className="my-3">
                <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 line-clamp-1">
                    {job?.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {job?.description}
                </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge
                    className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium"
                    variant="ghost"
                >
                    {job?.position} Position{job?.position > 1 ? 's' : ''}
                </Badge>
                <Badge
                    className="bg-red-100 dark:bg-red-800 text-[#F83002] dark:text-red-300 font-medium"
                    variant="ghost"
                >
                    {job?.jobType}
                </Badge>
                <Badge
                    className="bg-purple-100 dark:bg-purple-800 text-[#7209b7] dark:text-purple-200 font-medium"
                    variant="ghost"
                >
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
