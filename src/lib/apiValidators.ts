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

export const PostFavouriteValidator = z.object({
    postId: z.string()
})

export const UserFollowValidator = z.object({
    followerId: z.string(),
    followingId: z.string()
})

export const UserUnFollowValidator = z.object({
    id: z.string()
})

export const NewCategoryValidator = z.object({
    name: z.string().min(3, 'Name should contain atleast 3 characters ')
})

export const DeletePostValidator = z.object({
    postId: z.string()
})

export const UpdateUserRoleValidator = z.object({
    id: z.string()
})

export const DeleteUserValidator = z.object({
    id: z.string()
})

export type CreateCommentPayload = z.infer<typeof CreateCommentValidator>
export type CreatePostPayload = z.infer<typeof CreatePostRequestValidator>
export type CommentLikePayload = z.infer<typeof CommentLikeValidator>
export type PostFavouritePayload = z.infer<typeof PostFavouriteValidator>
export type UserFollowPayload = z.infer<typeof UserFollowValidator>
export type UserUnFollowPayload = z.infer<typeof UserUnFollowValidator>
export type NewCategoryPayload = z.infer<typeof NewCategoryValidator>
export type DeletePostPayload = z.infer<typeof DeletePostValidator>
export type UpdateUserRolePayload = z.infer<typeof UpdateUserRoleValidator>
export type DeleteUserPayload = z.infer<typeof DeleteUserValidator>