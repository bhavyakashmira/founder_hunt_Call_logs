import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EllipsisVerticalIcon } from "lucide-react";
import { useEffect, useState } from "react"
import axios from "axios";
import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"


export function Userlogs() {
    const [getlogs, setgetlogs] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const fetchLogs = async () => {
        try {
            const response = await axios.get('/api/query/myquery');
            const filterlogs = response.data.filter(log => log.status != 'Completed');
            setgetlogs(filterlogs);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [])
    
    
    const handleselfClose = async (id) => {
        try {
            const response = await axios.put(`/api/query/updatestatus/${id}`, {
                newStatus:"Completed"
            }, {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
            console.log('Success:', response.data);
            fetchLogs();
        } catch (error) {
            console.error('Error:', error);
        } 
    }



    return (
        <div className="bg-white p-2 rounded-xl" >

            {getlogs.length == 0 ? <h1 className="font-bold justify-center flex p-2" >No Pending Queries</h1> :
                <ScrollArea>
                    <Table  >

                    <TableHeader className="bg-gray-600 text-white" >
                        <TableRow  >
                            <TableHead className="w-[100px]">SNO</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Issue</TableHead>
                            <TableHead >Date</TableHead>
                            <TableHead ></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {getlogs.map((issue, ind) => (
                            <TableRow key={ind}>
                                <TableCell className="font-medium flex items-center gap-1 ">{ind + 1}
                                    <div className="bg-red-600 rounded-full w-[10px] h-[10px]"></div>
                                </TableCell>
                                <TableCell>{issue.status}</TableCell>
                                <TableCell>{issue.queryText}</TableCell>
                                <TableCell className="">{issue.createdAt}</TableCell>
                                <TableCell>  <Button onClick={() => handleselfClose(issue._id)} className="bg-red-500 border rounded-xl">
                                    Self Close</Button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table></ScrollArea>
                
                
            }
            
        </div>
       
    )
}
