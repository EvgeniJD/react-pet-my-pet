import config from '../config';
const { baseURL } = config;

function createComment(comment) {
    return fetch(`${baseURL}/comments`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Can not create comment!');
            }
            return res.json()
        })
        .catch(e => console.log("Error from commentsService: ", e.message));
}

function getComments(postId) {
    return fetch(`${baseURL}/comments/${postId}`, { credentials: "include" })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Can not get comments !');
            }
            return res.json();
        })
        .catch(console.log);
}

function editComment(commentId, currentValue) {
    return fetch(`${baseURL}/comments/${commentId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentValue)
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Can not edit comment !');
            }
            return res.json();
        })
        .catch(console.log);
}

function deleteComment(commentId) {
    return fetch(`${baseURL}/comments/${commentId}`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Can not delete comment !');
        }
        return res.json();
    })
    .catch(console.log);
}

export default {
    createComment,
    getComments,
    editComment,
    deleteComment
}