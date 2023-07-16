"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Eye} from "lucide-react"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import DeletePostButton from "@/components/dashboard/DeletePostButton"
import Link from "next/link"

export type PostDetails = {
    postId: string;
    title: string;
    author: string;
}

export const columns: ColumnDef<PostDetails>[] = [
    {
        accessorKey: "postId",
        header: "Post Id"
    },
    {
        accessorKey: "title",
        header: "Post Title"
    },
    {
        accessorKey: "author",
        header: "Author"
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({row}) => {
            const post = row.original

            return (
                <div className="flex gap-3">
                    <DeletePostButton post={post} />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={`/recipes/${post.postId}`}>
                                    <div className="rounded border-2 border-slate-200 hover:bg-slate-200 p-2 hover:text-gray-800">
                                        <Eye size={'16px'} />
                                    </div>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-200 text-xs text-gray-900">
                                <p>View Post</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )
        },
    },
]
