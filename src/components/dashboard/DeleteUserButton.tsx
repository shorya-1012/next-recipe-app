"use client"
import { Trash2, Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { DeleteUserPayload } from "@/lib/apiValidators"
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
import { userDetails } from "@/app/dashboard/users/columns"
import { useAuth } from "@clerk/nextjs"

type Props = {
    user: userDetails
}

const DeleteUserButton = ({ user }: Props) => {
    const router = useRouter()
    const { toast } = useToast()
    const { userId } = useAuth()

    const { mutate: deleteUser, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: DeleteUserPayload = {
                id: user.id
            }

            const { data } = await axios.delete('/api/user/delete', { data: payload })
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 422) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'User id not provided'
                    })
                    return
                }
                if (err.response?.status === 401) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'Your are not authorized to delete a user'
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
                description: 'User Deleted Successfully'
            })
            router.refresh()
        }
    })
    return (
        <div className={`${userId === user.id ? 'hidden' : ''}`}>
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
                                        This action cannot be undone. This will permanently delete the user '{user.first_name + ' ' + user.last_name}' and all related content.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteUser()}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-200 text-xs text-gray-900">
                        <p>Delete User</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default DeleteUserButton