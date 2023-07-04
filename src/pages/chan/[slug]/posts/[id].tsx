import { Boards, Post } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Comments from "../../../../Components/Comments";
import CommentForm from "../../../../Components/Comments/CommentForm";
import DefaultLayout from "../../../../Components/Layouts/DefaultLayout";
import LikeButton from "../../../../Components/LikeButton";
import { getBoard, getPost } from "../../../../utils/services";

export default function PostViewPage() {
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
      <h1>
        <Link href={`/chan/${slug}`}>{board?.name}</Link> / {post.title}
      </h1>
      <p>{post.content}</p>
      <LikeButton likeableId={post.id} likeableType={"post"} />
      <Comments key={version} id={Number(id)} />
      <CommentForm
        onComplete={() => setVersion((v) => v + 1)}
        id={Number(id)}
      />
    </DefaultLayout>
  );
}
