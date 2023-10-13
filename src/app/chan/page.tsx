import React from "react";
import { Metadata } from "next";
import BoardComponent from "../../components/chan/boards/BoardComponent";

export const metadata: Metadata = {
  title: "Serving the People",
};

export default function BoardsIndexPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log("params", params);
  return <BoardComponent />;
}
