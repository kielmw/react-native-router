import { useState , useEffect } from 'react'
import axios from 'axios'
import { findNodeHandle } from 'react-native';

const useFetch = (endpoint) => {
    const [data , setData] = useState([]);
    const [isLoading, setIsLoading] = useState (false);
    const [error , setError] = useState (null);

    const options = {
        method:"GET",
        url:`https://1cac-119-2-48-15.ngrok-free.app/${endpoint}`
    };

    const fetchData = async () =>{
        setIsLoading(true);
        try {
            const response = await axios.request
            (options);
            setData(response.data);
            setIsLoading(false);
        }catch (error){
            setError(error);
            alert('there is an error')
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    const refetch = () => {
        setIsLoading(true);
        fetchData;
    }

    return {data , isLoading , error , refetch};
}

export default useFetch;