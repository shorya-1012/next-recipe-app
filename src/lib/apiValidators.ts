import { z } from 'zod'
import { Visibility } from '@prisma/client'

export const CreatePostRequestValidator = z.object({
    title: z.string().min(3, "Title should contain atleast 3 characters").max(50, "Title lenght cannot exceed 50 characters"),
    selectedCategory: z.string(),
    ingredients: z.string(),
    content: z.string(),
    imageURL: z.string().url(),
    visibility: z.nativeEnum(Visibility)
})

export const CreateCommentValidator = z.object({
    postId: z.string(),
    text: z.string().min(2, 'comment shoudl contain at least 2 characters'),
    replyToId: z.string().optional()
})

export const CommentLikeValidator = z.object({
    commentCommentId: z.string()
})

export const CommentUnlikeValidator = z.object({
    id: z.string()
})

export type CreateCommentPayload = z.infer<typeof CreateCommentValidator>
export type CreatePostPayload = z.infer<typeof CreatePostRequestValidator>
export type CommentLikePayload = z.infer<typeof CommentLikeValidator>
export type CommentUnlikePayload = z.infer<typeof CommentUnlikeValidator> 