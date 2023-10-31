import React from "react";
import Posts from "../posts";

export default function BoardView({
  slug,
  slugToPost,
  query,
  isCatalogView,
}: {
  slug: string;
  slugToPost?: string;
  query: string;
  isCatalogView: boolean;
}) {
  return (
    <>
      <div className="w-full">
        <Posts slug={slug} query={query} isCatalogView={isCatalogView} />
      </div>
    </>
  );
}
