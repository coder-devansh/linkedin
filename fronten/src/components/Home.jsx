import React from 'react'
import Navbar from './Shared/navBar'
import Herosection from './Herosection'
import LatestJobs from './LatestJobs'
import CategoryCarousel from './CategoryCarousel'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Herosection/>
       <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
  
    
    </div>
  )
}

export default Home
