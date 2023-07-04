import { z } from 'zod'
import { Visibility } from '@prisma/client'

export const apiPostRequestValidator = z.object({
    title: z.string().min(3, "Title should contain atleast 3 characters").max(50, "Title lenght cannot exceed 50 characters"),
    selectedCategory: z.string(),
    ingredients: z.string(),
    content: z.string(),
    imageURL: z.string().url(),
    visibility: z.nativeEnum(Visibility)
})

export type ApiPostRequest = z.infer<typeof apiPostRequestValidator>