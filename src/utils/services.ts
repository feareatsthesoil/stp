import { Boards, Comment, Post } from "@prisma/client"
import axios from "axios"

export const getBoards = ()=>{
    return axios.get<Boards[]>("/api/boards").then(response=>response.data)

}

export const getPosts = (slug: string)=>{
    return axios.get<Post[]>(`/api/boards/${slug}/posts`).then(response=>response.data)

}
export const getPost = (slug: string, id:number)=>{
    return axios.get<Post>(`/api/boards/${slug}/posts/${id}`).then(response=>response.data)

}
export const createPost = (slug: string, data: {content: string, title: string})=>{
    return axios.post<Post>(`/api/boards/${slug}/posts`, data).then(response=>response.data)

}
export const getBoard = (slug: string)=>{
    return axios.get<Boards>(`/api/boards/${slug}`).then(response=>response.data)

}

export const getComments = (id: number)=>{
    return axios.get<Comment[]>(`/api/posts/${id}/comments`).then(response=>response.data)

}

export const createComment = (id: number, data: {content: string,})=>{
    return axios.post<Comment>(`/api/posts/${id}/comments`, data).then(response=>response.data)

}