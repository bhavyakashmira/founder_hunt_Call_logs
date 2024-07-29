import React, { useEffect , useState } from 'react'
import Navbar from '@/components/Navbar'
import { AddUser } from '@/components/AddUser'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLogs } from '@/components/AdminLogs'
import { AdminUsers } from '@/components/AdminUsers'
import { TableHead } from '@/components/ui/table'
import Userdata from '@/components/Userdata'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ChartArea, CircleUser, LayoutDashboard, Phone, UserRoundPlus, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Database } from 'lucide-react'
import logo from "../../public/logo.png"


function AdminDashboard() {



  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {

      navigate("/login")

    }  
  }, [])
  
  const [islogout, setislogout] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {

      navigate("/login")
    }
  }, [islogout])

  const [user, setuserdata] = useState([]);
  useEffect(() => {
    const fetchUser = async (req, res) => {
      try {
        const response = await axios.get("/api/auth/me");
        setuserdata(response.data);

      } catch (error) {
        console.error('No user data', error);
      }
    }
    fetchUser();
  }, [])


  useEffect(() => {
    if (user && user.role ===false) {
      navigate("/")
    }
  },[user])


  return (
    <>
      <div className='bg-gray-600 p-2' >
       

      <Navbar />
        <Tabs defaultValue="account" className='grid grid-cols-10 ' >
          <div className='col-span-1  rounded min-h-screen m-2 dark:bg-gray-800  ' >
            <TabsList className="  flex-col rounded-xl flex justify-center p-5" >
              <TabsTrigger className="m-5 bg-black text-blue-600 rounded-xl  "  value="account">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><CircleUser /> </TooltipTrigger>
                    <TooltipContent className="bg-white" >
                      <p>add user</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsTrigger>
              <TabsTrigger className="m-5 bg-black text-blue-600 rounded-xl  " value="calllogs">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><Phone /> </TooltipTrigger>
                    <TooltipContent className="bg-white" >
                      <p>Call logs</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                </TabsTrigger>
              <TabsTrigger className="m-5 bg-black text-blue-600 rounded-xl  " value="Users">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><UserRoundPlus /></TooltipTrigger>
                    <TooltipContent className="bg-white" >
                      <p>add user</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsTrigger>
              <TabsTrigger className="m-5 bg-black text-blue-600 rounded-xl  " value="all">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><Users /> </TooltipTrigger>
                    <TooltipContent className="bg-white" >
                      <p>All users</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsTrigger>
              <TabsTrigger className="m-5 bg-black text-blue-600 rounded-xl  " value="dashboard">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><LayoutDashboard />  </TooltipTrigger>
                    <TooltipContent className="bg-white" >
                      <p>dashboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsTrigger>
              <TabsTrigger className="m-5 bg-black text-blue-600 rounded-xl  " value="Analytics">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><ChartArea />  </TooltipTrigger>
                    <TooltipContent className="bg-white" >
                      <p>Analytics</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsTrigger>
              <TabsTrigger className="m-5 bg-black text-blue-600 rounded-xl  " value="database">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><Database /> </TooltipTrigger>
                    <TooltipContent className="bg-white" >
                      <p>Master Data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsTrigger>

              
          </TabsList>
          </div>
          <div className='bg-white m-2 col-span-9  rounded-xl  ' >
        <TabsContent value="dashboard">Make changes to your account here.</TabsContent>
            <TabsContent value="calllogs"> <AdminLogs /></TabsContent>
            <TabsContent value="Users" > <AddUser  /> </TabsContent>
            <TabsContent value="all" ><AdminUsers /> </TabsContent>
            <TabsContent value="account" ><Userdata user={user} /> </TabsContent>
            <TabsContent value="database" >database</TabsContent>
          </div>
        </Tabs>
      </div>
    </>


     
  )
}

export default AdminDashboard
