"use client"
import { useInfiniteQuery } from "@tanstack/react-query"
import Link from "next/link"
import UserPostCard from "@/components/UserPostCard"
import { useEffect, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import CardLoading from "@/components/CardLoading"
import { Post, User } from "@prisma/client"

type ExtendedPost = (Post & {
    user: User
})[] | undefined

const Post = () => {

    const { data, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery(
        ['query'],
        async ({ pageParam = 1 }) => {
            const res = await fetch(`/api/get-posts?count=${pageParam}`)
            const posts = await res.json()
            return posts.posts
        },
        {
            getNextPageParam: (_, pages) => {
                return pages.length + 1
            },
        }
    )

    const lastPostRef = useRef<HTMLElement>(null)
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1
    })

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage()
        }
    }, [entry])

    const posts = data?.pages.flatMap(page => page) as ExtendedPost

    return (
        <div className="w-full min-h-screen overflow-x-hidden flex flex-col items-center py-5 mt-3 ms-1 md:ms-0">
            {isLoading &&
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                </div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {
                    posts?.map((userPost, i) => {
                        if (i === posts.length - 1) {
                            return (
                                <div ref={ref} key={userPost.postId}>
                                    <Link href={`/recipes/${userPost.postId}`}>
                                        <UserPostCard
                                            key={userPost.postId}
                                            title={userPost.postTitle}
                                            postImageURL={userPost.imageURL}
                                            authorImageUrl={userPost.user.profileImageUrl}
                                            authorUserName={userPost.user.first_name + ' ' + userPost.user.last_name}
                                        />
                                    </Link>
                                </div>
                            )
                        }
                        return (
                            <div key={userPost.postId}>
                                <Link href={`/recipes/${userPost.postId}`}>
                                    <UserPostCard
                                        key={userPost.postId}
                                        title={userPost.postTitle}
                                        postImageURL={userPost.imageURL}
                                        authorImageUrl={userPost.user.profileImageUrl}
                                        authorUserName={userPost.user.first_name + ' ' + userPost.user.last_name}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            {isFetchingNextPage &&
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                </div>
            }
        </div>
    )
}

export default Post