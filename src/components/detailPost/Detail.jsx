import React from 'react'
import styles from './Detail.module.css'
import { format } from 'date-fns'
const Detail = ({ post }) => {
    const dateFormat = format(new Date(post.createdAt), 'dd/MM/yyyy')
    return (
        <React.Fragment>
            <div className={styles.postItem}>
                <h1 className={styles.postItem_title}>{post.title}</h1>
                <p>Create by on {dateFormat}</p>
                <hr />
                <img src={`${process.env.REACT_APP_URL_DEFAULT_SERVER}/${post.imageUrl}`} alt={post.title} />
                <p>
                    {post.content}
                </p>
            </div>

        </React.Fragment>
    )
}

export default Detail
