"use client"
import { useInfiniteQuery } from "@tanstack/react-query"
import Link from "next/link"
import UserPostCard from "@/components/UserPostCard"
import { useEffect, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import CardLoading from "../CardLoading"
import { Post } from "@prisma/client"

type Props = {
    initialPosts: Post[]
}

const Posts = (props: Props) => {

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
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
            initialData: {
                pages: [props.initialPosts],
                pageParams: [1]
            }
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

    const posts = data?.pages.flatMap(page => page)

    return (
        <div className="w-screen min-h-screen overflow-x-hidden bg-dark-body text-white flex flex-col items-center ">
            <div className="w-full md:w-[80%] ms-10 sm:mx-auto py-5 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {
                    posts?.map((userPost, i) => {
                        if (i === posts.length - 1) {
                            return (
                                <div ref={ref} key={userPost.postId}>
                                    <Link href={`/recipes/${userPost.postId}`}>
                                        <UserPostCard key={userPost.postId} title={userPost.postTitle} imageURL={userPost.imageURL} categoryName={userPost.category[0].name} />
                                    </Link>
                                </div>
                            )
                        }
                        return (
                            <div key={userPost.postId}>
                                <Link href={`/recipes/${userPost.postId}`}>
                                    <UserPostCard key={userPost.postId} title={userPost.postTitle} imageURL={userPost.imageURL} categoryName={userPost.category[0].name} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            {isFetchingNextPage &&
                <div className="w-full md:w-[80%] ms-10 sm:mx-auto py-5 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                </div>
            }
        </div>
    )
}

export default Posts