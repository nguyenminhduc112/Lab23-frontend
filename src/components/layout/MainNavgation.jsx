import React from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCookie } from '../../utils/cookie'
import { authAction } from '../../store/reducers/authReducer'
const MainNavgation = () => {
    const [mode] = useSearchParams()
    const dispatch = useDispatch()
    const router = useNavigate()
    const isLogin = useSelector(state => state.auth.isLogin)
    const logOut = () => {
        deleteCookie('accessToken')
        deleteCookie('isAdmin')
        dispatch(authAction.logout())
        router('/auth/?mode=login')
    }
    return (
        <React.Fragment>
            <header className='main-header'>
                <nav className='main-header__nav'>
                    <ul className='main-header__item-list'>
                        {isLogin && <li className='main-header__item'>
                            <NavLink to={'/'} className={({ isActive }) => isActive ? 'active' : ''} end>Home</NavLink>
                        </li>}
                    </ul>
                    <ul className='main-header__item-list'>
                        {!isLogin && <li className='main-header__item'>
                            <NavLink to={'/auth/?mode=login'} className={({ isActive }) => isActive && mode.get('mode') === 'login' ? 'active' : ''} end>Login</NavLink>
                        </li>}
                        {!isLogin && <li className='main-header__item'>
                            <NavLink to={'/auth/?mode=register'} className={({ isActive }) => isActive && mode.get('mode') === 'register' ? 'active' : ''} end>Register</NavLink>
                        </li>}
                        {isLogin && <li className='main-header__item'>
                            <button style={{ backgroundColor: 'inherit', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }} onClick={logOut}>Logout</button>
                        </li>}
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default MainNavgation
