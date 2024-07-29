import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { UserPageQuery } from "./UserPageQuery"
import { Userlogs } from "./UserLogs"
import { UserFeedback } from "./UserFeedback"
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import { CircleUser } from "lucide-react"
import Userdata from "./Userdata"
import { UserCompletedLogs } from "./UsercompletedLogs"
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import logo from "../../public/logo.png";



import axios from "axios"
import { Button } from "./ui/button"

export function UserPageTabs() {

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
        if (user && user.role === true) {
            navigate("/dashboard");
        }
    }, [user]);




     

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/auth/logout");
          
            localStorage.setItem("isLoggedIn", "false")
            setislogout(true);
        } catch(error) {
            console.log(error);
        }
   }
    const navigate = useNavigate();
    return (
        <>
          
        
            

            <div> 

                <Tabs defaultValue="account" className=" p-2">
                    <div className="flex items-center justify-between " >
                        <div className="bg-[#023047] p-2 rounded-xl" >
                         
                            <h1 className="text-sm font-bold text-white " > {user.username} </h1>
                        </div>
                
                        <TabsList className="grid grid-cols-4 font-bold bg-[#023047]  text-white rounded-xl p-3 ">
                            <TabsTrigger className="bg-white font-bold text-black " value="account" >User Profile</TabsTrigger>
                            <TabsTrigger className="bg-white font-bold text-black " value="query">Add Query</TabsTrigger>
                            <TabsTrigger className="bg-white font-bold text-black " value="pending">Pending Logs</TabsTrigger>
                            <TabsTrigger className="bg-white font-bold text-black " value="closed" >Closed Logs</TabsTrigger>
                        </TabsList>
                        <div className=" bg-[#023047] rounded-xl text-white " >
                            <Popover >
                                <PopoverTrigger> <LogOut size={32} className="border m-1 p-1 rounded-xl border-black " /> </PopoverTrigger>
                                <PopoverContent className="bg-white gap-2  rounded-xl  " >
                                    <h1 className="text-sm" >Do you want to logout?</h1>
                                    <Button className="bg-red-700 rounded-xl" onClick={handleLogout} >yes</Button> 
                                </PopoverContent>
                            </Popover>

                            </div>
                    </div>
                  



                    <TabsContent value="account" >
                        <Userdata user={user} />
                    </TabsContent>
                    
                    <TabsContent value="query">
                        <UserPageQuery />
                    </TabsContent>
                    <TabsContent value="pending">
                    <Userlogs />
                    </TabsContent>
                    <TabsContent value="closed"  >
                        <UserCompletedLogs/>
                    </TabsContent>
                </Tabs>
            </div>
            </>
      
    )
}

