import axios from "axios"
import { commonCommentsUrl } from "../URLS"


export const createComment = (commentData) => {
    return axios.post(commonCommentsUrl(commentData), commentData)
}
export const editComment = (commentData) => {
    console.table(commentData)
    return axios.put(commonCommentsUrl(commentData), commentData)
}
export const deleteComment = (commentData) => {
    console.table(commentData)
    return axios.delete(commonCommentsUrl(commentData), commentData)
}