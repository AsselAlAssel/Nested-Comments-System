import React from 'react'
import { usePostData } from './services/posts'

const PostsList = () => {
    const { isError, error, loading, data } = usePostData()
    if (loading)
        return <h1>loading...</h1>
    if (isError)
        return <h1>{error.message}</h1>
    return (
        <div>{
            data?.data?.map((post) => {
                return <h3 key={post.id}>{post.title}</h3>
            })
        }</div>
    )
}

export default PostsList