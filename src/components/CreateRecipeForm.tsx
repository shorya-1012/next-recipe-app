"use client"
import "@uploadthing/react/styles.css"
import type { createPostParams } from "@/app/create-recipe/page"
import { Category } from "@prisma/client";
import { useState, useRef } from "react"
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

type Props = {
    createPost: (details: createPostParams) => void;
    categories: Category[];
    user: string | null;
}


const CreateRecipeForm = (props: Props) => {

    const [postTitle, setPostTitle] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [content, setContent] = useState('')
    const [formDisable, setFormDisable] = useState(true)
    let imageURL: string = ' ';

    console.log(content)

    const handleFormSumbit = (e: any) => {
        e.preventDefault()
        const details = {
            title: postTitle,
            selectedCategory: selectedCategory,
            ingredients: ingredients,
            content: content,
            imageURL: imageURL,
            visibility: 'PUBLIC'
        }
        props.createPost(details)
    }

    return (
        <div className="h-full w-screen">
            <form onSubmit={handleFormSumbit} className="h-full w-full flex flex-col">
                <div className="flex flex-col my-5">
                    <label htmlFor="title">
                        Title
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
                    <label>Select A Category for your Recipe</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-dark-highlights w-[70%] lg:w-[50%] h-[35px] rounded">
                        {props.categories.map(category => {
                            return (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="flex flex-col my-5">
                    <label htmlFor="ingredients">
                        Ingredients
                    </label>
                    <textarea
                        className="w-[80%] h-[90px] lg:w-[80%] rounded-lg bg-dark-highlights px-3 pt-2"
                        id="ingredients"
                        placeholder="Enter then ingredients required in your recipe"
                        value={ingredients}
                        onChange={e => setIngredients(e.target.value)}
                    />
                </div>
                <div className="flex flex-col my-5 text-black w-[90%] sm:w-[80%]">
                    <label className="text-white">Add Details on how to prepare this recipe</label>
                </div>
                <UploadButton<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        alert("Upload Completed");
                        imageURL = res![0].fileUrl
                        setFormDisable(false)
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                />
                <button disabled={formDisable} className="border-2 border-gray-400 text-gray-400 rounded w-[180px] py-2 mb-5">
                    Create Recipe
                </button>
            </form>
        </div>
    )
}

export default CreateRecipeForm