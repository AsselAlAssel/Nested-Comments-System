import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import { createComment, deleteComment, editComment } from "../services/comment";
import { login } from "../services/user";

export const useMutations = () => {
    const navigate = useNavigate();
    const { setUserData } = useContext(userContext);
    const queryClient = useQueryClient();
    const handleOnSuccess = () => {
        queryClient.invalidateQueries("get-post-data")
    }
    const commonConfig = {
        onSuccess: handleOnSuccess
    }
    return {
        createComment: useMutation(createComment, commonConfig),
        editComment: useMutation(editComment, commonConfig),
        deleteComment: useMutation(deleteComment, commonConfig),
        login: useMutation(login, {
            onSuccess: (data) => {
                console.log(data.data)
                setUserData({
                    id: data.data.id,
                    name: data.data.name,
                    isLogin: true
                })
                navigate("/posts")

            }
        })
    }

}
export default useMutations;

