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
            <h3 className="text-2xl font-nunito">{props.checkIfCurrUser ? 'Public Posts' : 'Posts'}</h3>
            <div className="w-full md:w-[95%] lg:w-[90%] sm:mx-auto py-5 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {
                    props.userPublicPosts.map(userPost => {
                        return (
                            <Link href={`/recipes/${userPost.postId}`}>
                                <UserPostCard key={userPost.postId} title={userPost.postTitle} imageURL={userPost.imageURL} categoryName={userPost.category[0].name} />
                            </Link>
                        )
                    })
                }
            </div>
            <div className={`${props.checkIfCurrUser && props.userPrivatePosts.length !== 0 ? '' : 'hidden'} w-full flex flex-col items-center mt-5`}>
                <h3 className="text-2xl font-nunito">Private Posts</h3>
                <div className="w-full md:w-full lg:w-[90%] sm:mx-auto py-5 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                    {
                        props.userPrivatePosts.map(userPost => {
                            return (
                                <Link href={`/recipes/${userPost.postId}`}>
                                    <UserPostCard key={userPost.postId} title={userPost.postTitle} imageURL={userPost.imageURL} categoryName={userPost.category[0].name} />
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