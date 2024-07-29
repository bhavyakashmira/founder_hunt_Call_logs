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
import { Check } from "lucide-react";
import { EllipsisVerticalIcon } from "lucide-react";
import { useEffect, useState } from "react"
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogsDrawer } from "./LogsDrawer";
import { Delete } from "lucide-react";
import { getTimeFromTimestamp , getDateFromTimestamp } from "@/utils/data.format";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "./ui/input";



export function AdminLogs() {
    const [getlogs, setgetlogs] = useState([]);
    const [completedLogs, setCompletedLogs] = useState([]);

    const [statusFilter, setStatusFilter] = useState('Completed');
    const [componentFilter, setComponentFilter] = useState('');
    const [createdByFilter, setCreatedByFilter] = useState('');
    const [empCodeFilter, setEmpCodeFilter] = useState('');
    const [closedByFilter, setClosedByFilter] = useState('');

    const [curcomp, setcurcomp] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const fetchLogs = async () => {
        try {
            const response = await axios.get('/api/query/all');
            const pendinglog = response.data.filter(log => log.status !== 'Completed');
            setgetlogs(pendinglog);
            setCompletedLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };
    useEffect(() => {
     
        fetchLogs();
    }, [])


    const filteredLogs = completedLogs.filter(log => {
        return (
            (statusFilter ? log.status.includes(statusFilter) : true) &&
            (componentFilter ? log.component.includes(componentFilter) : true) &&
            (createdByFilter ? log.createdBy.username.includes(createdByFilter) : true) &&
            (empCodeFilter ? log.empCode == empCodeFilter : true) &&
            (closedByFilter ? log.CloserName.includes(closedByFilter) : true)
        );
    });



    const handleClose = async (id) => {
        try {
            const response = await axios.put(`/api/query/updatestatus/${id}`, {
                newStatus: "Completed"
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

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/query/delete/${id}`)
            console.log("response", response.data);
            fetchLogs();
        } catch (error) {
            console.log( "error" ,error)
        }
    } 

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentlogs = getlogs.slice(indexOfFirstUser, indexOfLastUser);

    const indexOfLastUsers = curcomp * usersPerPage;
    const indexOfFirstUsers = indexOfLastUsers - usersPerPage;
    const currentlog = completedLogs.slice(indexOfFirstUsers, indexOfLastUsers);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(getlogs.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }
    const compages = [];

    for (let i = 1; i <= Math.ceil(completedLogs.length / usersPerPage); i++) {
        compages.push(i);
    }

    return (
        <div className="bg-white p-2 rounded-xl" >

            <Tabs defaultValue="account" className="">
                <TabsList>
                    <TabsTrigger className="bg-gray-600 rounded-xl text-white "  value="account">Pending</TabsTrigger>
                    <TabsTrigger className="bg-gray-600 rounded-xl text-white"  value="password">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="account"><div className="" >
                    <Table >
                        <TableHeader className="bg-gray-600 text-white" >
                            <TableRow  >
                                <TableHead className="w-[100px]">SNO </TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Issue</TableHead>
                                <TableHead >Date</TableHead>
                                <TableHead>created By</TableHead>
                                <TableHead>employee code</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentlogs.map((issue, ind) => (
                                <TableRow key={ind}>
                                    <TableCell className="font-medium flex gap-1 items-center ">{ind + 1} 
                                        <div className="bg-red-600 rounded-full w-[10px] h-[10px]"></div>
                                    </TableCell>
                                    <TableCell>{issue.status}</TableCell>
                                    <TableCell>{issue.queryText}</TableCell>
                                    <TableCell className=""> 
                                        <div><h1>{getDateFromTimestamp(issue.createdAt)}</h1>
                                            <h1>{getTimeFromTimestamp(issue.createdAt)}</h1>
                                        </div>
                                         </TableCell>
                                    <TableCell className="" >{issue.createdBy.username}</TableCell>
                                    <TableCell className="" >{issue.createdBy.empCode}</TableCell>
                                    <TableCell><Check onClick={() => handleClose(issue._id)} /></TableCell>
                                    <TableCell> <LogsDrawer id={issue._id} /></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="pagination mt-10 flex justify-center gap-10 underline ">
                        {pageNumbers.map(number => (
                            <button key={number} onClick={() => handlePageChange(number)} className={`page-link border ${currentPage === number ? 'bg-gray-600 text-white' : 'bg-white text-black'}  border-black rounded-full h-10 w-10 `}>
                                {number}
                            </button>
                        ))}
                    </div>

                </div></TabsContent>
                <TabsContent value="password">  <div className="" >
                    <Table  >
                        <TableHeader className="bg-gray-600 text-white" >
                            <TableRow  >
                                <TableHead className="w-[100px]">SNO</TableHead>
                                <TableHead>
                                    <Select onValueChange={setStatusFilter} >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Completed" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-300" >
                                            <SelectItem value="Completed">Completed</SelectItem>
                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableHead>
                                <TableHead>
                                    <Select onValueChange={setComponentFilter}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-300" >
                                            <SelectItem value="excel">Excel </SelectItem>
                                            <SelectItem value="mouse">Mouse not working</SelectItem>
                                            <SelectItem value="Other">Pending</SelectItem>
                                        </SelectContent>
                                    </Select>


                                </TableHead>
                                <TableHead >Date</TableHead>
                                <TableHead>
                                    <Input placeholder="created by"
                                        value={createdByFilter}
                                        onChange={(e) => setCreatedByFilter(e.target.value)} />
                                </TableHead>
                                <TableHead> <Input  
                                
                                    value={empCodeFilter}
                                    onChange={(e) => setEmpCodeFilter(e.target.value)} placeholder="emp Code" /> </TableHead>
                                <TableHead> <Input placeholder="closed by"
                                    value={closedByFilter}
                                    onChange={(e) => setClosedByFilter(e.target.value)} /> </TableHead>
                                <TableHead ></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLogs.map((issue, ind) => (
                                <TableRow key={ind}>
                                    <TableCell className="font-medium flex items-center gap-1 ">{ind + 1} 
                                        <div className="bg-green-600 rounded-full w-[10px] h-[10px]"></div>
                                    </TableCell>
                                    <TableCell>{issue.status}</TableCell>
                                    <TableCell>{issue.queryText}</TableCell>
                                    <TableCell className="">  <div><h1>{getDateFromTimestamp(issue.createdAt)}</h1>
                                        <h1>{getTimeFromTimestamp(issue.createdAt)}</h1>
                                    </div></TableCell>
                                    <TableCell className="" >
                                        <p className="font-bold" >{issue.createdBy.username}</p>
                                        <p className="" > {issue.feedback[0]?.text} </p>
                                        
                                    </TableCell>
                                    <TableCell className="" >{issue.createdBy.empCode}</TableCell>
                                    <TableCell>
                                        <p className="font-bold" >{issue.CloserName}</p> 
                                        <p className="" > {issue.remark[0]?.text} </p>
                                        
                                    </TableCell>
                                    <TableCell onClick={() => handleDelete(issue._id)} ><Delete /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                    <div className="pagination mt-10 flex justify-center gap-10 underline ">
                        {compages.map(number => (
                            <button key={number} onClick={() => handlePageChange(number)} className={`page-link border ${currentPage === number ? 'bg-gray-600 text-white' : 'bg-white text-black'}  border-black rounded-full h-10 w-10 `}>
                                {number}
                            </button>
                        ))}
                    </div>
                </div></TabsContent>
            </Tabs>



            
            
          
            
            
        </div>

    )
}