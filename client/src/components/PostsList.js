import { NavLink } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { GET_POSTS } from '../URLS'

const PostsList = () => {
    const { isError, error, isLoading, data } = useFetch("get-posts", GET_POSTS)

    if (isLoading)
        return <h1>loading...</h1>
    if (isError)
        return <h1>{error.message}</h1>
    return (
        <div className='postsContainer'>{
            data?.map((post) => {
                return <NavLink to={`/post/${post.id}`} className="post">{post.title}</NavLink>

            })
        }</div>
    )
}

export default PostsList