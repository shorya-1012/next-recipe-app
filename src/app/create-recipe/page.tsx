"use client"
import "@uploadthing/react/styles.css"
import "react-quill/dist/quill.snow.css"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { UploadButton } from "@uploadthing/react"
import { OurFileRouter } from "../api/uploadthing/core"
import { Category } from "@prisma/client"
import ReactQuill from "react-quill"
import Swal from "sweetalert2"

type createPostParams = {
    title: string;
    selectedCategory: string;
    ingredients: string;
    content: string;
    imageURL: string,
    visibility: string
}

const page = () => {

    const router = useRouter()

    const [postTitle, setPostTitle] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [content, setContent] = useState('')
    const [categories, setCategories] = useState<Category[]>([])
    const [visibility, setVisibily] = useState('PUBLIC')
    const [imageURL, setImageURL] = useState(" ")

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch('/api/get-post-categories')
            const data = await res.json()
            setCategories(data.categories)
        }
        getCategories()
    }, [])

    const handleFormSumbit = async (e: any) => {
        e.preventDefault()

        if (!postTitle || !selectedCategory || !ingredients || !content) {
            Swal.fire(
                "Incomplete Details",
                "Please fill the entire form",
                "error"
            )
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

        const details: createPostParams = {
            title: postTitle,
            selectedCategory: selectedCategory,
            ingredients: ingredients,
            content: content,
            imageURL: imageURL,
            visibility: visibility
        }
        const res = await fetch('/api/create-recipe', {
            method: 'POST',
            body: JSON.stringify(details)
        })
        if (res.ok) {
            Swal.fire(
                "Success",
                "Post created Successfully !",
                "success"
            )
        } else {
            Swal.fire(
                "Error",
                "Some Error Occurred",
                "error"
            )
        }
        router.push('/')
    }

    return (
        <div className="bg-dark-body text-white px-5 sm:px-8 min-h-screen">
            <h1 className=" text-4xl md:text-6xl font-righteous font-semibold mt-8 mb-3">Create A Recipe</h1>
            <p className="font-semibold text-2xl mb-7">Create , Share and Learn</p>
            <div className="h-full w-screen">
                <form onSubmit={handleFormSumbit} className="h-full w-full flex flex-col">
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
                        <label className="text-white mb-4 text-xl">Upload an Image of your Recipe</label>
                        <UploadButton<OurFileRouter>
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                setImageURL(res![0].fileUrl)
                                Swal.fire(
                                    'Sucess!',
                                    'Image Uploaded Successfully!',
                                    'success'
                                )
                            }}
                            onUploadError={(error: Error) => {
                                const err = error.message
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: err
                                })
                            }}
                        />
                    </div>
                    <div className="flex flex-col mb-10">
                        <label className=" text-xl mb-3">Select who can view Recipe</label>
                        <select
                            value={visibility}
                            onChange={(e) => setVisibily(e.target.value)}
                            className="bg-dark-highlights w-[70%] lg:w-[50%] h-[35px] rounded">
                            <option value={""} disabled={true}>--Select--</option>
                            <option value={'PUBLIC'}>PUBLIC : Any one can view</option>
                            <option value={"PRIVATE"}>Private : Only you can view</option>
                        </select>
                    </div>
                    <button className="border-2 border-gray-400 text-gray-400 rounded w-[180px] py-2 mb-5">
                        Create Recipe
                    </button>
                </form>
            </div >
        </div >
    )
}

export default page