import React, { useEffect, useState } from 'react'
import classes from '../../assets/css/product.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormAdd from '../postForms/FormAdd';
import { useNavigate } from 'react-router';
import FormEdit from '../postForms/FormEdit';
import { getCookie } from '../../utils/cookie';
import { fetchDeletePost } from '../../services/postService';
import openSocket from 'socket.io-client'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};
const PostList = ({ posts }) => {
    const router = useNavigate()
    useEffect(() => {
        const socket = openSocket(process.env.REACT_APP_URL_DEFAULT_SERVER)
        socket.on('posts', data => {
            if (data.action === 'create' || data.action === 'delete' || data.action === 'update') {
                router('/')
            }
        })
    }, [posts])
    // =============== Modal ==================
    const [openFormAdd, setOpenFormAdd] = useState(false);
    const handleOpenFormAdd = () => setOpenFormAdd(true);
    const handleCloseFormAdd = () => setOpenFormAdd(false);

    /////////////////////////////////////////////////////////
    return (
        <React.Fragment>
            <button className='btn' style={{ marginBottom: 20 }} onClick={handleOpenFormAdd}>New Post</button>
            <div className="grid">
                {posts.length > 0 ? posts.map((post, index) => <ListPostRender key={index} post={post} />) : <h3>Post is Empty</h3>}
            </div>
            <div>
                <Modal
                    open={openFormAdd}
                    onClose={handleCloseFormAdd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add New Post
                        </Typography>
                        <FormAdd />
                    </Box>
                </Modal>
            </div>

        </React.Fragment>
    )
}

// Render List Posts
const ListPostRender = ({ post }) => {
    const token = getCookie('accessToken')
    const router = useNavigate()
    const [openFormEdit, setOpenFormEdit] = useState(false);
    const handleOpenFormEdit = () => setOpenFormEdit(true);
    const handleCloseFormEdit = () => setOpenFormEdit(false);
    // Functions actions
    const handleMoveDetailPage = (id) => {
        router(`/detail/${id}`)
    }
    const handleDetelPost = (id) => {
        fetchDeletePost(token, id)
            .then(res => {
                if (res.status === 500) {
                    alert('Delete Post Failed!')
                }
                if (res.status === 401) {
                    alert('Delete Post Failed!')
                }
                if (res.status === 200) {
                    alert('Delete Post Success!')
                    router(`/`)
                }
            })
            .catch(err => console.log(err))
    }
    /////////////////////////////////////////////////////////
    return (<article className={`card ${classes['product-item']}`}>
        <header className="card__header">
            <h1 className={classes['product__title']}>{post.title}</h1>
        </header>
        <div className="card__image">
            <img
                src={`${process.env.REACT_APP_URL_DEFAULT_SERVER}/${post.imageUrl}`}
                alt={post.title}
            />
        </div>
        <div className="card__content">
            <p className={classes['product__description']}>
                {post.content}
            </p>
        </div>
        <div className="card__actions">
            <button className="btn" onClick={handleMoveDetailPage.bind(null, post._id)}>View</button>
            <button className="btn" onClick={handleOpenFormEdit}>Edit</button>
            <button className="btn" onClick={handleDetelPost.bind(null, post._id)}>Delete</button>
        </div>
        <div>
            <Modal
                open={openFormEdit}
                onClose={handleCloseFormEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Post
                    </Typography>
                    <FormEdit post={post} />
                </Box>
            </Modal>
        </div>
    </article>)
}

export default PostList
