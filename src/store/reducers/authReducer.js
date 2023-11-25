import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from '../../utils/cookie'
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: '',
        isLogin: getCookie('accessToken') ? true : false,
        isAdmin: getCookie('isAdmin') ? true : false,
    },
    reducers: {
        login: (state, action) => {
            state.isAdmin = action.payload.isAdmin
            state.isLogin = true
            state.name = action.payload.name
        },
        logout: (state) => {
            state.isAdmin = false
            state.isLogin = false
            state.name = ''
        }
    }
})

export const authAction = authSlice.actions

export default authSlice.reducer