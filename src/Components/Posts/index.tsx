import { Post } from "@prisma/client"
import { useEffect, useState } from "react"
import { getPosts } from "../../utils/services"
import Link from "next/link"

export default function Posts (props: {slug: string}){

    const [posts, setPosts] = useState<Post[]>()

    const {slug} = props
    useEffect(()=>{
        getPosts(slug).then(resp=> setPosts(resp))
    }, [])
    if(!posts)
    return <>Loading...</>

    return <>
    {posts?.map(post=>{
        return <div>
            <h2>
                <Link href= {`/chan/${slug}/posts/${post.id}`}>{post.title}</Link>
            </h2>
            {post.content}
            <hr/>
        </div>
    })}
    </>
}