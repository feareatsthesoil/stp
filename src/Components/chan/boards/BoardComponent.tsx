"use client";

import linkify from "@/utils/linkify";
import { getBoards, getPosts } from "@/utils/services";
import { Boards } from "@prisma/client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import BoardPills from "./BoardPills";
import BoardSearch from "./BoardSearch";
import BoardView from "./BoardView";

export default function BoardComponent() {
  const { slug } = useParams();
  const pathname = usePathname();
  const [query, setQuery] = useState<string>("");
  const [isCatalogView, setIsCatalogView] = useState<boolean>(false);
  const [catalogText, setCatalogText] = useState<string>("Catalog");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoaderComponents, setShowLoaderComponents] =
    useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  const toggleCatalogView = () => {
    setIsCatalogView(!isCatalogView);
    setCatalogText(isCatalogView ? "Catalog" : "List");
  };

  const [boards, setBoards] = useState<Boards[]>([]);

  useEffect(() => {
    getBoards().then((data) => {
      const sortedBoards = data.sort((a, b) => a.id - b.id);
      setBoards(sortedBoards);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, [slug, query, currentPage]);

  const fetchPosts = async () => {
    const timer = setTimeout(() => {
      setShowLoaderComponents(true);
    }, 200);

    try {
      if (slug) {
        const { data: fetchedPosts, headers } = await getPosts(
          String(slug),
          query,
          currentPage
        );
        const tpages = Number(headers["total-pages"]);
        setTotalPages(tpages);

        for (let post of fetchedPosts) {
          post.content = linkify(post.content || "");
        }
        setPosts(fetchedPosts);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }

    clearTimeout(timer);
  };

  return (
    <div className="bg-[#F4F4FE]">
      <BoardSearch
        catalogText={catalogText}
        setQuery={setQuery}
        toggleCatalogView={toggleCatalogView}
      />
      <BoardPills slug={String(slug!)} currentPath={pathname} boards={boards} />
      <BoardView
        slug={slug ? (slug as string) : "all"}
        slugToPost="gc"
        query={query}
        isCatalogView={isCatalogView}
      />
    </div>
  );
}
