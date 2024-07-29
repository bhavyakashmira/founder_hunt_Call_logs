import React ,{useEffect , useState} from 'react'
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import logo from "../../public/logo.png"


function Navbar() {
    const navigate = useNavigate();
    const [islogout, setislogout] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") !== "true") {

            navigate("/login")
        }
    }, [islogout])
    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/auth/logout");

            localStorage.setItem("isLoggedIn", "false")
            setislogout(true);
        } catch (error) {
            console.log(error);
        }
    }



  return (
      <header className="  rounded-xl">
          <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        

              <div className="flex flex-1 items-center justify-end md:justify-between">
                  <nav aria-label="Global" className="hidden md:block">
                      <ul className="flex items-center gap-6 text-sm">
                          <li>
                            <img src={logo} className=' h-[50px] w-[100px] ' />
                          </li>

                         
                      </ul>
                  </nav>

                  <div className="flex items-center gap-4">
                      <div className=" bg-[#023047] rounded-xl text-white " >
                          <Popover >
                              <PopoverTrigger> <LogOut size={32} className="border m-1 p-1 rounded-xl border-black " /> </PopoverTrigger>
                              <PopoverContent className="bg-white gap-2  rounded-xl  " >
                                  <h1 className="text-sm" >Do you want to logout?</h1>
                                  <Button className="bg-red-700 rounded-xl" onClick={handleLogout} >yes</Button>
                              </PopoverContent>
                          </Popover>

                      </div>

                      <button
                          className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                      >
                          <span className="sr-only">Toggle menu</span>
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                          >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                      </button>
                  </div>
              </div>
          </div>
      </header>
  )
}

export default Navbar
