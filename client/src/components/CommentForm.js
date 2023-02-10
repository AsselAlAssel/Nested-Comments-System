import { useState } from "react"

const CommentForm = ({ onSubmit, initialValue }) => {
    const [message, setMessage] = useState(initialValue ?? "")
    const [error, setError] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.trim().length === 0) {
            setError("please write a comment")
            setMessage("")
            return
        }
        onSubmit(message)
        setMessage("")
    }
    const handleFocusTexArea = () => {
        setError("")
    }
    return (

        <form onSubmit={handleSubmit}>
            <div className="comment-form-row">
                <textarea
                    autoFocus={true}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="message-input"
                    onFocus={handleFocusTexArea}
                />
                <button className="btn" type="submit">
                    Post
                </button>
            </div>
            <div className="error-msg">{error}</div>

        </form>
    )
}

export default CommentForm