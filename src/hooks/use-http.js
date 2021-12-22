import React, { useCallback, useState } from 'react'

const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log('usehttp')

    const sendRequest = useCallback(async (reqConfig, applyData) => {
        console.log('send')
        setIsLoading(true);
        setError(null);

        try {
            setIsLoading(true);
            const response = await fetch(
                reqConfig.url, {
                method: reqConfig.method ? reqConfig.method : 'GET',
                headers: reqConfig.headers ? reqConfig.headers : {},
                body: reqConfig.body ? JSON.stringify(reqConfig.body) : null
            }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }
            const data = await response.json();
            applyData(data);

        } catch (err) {
            console.log('err')
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }
}


export default useHttp;