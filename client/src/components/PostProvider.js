import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { GET_POST_DATA } from "../URLS"
import { createContext } from "react"
import { Post } from "./Post"

export const PostContext = createContext()

function PostProvider() {
    const { id } = useParams()
    const { isError, error, isLoading, data: postData } = useFetch("get-post-data", GET_POST_DATA + id);

    const post = postData || {};  // use this way to fix a error 
    const { Comments } = post

    const commentsByParentId = useMemo(() => {
        if (!Comments) return [];
        const group = {};
        Comments.forEach(comment => {
            group[comment.parentId] = group[comment.parentId] || [];
            group[comment.parentId].push(comment);
        });
        return group;
    }, [Comments]);

    const getReplays = parentId => commentsByParentId[parentId] || [];

    if (isLoading) return <h1>Loading</h1>;
    if (isError) return <h1 className="error-msg">{error.message}</h1>;
    console.table(postData)
    return (
        <PostContext.Provider
            value={{
                post: { id, ...post },
                rootComments: getReplays(null),
                getReplays
            }}
        >
            <Post />
        </PostContext.Provider>
    );
}

export default PostProvider;
