import { Boards } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { getBoard } from "../../utils/services";
import Link from "next/link";
import Posts from "../Posts";
export default function BoardView({ slug }: { slug: string }) {
  const [board, setBoard] = useState<Boards>();
  useEffect(() => {
    getBoard(slug).then((data) => {
      setBoard(data);
    });
  }, []);

  return (
    <>
      <h1>{board?.name}</h1>
      <hr />
      <Posts slug={slug as string} />
    </>
  );
}
