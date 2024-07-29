import React , {useState} from "react"
import { Pen } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import axios from "axios";
import { Input } from "./ui/input";


export function LogsDrawer({id}) {
     
    const [remark, setRemark] = useState("");
    const SubmitRemarks = async () => {
        try {
            const response = await axios.post(`/api/query/remark/${id}`, {
                remark
            })
            console.log(response.data)
            
        } catch (error) {
            console.log("error", error)
        }
    }

    const handleRemarks = (e) => {
        setRemark(e.target.value);
    }



    return (
        <div className="" >
            <Drawer className="" >
                <DrawerTrigger asChild>
                    <Pen size={14} />
                </DrawerTrigger>
                <DrawerContent>
                    <div className="bg-white" >
                        <DrawerHeader>
                            <DrawerTitle>Write any remarks for the query</DrawerTitle>
                            <DrawerDescription>This action cannot be undone.</DrawerDescription>
                            <Input placeholder ="enter your remark" value={remark} name="remark" onChange={(e)=>handleRemarks(e)} />
                        </DrawerHeader>
                        <DrawerFooter>
                            <div className="flex justify-center" >
                                <Button onClick={SubmitRemarks} className="bg-black text-white rounded-xl" >add remark</Button>
                            </div>
                        
                        </DrawerFooter>
                    </div>
                    
                </DrawerContent>
            </Drawer>
        </div>
        
    )
}
