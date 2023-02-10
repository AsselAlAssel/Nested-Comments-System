import { useQuery } from 'react-query'
import axios from "axios"

const fetchData = (url) => {
    return axios.get(url)
}

export const useFetch = (queryKey, url) => {
    return useQuery(queryKey, () => fetchData(url), {
        select: (data) => data.data
    })
}
