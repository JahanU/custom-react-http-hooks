import React, { useState, useEffect } from 'react'


const useHttp = (reqConfig, applyData) => {
    // reqConfig = { url, method, body, headers }
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async () => {
        setIsLoading(true);
        setError(null);

        try {
            setIsLoading(true);
            const response = await fetch(
                reqConfig.url, {
                method: reqConfig.method,
                headers: reqConfig.headers,
                body: JSON.stringify(reqConfig.body),
            }
            );
            if (!response.ok) {
                throw new Error('Request failed!');
            }
            const data = await response.json();
            applyData(data);

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    return {
        isLoading,
        error,
        sendRequest
    }
}


export default useHttp;