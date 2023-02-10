import { useContext } from "react"
import { userContext } from "../context/userContext"
import useMutations from "../hooks/useMutations"
import CommentForm from "./CommentForm"
import { CommentsList } from "./CommentsList"
import { PostContext } from "./PostProvider"

export const Post = () => {
    const { post, rootComments } = useContext(PostContext)
    const { userData } = useContext(userContext)
    const { title, body } = post
    const { mutate: addComment } = useMutations().createComment
    const handleSubmitCommentForm = (message) => {
        console.log(message)
        addComment({
            postId: post.id,
            message: message,
            userId: userData.id
        })
    }
    return (
        <>
            <h1>{title}</h1>
            <article>{body}</article>
            <CommentForm onSubmit={handleSubmitCommentForm} />
            <h3 className="comments-title">Comments</h3>
            <div className="mt-4">
                <CommentsList comments={rootComments} />
            </div>
        </>
    )
}
