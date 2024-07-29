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
import { useState ,useEffect } from "react"
import axios from "axios";
import { LogsDrawer } from "./LogsDrawer";
import { Pagination } from "./ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "./ui/input";


export function AdminUsers() {
    const [users, setusers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const [roleFilter, setRoleFilter] = useState('All'); 
    const [designationFilter, setDesignationFilter] = useState('All');
    const [department, setDepartment] = useState("All");

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('/api/user/all');
                setusers(response.data);

            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };
        fetchLogs();
    }, [])

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }


    
    const filteredUsers = users.filter(log => {
        return (
            (roleFilter ? (log.role==true && roleFilter==='Admin') : true) &&
            (designationFilter ? log.designation ===  designationFilter : true) &&
            (department ? log.department === department : true) 
        );
    });

    console.log(users)

    return (
        <div className="bg-white p-2 rounded-xl" >
            <Table >
                <TableHeader className="bg-gray-600 text-white" >
                    <TableRow  >
                        <TableHead className="w-[100px]">sno</TableHead>
                        <TableHead>empcode</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead >
                            
                            <Select onValueChange={setDepartment} >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="all" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-300" >
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="IT">IT</SelectItem>
                                    <SelectItem value="HR">HR</SelectItem>
                                </SelectContent>
                            </Select>

                        </TableHead>
                        <TableHead >
                            <Input
                            placeholder="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            />
                        </TableHead>
                        <TableHead>
                            <Select onValueChange={setDepartment} >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="all" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-300" >
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="User">User</SelectItem>
                                </SelectContent>
                            </Select>   
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, ind) => (
                        <TableRow key={ind}>
                            <TableCell className="font-medium">{indexOfFirstUser + ind + 1}</TableCell>
                            <TableCell>{user.empCode}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>{user.designation}</TableCell>
                            <TableCell>{user.role ? "Admin" : "User"}</TableCell>
                            <TableCell><LogsDrawer /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination/>

            <div className="pagination mt-5 flex justify-center gap-3 underline ">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => handlePageChange(number)} className={`page-link border ${currentPage === number ? 'bg-gray-600 text-white' : 'bg-white text-black'}  border-black rounded-full h-10 w-10 `}>
                        {number}
                    </button>
                ))}
            </div>
        
        </div>

    )
}