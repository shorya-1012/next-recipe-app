import { type Post, type Category } from "@prisma/client";
import UserPostCard from "@/components/UserPostCard";
import Link from "next/link";

type Props = {
    checkIfCurrUser: boolean;
    userPublicPosts: (Post & { category: Category[]; })[];
    userPrivatePosts: (Post & { category: Category[]; })[];
}

const UserPostPage = (props: Props) => {
    return (
        <div className={`${props.userPublicPosts.length === 0 ? 'hidden' : ''} w-screen max-w-[1440px] flex flex-col items-center my-10`}>
            <h3 className="text-2xl mb-2 font-nunito">{props.checkIfCurrUser ? 'Public Posts' : 'Posts'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {
                    props.userPublicPosts.map(userPost => {
                        return (
                            <Link href={`/recipes/${userPost.postId}`}>
                                <UserPostCard
                                    key={userPost.postId}
                                    title={userPost.postTitle}
                                    postImageURL={userPost.imageURL}
                                />
                            </Link>
                        )
                    })
                }
            </div>
            <div className={`${props.checkIfCurrUser && props.userPrivatePosts.length !== 0 ? '' : 'hidden'} w-full flex flex-col items-center mt-5`}>
                <h3 className="text-2xl font-nunito">Private Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center py-5">
                    {
                        props.userPrivatePosts.map(userPost => {
                            return (
                                <Link href={`/recipes/${userPost.postId}`}>
                                    <UserPostCard
                                        key={userPost.postId}
                                        title={userPost.postTitle}
                                        postImageURL={userPost.imageURL}
                                    />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default UserPostPage