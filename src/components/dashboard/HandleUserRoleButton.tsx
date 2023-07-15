import { useState } from 'react'
import { Loader2, UserCheck, UserX } from "lucide-react"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { AiOutlineLoading } from 'react-icons/ai'
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
import { userDetails } from '@/app/dashboard/users/columns'
import { useMutation } from '@tanstack/react-query'
import { UpdateUserRolePayload } from '@/lib/apiValidators'
import { useAuth } from '@clerk/nextjs'


type Props = {
    user: userDetails
}

const HandleUserRoleButton = ({ user }: Props) => {

    const [isAdmin, setIsAdmin] = useState(user.role === 'ADMIN')
    const router = useRouter()
    const { toast } = useToast()
    const { userId } = useAuth()

    const { mutate: updateUser, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: UpdateUserRolePayload = {
                id: user.id
            }

            const { data } = await axios.put('/api/user/set-role', payload)
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
                        description: 'Your are not authorized to update user role'
                    })
                    return
                }
                if (err.response?.status === 403) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'Cannot update your own role'
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
                description: 'User updated Successfully'
            })
            setIsAdmin(prev => !prev)
            router.refresh()
        }
    })

    return (
        <div className={`${user.id === userId ? 'hidden' : ''} w-fit h-fit`}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <div className="rounded border-2 border-slate-200 hover:bg-slate-200 p-2 hover:text-gray-800">
                                    {
                                        isLoading ? <Loader2 size={'16px'} className='animate-spin' /> :
                                            isAdmin ?
                                                <UserX size={'16px'} />
                                                : <UserCheck size={'16px'} />
                                    }
                                </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="font-nunito bg-dark-body">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {isAdmin ?
                                            `Are you sure you want to demote ${user.first_name + ' ' + user.last_name} from ADMIN ?` :
                                            `Are you sure you want to promote ${user.first_name + ' ' + user.last_name} to ADMIN ?`
                                        }
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => updateUser()}>
                                        {
                                            isAdmin ?
                                                'Demote from ADMIN' :
                                                'Promote to ADMIN'
                                        }
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-200 text-xs text-gray-900">
                        <p>{isAdmin ? 'Demote from' : 'Promote to'} Admin</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default HandleUserRoleButton