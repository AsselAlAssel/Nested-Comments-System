import { Comment } from "./Comment"

export const CommentsList = ({ comments }) => {
    return comments?.map(comment => {
        console.log(comment)
        return <Comment key={comment.id} {...comment} />
    })
}
