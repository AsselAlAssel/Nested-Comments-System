import axios from "axios"
import { useQuery } from "react-query"
const fetchPostsData = () => {
    return axios.get("http://localhost:3300/posts")
}
export const usePostData = () => {
    return useQuery("get-posts", fetchPostsData)
}