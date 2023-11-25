import React, { Suspense } from 'react'
import { fetchPost } from '../services/postService'
import { getCookie } from '../utils/cookie'
import { Await, defer, useLoaderData } from 'react-router-dom'
import Detail from '../components/detailPost/Detail'

const DetailPost = () => {
    const { post } = useLoaderData()
    return (
        <React.Fragment>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>...Loading</p>}>
                <Await resolve={post}>
                    {(postLoader) => <Detail post={postLoader} />}
                </Await>
            </Suspense>
        </React.Fragment>
    )
}

const fetchPostLoader = (id) => {
    const token = getCookie('accessToken')
    const data = fetchPost(token, id)
    return data
}
export const detailPostLoader = ({ request, params }) => {
    const { postId } = params
    return defer({
        post: fetchPostLoader(postId)
    })
}
export default DetailPost
