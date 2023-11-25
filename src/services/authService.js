export const fetchLogin = async (email, password) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        const data = await response.json()
        return { response: response, data: data }
    } catch (error) {
        console.log(error)
    }
}

export const fetchRegister = async (name, email, password) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL_DEFAULT_SERVER}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        })
        const data = await response.json()
        return { response: response, data: data }
    } catch (error) {
        console.log(error)
    }
}