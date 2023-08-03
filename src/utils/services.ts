import { Boards, Comment, Post } from "@prisma/client";
import axios from "axios";
import { PostResponse } from "../types";

export const getBoards = () => {
  return axios.get<Boards[]>("/api/boards").then((response) => response.data);
};

export const getPosts = (slug: string, q?: string, page: number = 1) => {
  return axios
    .get<PostResponse[]>(
      `/api/boards/${slug}/posts?page=${page}${q ? `&q=${q}` : ""}`
    )
    .then((response) => response);
};
export const getPost = (slug: string, id: number) => {
  return axios
    .get<Post>(`/api/boards/${slug}/posts/${id}`)
    .then((response) => response.data);
};
export const createPost = (
  slug: string,
  data: {
    content: string | null;
    title: string | null;
    attachments: any[];
  }
) => {
  return axios
    .post<Post>(`/api/boards/${slug}/posts`, data)
    .then((response) => response.data);
};
export const editPost = (
  slug: string,
  id: number,
  data: {
    content: string | null;
    title: string | null;
    attachments: any[];
  }
) => {
  return axios
    .put<Post>(`/api/boards/${slug}/posts/${id}`, data)
    .then((response) => response.data);
};

export const deletePost = (slug: string, id: number) => {
  return axios
    .delete(`/api/boards/${slug}/posts/${id}`)
    .then((response) => response.data);
};

export const getBoard = (slug: string) => {
  return axios
    .get<Boards>(`/api/boards/${slug}`)
    .then((response) => response.data);
};

export const getComments = (postId: number) => {
  return axios
    .get<Comment[]>(`/api/posts/${postId}/comments`)
    .then((response) => response);
};

export const deleteComment = (postId: number, commentId: number) => {
  return axios
    .delete<Comment[]>(`/api/posts/${postId}/comments/${commentId}`)
    .then((response) => response.data);
};

export const createComment = (id: number, data: { content: string }) => {
  return axios
    .post<Comment>(`/api/posts/${id}/comments`, data)
    .then((response) => response.data);
};

export const getLikes = (likeableId: number, likeableType: string) => {
  return axios.get<{ count: number; liked: boolean }>(
    `/api/likes/?likeableId=${likeableId}&likeableType=${likeableType}`
  );
};

export const toggleLike = (likeableId: number, likeableType: string) => {
  return axios.post<{ likeableId: number; likeableType: string }>(
    `/api/likes/`,
    { likeableId, likeableType }
  );
};
