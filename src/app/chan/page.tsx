import React from "react";
import BoardComponent from "../../Components/chan/boards/BoardComponent";

export default function BoardsIndexPage({
  params,
}: {
  params: { slug: string };
}) {
  return <BoardComponent />;
}
