import { IconBtn } from "./IconBtn"
import { FaEdit, FaReply, FaTrash } from "react-icons/fa"
import { PostContext } from "./PostProvider"
import { useContext, useState } from "react"
import { CommentsList } from "./CommentsList"
import CommentForm from "./CommentForm"
import useMutations from "../hooks/useMutations"
import { userContext } from "../context/userContext"

const dateFormatter = new Intl.DateTimeFormat(undefined, { // function for formate the date
    dateStyle: "medium",
    timeStyle: "short"
})
export const Comment = ({ id, message, user, createdAt }) => {
    const { getReplays, post } = useContext(PostContext)
    const { userData } = useContext(userContext)
    const replaysComments = getReplays(id)
    const [areReplaysHidden, setAreReplaysHidden] = useState(false)
    const [isReply, setIsReply] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const { mutate: addReply } = useMutations().createComment
    const { mutate: editComment } = useMutations().editComment
    const { mutate: deleteComment } = useMutations().deleteComment



    const handelSubmitFormForReply = (message) => {
        addReply({
            postId: post.id,
            message,
            parentId: id,
            userId: userData.id
        })
        setIsReply(false)
    }
    const handleEditComment = (message) => {
        editComment(
            {
                id,
                message,
                postId: post.id
            }
        )
        setIsEditing(false)

    }

    const handleDeleteComment = () => {
        deleteComment({
            postId: post.id,
            id,
        })

    }
    return (
        <>
            <div className="comment">
                <div className="header">
                    <span className="name">{user.name}</span>
                    <span className="date">{dateFormatter.format(new Date(createdAt))}</span>
                    {/* use the formatter for formate the date */}
                </div>
                {isEditing ? <CommentForm initialValue={message} onSubmit={handleEditComment} /> : <div className="message">{message}</div>}
                <div className="footer">
                    <IconBtn
                        Icon={FaReply}
                        isActive={isReply}
                        aria-label={isReply ? "cancel" : "Replay"}
                        onClick={() => setIsReply(prevState => !prevState)}
                    />
                    {userData.id === user.id && (
                        <>
                            <IconBtn
                                Icon={FaEdit}
                                isActive={isEditing}
                                aria-label={isEditing ? "cancel" : "Replay"}
                                onClick={() => setIsEditing(prevState => !prevState)}
                            />
                            <IconBtn Icon={FaTrash} aria-label="Delete" color="danger"
                                onClick={handleDeleteComment} />
                        </>)}

                </div>
            </div>
            {isReply && (
                <div className="mt-1 ml-3">
                    <CommentForm onSubmit={handelSubmitFormForReply} />
                </div>
            )}
            {replaysComments?.length !== 0 && (
                <>
                    <div className={`nested-comments-stack ${areReplaysHidden ? "hide" : ""}`}>
                        <button className="collapse-line" aria-label="Hide comments"
                            onClick={() => setAreReplaysHidden(true)} />
                        <div className="nested-comments">
                            <CommentsList comments={replaysComments} />
                        </div>

                    </div>
                    <button className={`btn mt-1 ${!areReplaysHidden ? "hide" : ""}`}
                        onClick={() => setAreReplaysHidden(false)}>Show Replays</button>
                </>
            )}

        </>
    )
}
