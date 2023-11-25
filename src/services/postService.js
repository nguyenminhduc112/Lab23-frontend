
export const fetchAllPost = async (token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/feed/posts`, {
            method: 'GET',
            headers: {
                'token': `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchPost = async (token, id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/feed/post/${id}`, {
            method: 'GET',
            headers: {
                'token': `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchAddPost = async (token, newData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/feed/post`, {
            method: 'POST',
            headers: {
                'token': `Bearer ${token}`
            },
            body: newData
        })
        const data = await response.json()
        return { response: response, message: data.message }
    } catch (error) {
        console.log(error)
    }
}

export const fetchEditPost = async (token, id, newData,) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/feed/post/${id}`, {
            method: 'PUT',
            headers: {
                'token': `Bearer ${token}`
            },
            body: newData
        })
        const data = await response.json()
        return { response: response, message: data.message }
    } catch (error) {
        console.log(error)
    }
}

export const fetchDeletePost = async (token, id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/feed/post/${id}`, {
            method: 'DELETE',
            headers: {
                'token': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}