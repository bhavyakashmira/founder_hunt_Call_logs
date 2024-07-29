import React ,{useState} from "react"
import { Textarea } from "./ui/textarea"
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
"use client"


export function UserPageQuery() {

    const [querydata, setquerydata] = useState({
        queryText: "",
        MajorIssue:""
    })
    
    const onInputChange = (e) => {
        setquerydata((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }
    const onSelectChange = (value) => {
        setquerydata((prevData) => ({
            ...prevData,
            MajorIssue: value
        }));
    };
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await axios.post('/api/query/create', querydata);
            console.log('query successful:', response.data);
            setquerydata({
                queryText: "",
                MajorIssue: ""
            });
        } catch (error) {
            console.log(error)
            setError(error.response ? error.response.data.message : 'query failed');
        } finally {
            setLoading(false);
        }
    };

   


    return (
        <Card className=" bg-white">
            <CardHeader>
                <CardDescription className="font-bold text-3xl font-mono"  >Add new query </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} >
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label className="text-xl font-bold"  htmlFor="queryText">Describe your issue</Label>
                            <Textarea className="bg-gray-300"
                                id="queryText"
                                name="queryText"
                                value={querydata.queryText}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="flex flex-col  space-y-1.5">
                            <Label className="font-bold text-xl"  htmlFor="MajorIssue">Major Issue</Label>
                            <Select  
                                name="MajorIssue"
                                value={querydata.MajorIssue}
                                onValueChange={onSelectChange}
                            >
                                <SelectTrigger className="bg-gray-300" id="MajorIssue">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="bg-white" >
                                    <SelectItem value="Mouse Not working">Mouse Not working</SelectItem>
                                    <SelectItem value="Network Issue">Network Issue</SelectItem>
                                    <SelectItem value="Excel hangs">Excel hangs</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-end" >
                        <button className="bg-[#023047] p-2 m-2   text-white" type="submit" >Submit</button>
                    </div>
                   

                </form>

            </CardContent>
        </Card>
    )
}