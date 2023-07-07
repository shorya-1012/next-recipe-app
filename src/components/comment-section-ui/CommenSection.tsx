import { prisma } from "@/lib/db"
import CreateComment from "./CreateComment"
import PostComment from "./PostComment"

type Props = {
    postId: string,
}

const CommenSection = async ({ postId }: Props) => {

    const comments = await prisma.comment.findMany({
        where: {
            postsId: postId,
            replyToId: null,
        },
        include: {
            author: true,
            CommentLike: true,
            replies: {
                include: {
                    author: true,
                    CommentLike: true
                }
            }
        }
    })

    return (
        <div className="w-screen mx-auto rounded shadow-2xl py-5 px-5">
            <div className="h-fit py-5 ms-3">
                <h2 className="text-xl sm:text-2xl my-4 ms-2">Add a Comment</h2>
                <CreateComment postId={postId} />
            </div>
            {
                comments.map(comment => {
                    return (
                        <div className="flex flex-col">
                            <div className="mb-2">
                                <PostComment comment={comment} />
                            </div>
                            {
                                comment.replies.map(reply => {
                                    return (
                                        <div className="ml-4 py-2 pl-4 border-l-2 border-zinc-600">
                                            <PostComment comment={reply} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )

}

export default CommenSection
