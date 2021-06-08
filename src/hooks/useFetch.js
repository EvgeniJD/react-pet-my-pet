import { useState, useEffect } from 'react';

function useFetch(fetchFunction, props, initialValue) {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        fetchFunction(props)
            .then(result => {
                setState(result);
            })
            .catch(e => console.log("Error from useFetch: ", e.message));
    }, [fetchFunction])

    return [
        state,
        setState
    ]
    
}

export default useFetch;