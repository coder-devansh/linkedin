import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import React from 'react';
import { LogOut, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div className>
          <h1 className="text-2xl font-bold">
            job<span className="text-[#f83002]">Portal</span>
          </h1>
        </div >
        <div className='flex items-center gap-4'>
          <ul className="flex font-medium items-center gap-5">
            <li className="hover:text-[#f83002] cursor-pointer">Home</li>
            <li className="hover:text-[#f83002] cursor-pointer">Jobs</li>
            <li className="hover:text-[#f83002] cursor-pointer">Browse</li>
          </ul>
          {
            !user ? (
              <div className='flex items-center gap-2'>
                <Link to="/login"><Button variant='outline'>Login</Button> </Link>
                <Link to='/Signup'><Button className='bg-[#6A38C2] hover:bg-[#422e61]'>Signup</Button></Link>
              </div>
            ) : (
              <Popover >
                <PopoverTrigger asChild>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

                  </Avatar>

                </PopoverTrigger>
                <PopoverContent className='w-80'>
                  <div>
                    <Avatar className='cursor-pointer'>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

                    </Avatar>

                    <div>
                      <h4 className='font-medium'>Devansh Bansal</h4>
                      <p className='text-sm text-muted-foreground'>Devansh Bansakfgejhkfldkjhgdklkbjh</p>
                    </div>
                  </div>

                  <div className="flex flex-col my-2 text-gray-600">
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <User2 />
                      <Button variant='link'>View Profile</Button>
                    </div>
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut />
                      <Button variant='link'>logout</Button>
                    </div>
                  </div>






                </PopoverContent>
              </Popover>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default Navbar;
