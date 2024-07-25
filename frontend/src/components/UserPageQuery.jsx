import * as React from "react"
import { Textarea } from "./ui/textarea"
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
} from "@/components/ui/select"

export function UserPageQuery() {
    return (
        <Card className="">
            <CardHeader>
                
                <CardDescription  >Add new query </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name of the user" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Desribe your issue</Label>
                            <Textarea/>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Major Isssues</Label>
                            <Select>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="next">Mouse Not working</SelectItem>
                                    <SelectItem value="sveltekit">Network Issue</SelectItem>
                                    <SelectItem value="astro">Excel hangs</SelectItem>
                                    <SelectItem value="nuxt">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="bg-black text-white" variant="outline">Submit</Button>
                
            </CardFooter>
        </Card>
    )
}