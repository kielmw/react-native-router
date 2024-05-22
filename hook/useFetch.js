import { useState , useEffect } from 'react'
import axios from 'axios'
import { findNodeHandle } from 'react-native';

const useFetch = (endpoint , query) => {
    const [data , setData] = useState([]);
    const [isLoading, setIsLoading] = useState (false);
    const [error , setError] = useState (null);

    const options = {
        method: 'GET ',
        url: `https://6292-182-253-50-137.ngrok-free.app/${endpoint}` ,
        params: {...query}
    };

    const fetchData = async () =>{
        setIsLoading(true);
        try {
            const response = await axios.request
            (options);

            setData(response.data.data);
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
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData;
    }

    return {data , isLoading , error , refetch};
}