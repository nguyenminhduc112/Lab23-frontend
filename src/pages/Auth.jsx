import React from 'react'
import MainNavgation from '../components/layout/MainNavgation'
import AuthForm from '../components/auth/AuthForm'

const Auth = () => {
    return (
        <React.Fragment>
            <MainNavgation />
            <main>
                <AuthForm />
            </main>
        </React.Fragment>
    )
}

export default Auth
