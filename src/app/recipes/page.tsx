"use client"
import { useInfiniteQuery } from "@tanstack/react-query"
import Link from "next/link"
import UserPostCard from "@/components/UserPostCard"
import { useEffect, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import CardLoading from "@/components/CardLoading"


const page = () => {

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
        console.log(entry)
        if (entry?.isIntersecting) {
            fetchNextPage()
        }
    }, [entry])

    const posts = data?.pages.flatMap(page => page)

    return (
        <div className="w-full min-h-screen overflow-x-hidden bg-dark-body text-white flex flex-col items-center ms-1 md:ms-0">
            {isLoading &&
                <div className="w-full md:w-[80%] sm:mx-auto py-5 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center">
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                </div>
            }
            <div className="w-full md:w-full lg:w-[90%] sm:mx-auto py-5 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
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
                <div className="w-full md:w-[80%] sm:mx-auto py-5 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                </div>
            }
        </div>
    )
}

export default page