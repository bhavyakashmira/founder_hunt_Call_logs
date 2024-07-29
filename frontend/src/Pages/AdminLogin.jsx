import React, { useState } from 'react'
import SkewedInfiniteScroll from '@/components/SkewedScroll';
import { Checkbox } from "@/components/ui/checkbox"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../../public/logo.png"


function AdminLogin() {

    const navigate = useNavigate();

    const [formdata, setformdata] = useState({
        empCode: "",
        password: "",
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setformdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await axios.post('/api/auth/login', formdata);
            
            localStorage.setItem('isLoggedIn', "true"); 
            navigate("/")
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    setError("Invalid username or password");
                } else if (status === 403) {
                    setError("You do not have permission to login as this role");
                } else {
                    setError("Login failed");
                }
            } else {
                setError("Login failed");
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        
        <section className="bg-gray-900  flex max-h-screen  ">
            
            <div className="mx-auto px-4 py-32  grid grid-cols-2 items-center">
                
                <div className="mx-auto max-w-3xl text-center">
                    <div className='flex justify-center' >
                        <img src={logo} className='w-[200px] h-[100px]' />
                    </div>
                  
                    <div>
                        <h1
                            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                        >
                            Maintain all call logs

                            <span className="sm:block"> in a click </span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl text-white sm:text-xl/relaxed">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
                            numquam ea!
                        </p>
                    </div>
                     
                    
                    <p className="text-xs text-gray-200">&copy; 2024. Pee Empro. All rights reserved.</p>

                </div>
                <div className="col-span-1 flex flex-col items-center justify-center relative z-10">
                    <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 border  rounded-xl w-full max-w-md">
                        <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login</div>

                        <div className="relative mt-10 h-px bg-gray-300">
                            <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                                <span className="bg-white px-4 text-xs text-gray-500 uppercase">login to check your dashboard</span>
                            </div>
                        </div>
                        <div className="mt-10">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Username</label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>

                                        <input type='text'
                                            placeholder='employee ID'
                                            name='empCode'
                                            onChange={handleInputChange}
                                            value={formdata.empCode}
                                            className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                            <span>
                                                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </span>
                                        </div>

                                        <input type='password'
                                            placeholder='Password'
                                            name='password'
                                            onChange={handleInputChange}
                                            value={formdata.password} className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
                                    </div>
                                </div>


                                <div className="flex w-full">
                                    {error && <div className="text-red-500">{error}</div>}
                                    <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-black rounded py-2 w-full transition duration-150 ease-in" disabled={loading} >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div >
                </div>
            </div>
        
            
            </section>
           
          

  )
}


{/* */}

export default AdminLogin
