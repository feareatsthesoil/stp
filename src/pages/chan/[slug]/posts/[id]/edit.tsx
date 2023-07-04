import { useRouter } from "next/router";
import DefaultLayout from "../../../../../Components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { getBoard, getPost } from "../../../../../utils/services";
import { Boards, Post } from "@prisma/client";
import Link from "next/link";
import PostForm from "../../../../../Components/Posts/PostForm";

export default function PostEditPAge() {
  const router = useRouter();
  const { id, slug } = router.query;

  const [post, setPost] = useState<Post>();

  const [version, setVersion] = useState(1);
  const [board, setBoard] = useState<Boards>();
  useEffect(() => {
    if (id)
      getPost(slug as string, Number(id) as number).then((data) => {
        setPost(data);
      });
  }, [id]);
  useEffect(() => {
    if (slug) getBoard(slug as string).then((data) => setBoard(data));
  }, [slug]);
  if (!post) return <DefaultLayout>Loading...</DefaultLayout>;
  return (
    <DefaultLayout>
      {post.attachment && <img className="py-2 max-h-[500px]" src={post.attachment} />}
      <PostForm post={post} slug={slug as string} />
    </DefaultLayout>
  );
}
