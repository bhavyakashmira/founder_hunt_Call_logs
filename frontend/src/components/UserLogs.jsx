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

const call_logs = 
    [
        { sno: "1", status: "done", timestamp: "2024-07-21", issue: "mouse not working" },
        { sno: "2", status: "pending", timestamp: "2024-07-22", issue: "keyboard not responsive" },
        { sno: "3", status: "in-progress", timestamp: "2024-07-23", issue: "screen flickering" },
        { sno: "4", status: "done", timestamp: "2024-07-23", issue: "printer not printing" },
        { sno: "5", status: "pending", timestamp: "2024-07-24", issue: "wifi connection issue" }
    ]



export function Userlogs() {
    return (
        <Table>
            
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">SNO</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {call_logs.map((issue) => (
                    <TableRow key={issue.issue}>
                        <TableCell className="font-medium">{issue.sno}</TableCell>
                        <TableCell>{issue.status}</TableCell>
                        <TableCell>{issue.issue}</TableCell>
                        <TableCell className="text-right">{issue.timestamp}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
