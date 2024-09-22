

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Navbar from './components/Shared/navBar'
import Home from './components/Home'
const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
  },
  {
    path:"/login",
    element:<Login/>,
  },
  {
    path:"/Signup",
    element:<Signup/>,
  },
 
])
import './styles.css'
import { Toaster } from './components/ui/sonner'


function App() {
 

  return (
    <>
   <RouterProvider router={appRouter}/>
   <Toaster/>


    </>
  )
}

export default App
