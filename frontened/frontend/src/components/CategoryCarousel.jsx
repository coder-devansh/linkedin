import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full px-4 my-16">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Explore by <span className="text-[#6A38C2]">Category</span>
      </h2>
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="basis-2/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
              <div className="flex justify-center">
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="rounded-full px-6 py-3 font-medium border-gray-300 dark:border-gray-600 hover:bg-[#6A38C2] hover:text-white transition-all duration-300 w-full"
                >
                  {cat}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
