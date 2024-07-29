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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area"
import { getDateFromTimestamp } from "@/utils/data.format";


export function UserCompletedLogs() {
    const [getlogs, setgetlogs] = useState([]);
    const [feedback, setfeedback] = useState("");
    const fetchLogs = async () => {
        try {
            const response = await axios.get('/api/query/myquery');
            const filterlogs = response.data.filter(log => log.status == 'Completed');
            setgetlogs(filterlogs);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    const handleFeedback = (e) => {
        setfeedback(e.target.value)
    }

    const SubmitRemarks = async (id) => {
        try {
            const response = await axios.post(`/api/query/feedback/${id}`, {
               feedback
            })

            setfeedback("");
        } catch (error) {
            console.log("error", error)
        }
    }


    useEffect(() => {
        fetchLogs();
    }, [])



    return (
        <div className="bg-white p-2 rounded-xl" >

            {getlogs.length == 0 ? <h1 className="font-bold justify-center flex p-2" >No Complete Queries</h1> :
                <Table  >
                    
                    <ScrollArea className=" h-[400px]" >
                        <TableHeader className="bg-gray-600 rounded-md text-white" >
                            <TableRow  >
                                <TableHead >SNO</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Issue</TableHead>
                                <TableHead >Date</TableHead>
                                <TableHead>Closed by</TableHead>
                                <TableHead>Remark by admin</TableHead>
                                <TableHead >Feedback</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {getlogs.map((issue, ind) => (
                                <TableRow key={ind}>
                                    <TableCell className="font-medium flex items-center gap-1 ">{ind + 1}
                                        <div className="bg-green-600 rounded-full w-[10px] h-[10px]"></div>
                                    </TableCell>
                                    <TableCell>{issue.status}</TableCell>
                                    <TableCell>{issue.queryText}</TableCell>
                                    <TableCell className="">{ getDateFromTimestamp(issue.createdAt)}</TableCell>
                                    <TableCell className="">{issue.CloserName}</TableCell>
                                    <TableCell>{issue.remark[0]?.text}</TableCell>
                                    <TableCell>
                                        {issue.feedback.length === 0 || !issue.feedback[0].text ? (
                                            <Popover>
                                                <PopoverTrigger className="bg-gray-600 text-white border rounded-xl p-2">
                                                    add feedback
                                                </PopoverTrigger>
                                                <PopoverContent className="bg-white p-5 border rounded-xl border-black">
                                                    <div>
                                                        <label className="m-1">Enter your feedback</label>
                                                        <div className="flex">
                                                            <textarea
                                                                placeholder="enter your remark"
                                                                value={feedback}
                                                                name="remark"
                                                                onChange={(e) => handleFeedback(e)}
                                                            />
                                                            <button
                                                                className="bg-gray-600 border border-black p-2 text-white m-2"
                                                                onClick={() => SubmitRemarks(issue._id)}
                                                            >
                                                                submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        ) : (
                                            issue.feedback[0].text
                                        )}
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                </ScrollArea>
                </Table>
                }

        </div>

    )
}
