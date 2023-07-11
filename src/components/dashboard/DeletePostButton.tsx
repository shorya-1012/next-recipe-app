"use client"
import { Trash2, Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { DeletePostPayload } from "@/lib/apiValidators"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PostDetails } from "@/app/dashboard/posts/columns"

type Props = {
    post: PostDetails
}

const DeletePostButton = ({ post }: Props) => {
    const router = useRouter()
    const { toast } = useToast()

    const { mutate: deletePost, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: DeletePostPayload = {
                postId: post.postId
            }

            const { data } = await axios.delete('/api/post/delete', { data: payload })
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 422) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'Post id not provided'
                    })
                    return
                }
                if (err.response?.status === 401) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'Your are not authorized to delete this post'
                    })
                    return
                }
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Some error occured'
                })
                return
            }
        },
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Post Deleted Successfully'
            })
            router.refresh()
        }
    })
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <div className="rounded border-2 border-slate-200 hover:bg-slate-200 p-2 hover:text-gray-800">
                                {
                                    isLoading ?
                                        <Loader2 size={'16px'} className="animate-spin" /> :
                                        <Trash2 size={'16px'} />
                                }
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="font-nunito bg-dark-body">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this post '{post.title}' by '{post.author}' and all related content.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deletePost()}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-200 text-xs text-gray-900">
                    <p>Delete Post</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default DeletePostButton