export const GET_POSTS = "http://localhost:3300/posts"
export const GET_POST_DATA = "http://localhost:3300/post/"
export const commonCommentsUrl = ({ postId, id }) => `http://localhost:3300/posts/${postId}/comments${id ? `/${id}` : ""}`
