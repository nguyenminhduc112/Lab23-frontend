import React, { Suspense } from 'react'
import PostList from '../components/home/PostList'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { fetchAllPost } from '../services/postService'
import { getCookie } from '../utils/cookie'
const Home = () => {
    const { posts } = useLoaderData()
    return (
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>...Loading</p>}>
                <Await resolve={posts}>
                    {(postLoader) => <PostList posts={postLoader} />}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}
const listPostLoader = () => {
    const token = getCookie('accessToken')
    const data = fetchAllPost(token)
    return data
}

export const homeLoader = (req, params) => {
    return defer({
        posts: listPostLoader()
    })
}


export default Home
