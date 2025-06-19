import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

// Filter options
const filterData = [
  { filterType: "Location", array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"] },
  { filterType: "Industry", array: ["Frontend Developer", "Backend Developer", "FullStack Developer"] },
  { filterType: "Salary", array: ["0-40k", "42-1lakh", "1lakh to 5lakh"] }
];

// Filter Card
const FilterCard = () => {
  const [selectedValue, setSelectedValue] = React.useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-5 rounded-lg shadow-md sm:max-w-md">
      <h1 className="font-semibold text-xl mb-4 text-indigo-600 dark:text-indigo-400 text-center sm:text-left">Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
        {filterData.map((section, index) => (
          <div key={index} className="mb-5">
            <h2 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">{section.filterType}</h2>
            <div className="grid grid-cols-1 gap-2">
              {section.array.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={`${index}-${idx}`} />
                  <Label htmlFor={`${index}-${idx}`} className="cursor-pointer">{item}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
export default FilterCard;