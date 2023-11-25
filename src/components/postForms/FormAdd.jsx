import React, { useState } from 'react'
import classes from '../../assets/css/forms.module.css'
import { useForm } from 'react-hook-form';
import { fetchAddPost } from '../../services/postService';
import { getCookie } from '../../utils/cookie';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router';

const FormAdd = () => {
    const token = getCookie('accessToken')
    const router = useNavigate()
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false)
    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            content: ''
        }
    });
    // const router = useNavigate()
    // Xử lý submit thành công
    const onHandleSubmit = (data) => {
        const typeImages = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
        const image = data.image[0]
        const title = data.title
        const content = data.content
        if (!image) {
            setError('image', { message: 'You need import file image' })
        } else {
            if (!typeImages.includes(data.image[0].type)) {
                setError('image', { message: 'This is not an image' })
            } else {
                const newData = new FormData();
                newData.append('image', image);
                newData.append('jsonData', JSON.stringify({ title: title, content: content }));
                fetchAddPost(token, newData)
                    .then(result => {

                        if (result.response.status === 500) {
                            setError('content', { message: result.message })
                        }
                        if (result.response.status === 401) {
                            setError('content', { message: result.message })
                        }
                        if (result.response.status === 201) {
                            setOpenAlertSuccess(true)
                            reset()
                            router('/')
                            setTimeout(() => {
                                setOpenAlertSuccess(false)
                            }, 5000)
                        }
                    })
                    .catch(err => console.log(err))
            }
        }


    }
    return (
        <React.Fragment>
            {openAlertSuccess && <Alert severity="success">Post Created Successly!</Alert>}
            <form className={classes['product-form']} onSubmit={handleSubmit(onHandleSubmit)} encType="multipart/form-data">
                <div className={classes['form-control']}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" {...register('title', {
                        required: "Title is empty"
                    })} />
                    {errors.title && <p className='error'>{errors.title.message}</p>}
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" id="image" {...register("image")} />
                    {errors.image && <p className='error'>{errors.image.message}</p>}
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor="content">Content</label>
                    <textarea name="content" id="content" {...register('content', {
                        required: "Content is empty",
                        minLength: {
                            value: 8,
                            message: 'Content must be 8 characters or more'
                        }
                    })} ></textarea>
                    {errors.content && <p className='error'>{errors.content.message}</p>}
                </div>
                <button type="submit" className='btn'>Add Post</button>
            </form>
        </React.Fragment>
    )
}

export default FormAdd
