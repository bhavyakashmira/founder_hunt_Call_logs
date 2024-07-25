import React from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { AddUser } from '@/components/AddUser'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { UserPageQuery } from '@/components/UserPageQuery';
function AdminDashboard() {
  return (


      <div className=' '>
        <div className='grid grid-cols-12 m-2 bg-gray-300 border rounded-xl ' >
        <div className='col-span-3 m-2 ' >
        <Sidebar/>    
        </div>
        <div className='col-span-9 m-2' >
         <Navbar />
        <div className='flex justify-center mt-3' >
         <AddUser />
        </div>          
        </div>
        </div>
    </div>
  )
}

export default AdminDashboard
