"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import HandleUserRoleButton from "@/components/dashboard/HandleUserRoleButton"
import DeleteUserButton from "@/components/dashboard/DeleteUserButton"


export type userDetails = {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
}

export const columns: ColumnDef<userDetails>[] = [
    {
        accessorKey: "id",
        header: "User Id"
    },
    {
        accessorKey: "first_name",
        header: "First Name"
    },
    {
        accessorKey: "last_name",
        header: "Last Name"
    },
    {
        accessorKey: "role",
        header: "Role"
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="flex items-center gap-3">
                    <HandleUserRoleButton user={user} />
                    <DeleteUserButton user={user} />
                    <div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={`/user/${user.id}`}>
                                        <div className="rounded border-2 border-slate-200 hover:bg-slate-200 p-2 hover:text-gray-800">
                                            <Eye size={'16px'} />
                                        </div>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-200 text-xs text-gray-900">
                                    <p>View User</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div >
            )
        },
    },
]