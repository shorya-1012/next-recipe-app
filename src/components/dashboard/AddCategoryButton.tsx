"use client"

import { Button } from "../ui/Button"
import { HiOutlinePlusSm } from 'react-icons/hi'
import { useMutation } from "@tanstack/react-query"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { NewCategoryPayload } from "@/lib/apiValidators"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

const AddCategoryButton = () => {

    const [newCategoryName, setNewCategoryName] = useState('')
    const router = useRouter()
    const { toast } = useToast()

    const { mutate: addNewCategory, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: NewCategoryPayload = {
                name: newCategoryName
            }

            const { data } = await axios.post('/api/add-category', payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 422) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'Name should contain atleast 3 characters '
                    })
                    return
                }
                if (err.response?.status === 401) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'Your are not authorized to create this post'
                    })
                    return
                }
                if (err.response?.status === 403) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Category with name ${newCategoryName} alerady exists`
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
                description: 'New Category added successfully'
            })
            router.refresh()
        }
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className=" bg-red-700 mt-5 rounded-xl flex gap-2 font-nunito"
                >
                    <HiOutlinePlusSm size={30} />
                    Add Category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] font-nunito bg-dark-body">
                <DialogHeader>
                    <DialogTitle className="mb-3 text-xl">Add New Category</DialogTitle>
                    <DialogDescription>
                        Click Add Category to create a new category
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Category Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="New category name"
                            className="col-span-3"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        className=" bg-dark-highlights rounded-xl"
                        onClick={() => addNewCategory()}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding new category...' : 'Add new category'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddCategoryButton