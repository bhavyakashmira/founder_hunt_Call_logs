import { UserPageTabs } from "@/components/UserPageTabs"
import logo from "../../public/logo.png"


export function UserPage() {


    return (
        <div className=" bg-gray-600 p-10 min-h-screen " >
            <img src={logo} className="w-[100px] h-[50px]" />
            <UserPageTabs/>
        </div>  
    )
}