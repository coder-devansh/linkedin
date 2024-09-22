import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category=[
   " Frontened Developer",
"Backened Developer",
"Data Science",
"Graphic Designer",
"FullStack Developer",
]

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className='w-full max-w-xl  mx-auto my-20'>
        <CarouselContent>
            {
                category.map((cat,index)=>(
                    <CarouselItem className="md:basis-1/2 lg-basis-1/3 ">
                        <Button className="bg-gray-200 text-blue-500 rounded-full" variant='outline'>{cat}</Button>

                    </CarouselItem>
                ))
            }
           
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
