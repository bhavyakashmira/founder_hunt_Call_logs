import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { UserPageQuery } from "./UserPageQuery"
import { Userlogs } from "./UserLogs"
import { UserFeedback } from "./UserFeedback"
import { useNavigate } from "react-router-dom"

export function UserPageTabs() {
    const navigate = useNavigate();
    return (
        <Tabs defaultValue="account" className=" ">
            <TabsList className="grid w-full grid-cols-4  bg-black text-white rounded-xl p-3 ">
                <TabsTrigger value="query">Add query</TabsTrigger>
                <TabsTrigger value="logs">pending logs</TabsTrigger>
                <TabsTrigger value="feedback">fill feedback</TabsTrigger>
                <TabsTrigger value="password" >closed logs</TabsTrigger>
            </TabsList>
            <TabsContent value="query">
                <UserPageQuery/>
            </TabsContent>
            <TabsContent value="logs">
                <Userlogs/>
            </TabsContent>
            <TabsContent value="feedback" className="flex justify-center m-10" >
              <UserFeedback/>
            </TabsContent>
        </Tabs>
    )
}

