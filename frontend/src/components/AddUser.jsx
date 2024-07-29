import  React,{useState} from "react"

import { Button } from "@/components/ui/button"
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
} from "@/components/ui/select";

import axios from "axios"

export function AddUser() {

    const [userdata, setUserData] = useState({
        username: "",
        empCode: "",
        designation: "",
        department: "",
        ram:"",
        password: "",
        systemType: "",
        hdd: "",
        monitorType: "",
        brand: "",
        monitorSNo: "",
        os: "",
        msOffice:"",
        role: false
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userdata,
            [name]: value
        });
    };

    const handlerole = (event) => {
       setUserData((prevData) => ({
            ...prevData,
            role: event.target.checked
        }));
    };

    console.log(userdata)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await axios.post("/api/auth/signup", userdata);
            Navigate("/")
            console.log('Login successful:', response.data);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    }





    return (
        <div className="flex justify-center " >
            <Card className=" w-[1000px] bg-white ">
                <CardHeader>
                    <CardTitle>Add new User</CardTitle>
                    <CardDescription>add new user in the database</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} >
                        <div className=" w-full items-center gap-4">
                            <div className="grid grid-cols-2 gap-2 justify-between">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="empCode">Employee Code</Label>
                                    <Input
                                        id="empCode"
                                        name="empCode"
                                        placeholder="Employee Code"
                                        value={userdata.empCode}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="username">Name</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="Name of the user"
                                        value={userdata.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="designation">Designation</Label>
                                <Input
                                    id="designation"
                                    name="designation"
                                    placeholder="Designation"
                                    value={userdata.designation}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="department">Department</Label>
                                <Select
                                    value={userdata.department}
                                    onValueChange={(value) => setUserData({ ...userdata, department: value })}
                                >
                                    <SelectTrigger id="department">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="bg-white text-black" >
                                        <SelectItem value="IT">IT</SelectItem>
                                        <SelectItem value="HR">HR</SelectItem>
                                        <SelectItem value="Audit">Audit</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={userdata.password}
                                    onChange={handleChange}
                                />
                            </div>
                           
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="systemType">System Type</Label>
                                    <Select
                                        value={userdata.systemType}
                                        onValueChange={(value) => setUserData({ ...userdata, systemType: value })}
                                    >
                                        <SelectTrigger id="systemType">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="Laptop">Laptop</SelectItem>
                                            <SelectItem value="PC">PC</SelectItem>
                                            <SelectItem value="Thin Client">Thin Client</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="processor">Processor</Label>
                                    <Select
                                        value={userdata.processor}
                                        onValueChange={(value) => setUserData({ ...userdata, processor: value })}
                                    >
                                        <SelectTrigger id="processor">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="DC">DC</SelectItem>
                                            <SelectItem value="DC 2.6">DC 2.6</SelectItem>
                                            <SelectItem value="DC 2.5">DC 2.5</SelectItem>
                                            <SelectItem value="i5 8th">i5 8th</SelectItem>
                                            <SelectItem value="AMD G-T56N 1.60">AMD G-T56N 1.60</SelectItem>
                                            <SelectItem value="CI5 3.0">CI5 3.0</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="ram">RAM</Label>
                                    <Select
                                        value={userdata.ram}
                                        onValueChange={(value) => setUserData({ ...userdata, ram: value })}
                                    >
                                        <SelectTrigger id="ram">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="2GB">2GB</SelectItem>
                                            <SelectItem value="4GB">4GB</SelectItem>
                                            <SelectItem value="6GB">6GB</SelectItem>
                                            <SelectItem value="8GB">8GB</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="hdd">HDD</Label>
                                    <Select
                                        value={userdata.hdd}
                                        onValueChange={(value) => setUserData({ ...userdata, hdd: value })}
                                    >
                                        <SelectTrigger id="hdd">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="20GB">20GB</SelectItem>
                                            <SelectItem value="256GB">256GB</SelectItem>
                                            <SelectItem value="320GB">320GB</SelectItem>
                                            <SelectItem value="500GB">500GB</SelectItem>
                                            <SelectItem value="1TB">1TB</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="monitorType">Monitor Type</Label>
                                    <Select
                                        value={userdata.monitorType}
                                        onValueChange={(value) => setUserData({ ...userdata, monitorType: value })}
                                    >
                                        <SelectTrigger id="monitorType">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="19&quot; TFT">19" TFT</SelectItem>
                                            <SelectItem value="Laptop">Laptop</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="brand">Brand</Label>
                                    <Select
                                        value={userdata.brand}
                                        onValueChange={(value) => setUserData({ ...userdata, brand: value })}
                                    >
                                        <SelectTrigger id="brand">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="AOC">AOC</SelectItem>
                                            <SelectItem value="DELL">DELL</SelectItem>
                                            <SelectItem value="HP">HP</SelectItem>
                                            <SelectItem value="LG">LG</SelectItem>
                                            <SelectItem value="LENOVO">LENOVO</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="monitorSNo">Monitor/Laptop S.No</Label>
                                    <Input
                                        id="monitorSNo"
                                        name="monitorSNo"
                                        placeholder="Monitor/Laptop S.No"
                                        value={userdata.monitorSNo}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="os">OS</Label>
                                    <Select
                                        value={userdata.os}
                                        onValueChange={(value) => setUserData({ ...userdata, os: value })}
                                    >
                                        <SelectTrigger id="os">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="WIN-7">WIN-7</SelectItem>
                                            <SelectItem value="WIN-7(OEM)">WIN-7(OEM)</SelectItem>
                                            <SelectItem value="WIN-8(OEM)">WIN-8(OEM)</SelectItem>
                                            <SelectItem value="WIN-10">WIN-10</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="msOffice">MS OFFICE</Label>
                                    <Select
                                        value={userdata.msOffice}
                                        onValueChange={(value) => setUserData({ ...userdata, msOffice: value })}
                                    >
                                        <SelectTrigger id="msOffice">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="OFFICE 2013">OFFICE 2013</SelectItem>
                                            <SelectItem value="KINGSOFT">KINGSOFT</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            

                            <div className="flex items-center space-x-2 m-2">
                                <input type='checkbox'
                                    checked={userdata.role}
                                    onChange={handlerole}
                                    name="role"
                                    id="terms"
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Make Admin ?
                                </label>
                            </div>


                        </div>
                        <div className="flex justify-end m-1" >
                            <Button type="submit" className="bg-black text-white rounded-xl"  >Add user</Button></div>
                    </form>
                </CardContent>
              
            </Card>
        </div>
        
    )
}

