"use client"
import "react-quill/dist/quill.snow.css"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Category, Visibility } from "@prisma/client"
import ReactQuill from "react-quill"
import Swal from "sweetalert2"
import { type CreatePostPayload } from "@/lib/apiValidators"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { AiOutlineLoading } from 'react-icons/ai'
import ImageUploadButon from "@/components/ImageUploadButon"
import Image from "next/image"

const page = () => {

    const router = useRouter()

    const [postTitle, setPostTitle] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [content, setContent] = useState('')
    const [categories, setCategories] = useState<Category[]>([])
    const [visibility, setVisibily] = useState('PUBLIC')
    const [imageURL, setImageURL] = useState("")

    const { mutate: createPost, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: CreatePostPayload = {
                title: postTitle,
                selectedCategory: selectedCategory,
                ingredients: ingredients,
                content: content,
                imageURL: imageURL,
                visibility: visibility as Visibility
            }

            const { data } = await axios.post('/api/create-recipe', payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 422) {
                    Swal.fire(
                        "Couldn't create post",
                        "The title should contain between 3 and 25 characters",
                        "error"
                    )
                    return
                }
                if (err.response?.status === 401) {
                    Swal.fire(
                        "Couldn't create post",
                        "Your are not authorized to create a post",
                        "error"
                    )
                    return
                }
                Swal.fire(
                    "Couldn't create post",
                    "Some error occured",
                    "error"
                )
            }
        },
        onSuccess: (data) => {
            console.log(data)
            Swal.fire(
                "Success",
                "Post created Successfully !",
                "success"
            )
            router.push(`/recipes/${data.id}`)
        }
    })

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch('/api/get-post-categories', {
                cache: "no-cache"
            })
            const data = await res.json()
            setCategories(data.categories)
        }
        getCategories()
    }, [])

    const handleFormSumbit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!postTitle || !selectedCategory || !ingredients || !content) {
            return
        }

        if (!imageURL) {
            Swal.fire(
                "No Image Uploaded",
                "Please upload an image of the recipe",
                "error"
            )
            return
        }

        createPost()

    }

    return (
        <div className="bg-dark-body text-white px-5 sm:px-8 min-h-screen">
            <h1 className=" text-4xl md:text-6xl font-righteous font-semibold mt-8 mb-3">Create A Recipe</h1>
            <p className="font-semibold text-2xl mb-7">Create , Share and Learn</p>
            <div className="h-full w-screen">
                <form
                    onSubmit={handleFormSumbit}
                    className="h-full w-full flex flex-col"
                >
                    <div className="flex flex-col my-5">
                        <label htmlFor="title" className=" text-xl mb-3">
                            Enter A Title For Your Post
                        </label>
                        <input
                            className="w-[70%] h-[35px] lg:w-[50%] sm:h-[40px] rounded-lg bg-dark-highlights pl-3"
                            type="text"
                            id="title"
                            placeholder="Enter title of your post"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col my-5">
                        <label className=" text-xl mb-3">Select A Category for your Recipe</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-dark-highlights w-[70%] lg:w-[50%] h-[35px] rounded">
                            <option value={""} disabled={true}>--Select a Category--</option>
                            {categories.map(category => {
                                return (
                                    <option className="py-2 mx-1 h-[40px] " key={category.id} value={category.name}>{category.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col mt-5 mb-16 md:mb-10 w-[90%] h-auto sm:w-[80%]">
                        <label className=" text-xl mb-3">
                            Enter the Ingredients of your Recipe
                        </label>
                        <ReactQuill
                            theme="snow"
                            value={ingredients}
                            onChange={(e) => setIngredients(e)}
                            className="h-[80px] md:h-[140px]"
                        />
                    </div>
                    <div className="flex flex-col my-5 w-[90%] h-auto sm:w-[80%]">
                        <label className=" text-xl mb-3">Add Details on how to prepare this recipe</label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={(e) => setContent(e)}
                            className="h-[200px]"
                        />
                    </div>
                    <div className="mt-16 md:mt-20 mb-8 flex flex-col items-start">
                        {
                            !imageURL ?
                                <ImageUploadButon setImageURL={setImageURL} /> :
                                <div className="relative overflow-hidden w-[350px] h-[250px] my-8 bg-dark-highlights">
                                    <Image
                                        src={imageURL}
                                        alt="uploaded image"
                                        fill={true}
                                        sizes="100%"
                                        className=" object-cover"
                                        placeholder="blur"
                                    />
                                </div>
                        }
                    </div>
                    <div className="flex flex-col mb-10">
                        <label className=" text-xl mb-3">Select who can view Recipe</label>
                        <select
                            value={visibility}
                            onChange={(e) => setVisibily(e.target.value)}
                            className="bg-dark-highlights w-[70%] lg:w-[50%] h-[35px] rounded">
                            <option value={""} disabled={true}>--Select--</option>
                            <option className="px-2 py-1" value={'PUBLIC'}>Public : Any one can view</option>
                            <option className="px-3 py-2" value={"PRIVATE"}>Private : Only you can view</option>
                        </select>
                    </div>
                    <button
                        className="border-2 border-gray-400 text-gray-400 rounded w-[180px] py-2 mb-5"
                        disabled={isLoading}
                    >
                        {isLoading ?
                            <div className="flex h-full items-center justify-center py-1 pr-2 gap-2">
                                <AiOutlineLoading className="animate-spin" size={20} />
                                <p>Creating Post</p>
                            </div>
                            : 'Create Post'}
                    </button>
                </form>
            </div >
        </div >
    )
}

export default page