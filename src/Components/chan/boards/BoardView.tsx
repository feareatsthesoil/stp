import React, { useContext, useEffect, useState } from "react";
import Posts from "../posts";
import { UserContext } from "../../userContext";

export default function BoardView({
  slug,
  slugToPost,
  query,
  isCatalogView,
}: {
  slug?: string;
  slugToPost?: string;
  query: string;
  isCatalogView: boolean;
}) {
  return (
    <>
      <div className="w-full">
        <Posts
          slug={slug as string}
          query={query}
          isCatalogView={isCatalogView}
        />
      </div>
    </>
  );
}