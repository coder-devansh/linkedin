import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import Navbar from './shared/Navbar';
import Job from './Job';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai']
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer']
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh']
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-5 rounded-lg shadow-md transition-colors duration-300 sm:max-w-md">
      <h1 className="font-semibold text-xl mb-4 text-indigo-600 dark:text-indigo-400 text-center sm:text-left">Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((section, index) => (
          <div key={index} className="mb-5">
            <h2 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">{section.filterType}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {section.array.map((item, idx) => {
                const itemId = `id-${index}-${idx}`;
                return (
                  <div key={itemId} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="accent-indigo-600 dark:accent-indigo-400"
                    />
                    <Label htmlFor={itemId} className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
export default FilterCard