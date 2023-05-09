import { useEffect, useState } from "react";
import Link from "next/link";
import { Grid } from "@mui/material";
import axios from 'axios'

import css from "../styles/Blog.module.css"
import { Post } from "../types/substack";
import DefaultLayout from "../Components/Layouts/DefaultLayout";

export default function Blog() {

    const [posts, setPosts] = useState<Post[]>()
    useEffect(() => {

        axios.get("https://substackapi.com/api/feeds/blog.stp.world?limit=12&sort=new").then(({ data }) => {
            setPosts(data)
        })

    }, [])

    return <DefaultLayout>
        {posts?.map((post) => {
            return <>
                <div className={css.wrapper}>
                    <Link href={post.canonical_url} target="_blank">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                                <div className={css.poster} style={{
                                    backgroundImage: `url(${post.cover_image})`
                                }} />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <div className={css.title}>
                                    {post.title}
                                </div>
                                <div className={css.subTitle}>
                                    {post.subtitle}
                                </div>
                                <div className={css.stats}>
                                    <ul>
                                        <li>
                                            <p> {post.post_date}</p>
                                        </li>
                                        <li>
                                            <svg viewBox="0 -4 30 24" height={13} fill="transparent" stroke="rgb(112, 112, 112)" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg> <div className={css.reaction}><p>{post.reactions['❤']}
                                            </p></div>
                                        </li>
                                    </ul>
                                </div>

                            </Grid>
                        </Grid>
                    </Link>
                </div>
            </>
        })}
    </DefaultLayout>
}