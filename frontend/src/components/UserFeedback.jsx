import * as React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { Textarea } from "./ui/textarea"

export function UserFeedback() {
    return (
        <Card className="w-[600px] p-2">
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4 p-2">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Issue No</Label>
                            <Input id="name" placeholder="Enter issue No" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">feedback</Label>
                            <Textarea placeholder="enter your feedback" /> 
                        </div>
                        <div className="flex flex-col space-y-1.5" >
                            <Label>How was your experience</Label>
                            <RadioGroup defaultValue="comfortable">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="default" id="r1" />
                                    <Label htmlFor="r1">Excellent</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="comfortable" id="r2" />
                                    <Label htmlFor="r2">Good</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="compact" id="r3" />
                                    <Label htmlFor="r3">Bad</Label>
                                </div>
                            </RadioGroup>
                     </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Submit</Button>
             
            </CardFooter>
        </Card>
    )
}
