import { useState, useEffect } from 'react';


function useFetch(fetchFunction, initialValue) {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        fetchFunction()
            .then(result => {
                setState(result);
            })
            .catch(e => console.log("Error from useFetch: ", e.message));
    }, [fetchFunction])

    return [
        state
    ]
    // useEffect(() => {
    //     fetch(`${baseURL}/posts`, {
    //         credentials: "include",
    //     })
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error('Can not get posts!');
    //             }
    //             return res.json()
    //         })
    //         .catch(e => console.log("Error from postsService: ", e.message));
    // }, [])
}

export default useFetch;