import React from 'react'
import classes from '../../assets/css/forms.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { fetchLogin, fetchRegister } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { authAction } from '../../store/reducers/authReducer.js'
import { setCookie } from '../../utils/cookie.js'
const AuthForm = () => {
    const [params] = useSearchParams()
    const dispatch = useDispatch()
    const router = useNavigate()
    const mode = params.get('mode')
    const { register, handleSubmit, setError, formState: { errors }, setValue } = useForm();
    // Xử lý submit thành công
    const onHandleSubmit = (data) => {
        const name = data.name
        const email = data.email
        const password = data.password
        // Xử lý form theo mode
        if (mode === 'login') {
            fetchLogin(email, password)
                .then(result => {
                    if (result.response.status === 500) {
                        setError('password', { message: result.data.message })
                        setValue('password', '')
                    }
                    if (result.response.status === 400) {
                        setError('password', { message: result.data.message })
                        setValue('password', '')
                    }
                    if (result.response.status === 200) {
                        dispatch(authAction.login({ isAdmin: result.data.user.admin, name: result.data.user.name }))
                        setCookie('isAdmin', result.data.user.admin, 1)
                        setCookie('accessToken', result.data.accessToken, 1)
                        router('/')
                    }
                })
                .catch(err => console.log(err))
        } else {
            fetchRegister(name, email, password)
                .then(result => {
                    if (result.response.status === 500) {
                        setError('password', { message: result.data.message })
                        setValue('password', '')
                    }
                    if (result.response.status === 400) {
                        setError('password', { message: result.data.message })
                        setValue('password', '')
                    }
                    if (result.response.status === 201) {
                        setValue('password', '')
                        setValue('name', '')
                        setValue('email', '')
                        router('/auth/?mode=login')
                    }
                })
                .catch(err => console.log(err))
        }
    }
    // Xử lý submit error
    const onHandleSubmitError = (error) => {
        setValue('password', '')
    }
    return (
        <React.Fragment>
            <form className={classes['product-form']} onSubmit={handleSubmit(onHandleSubmit, onHandleSubmitError)}>
                {mode === 'register' && <div className={classes['form-control']}>
                    <label htmlFor="Name">Name</label>
                    <input type="text" name="name" id="name" {...register('name', {
                        required: "Name is empty"
                    })} />
                    {errors.name && <p className='error'>{errors.name.message}</p>}
                </div>}
                <div className={classes['form-control']}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" {...register('email', {
                        required: "Email is empty",
                        pattern: {
                            value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Email invalidate'
                        }
                    })} />
                    {errors.email && <p className='error'>{errors.email.message}</p>}
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor="password">Password</label>
                    <input type='password' name="password" id="password"  {...register('password', {
                        required: "Password is empty",
                        minLength: {
                            value: 8,
                            message: 'Password must have a minimum of 8 characters'
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                            message: 'Password format must have at least one lowercase, uppercase and special character'
                        }
                    })} />
                    {errors.password && <p className='error'>{errors.password.message}</p>}
                </div>
                <button type="submit" className='btn'>{mode === 'login' ? 'Login' : 'Register'}</button>
            </form>
        </React.Fragment>
    )
}

export default AuthForm
