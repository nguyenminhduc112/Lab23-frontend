import React from 'react'
import { Outlet } from 'react-router'
import { redirect } from "react-router-dom";
import MainNavgation from '../components/layout/MainNavgation'
import { getCookie } from '../utils/cookie'
const Root = () => {
    return (
        <React.Fragment>
            <MainNavgation />
            <main>
                <Outlet />
            </main>
        </React.Fragment>
    )
}

export const rootLoader = function (req, params) {
    const token = getCookie('accessToken');
    if (!token) {
        console.log('redirect')
        return redirect("/auth/?mode=login");
    }
    return null
}

export default Root
