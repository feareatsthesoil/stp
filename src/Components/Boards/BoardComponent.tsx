"use client";

import React, { useEffect, useState } from "react";
import BoardSearch from "../../Components/Boards/BoardSearch";
import BoardPills from "./BoardPills";
import { Boards } from "@prisma/client";
import { getBoards } from "@/utils/services";
import BoardView from "./BoardView";
import { useParams, usePathname } from "next/navigation";

export default function BoardComponent() {
  const { slug } = useParams();
  const pathname = usePathname();
  const [query, setQuery] = useState<string>("");
  const [isCatalogView, setIsCatalogView] = useState<boolean>(false);
  const [catalogText, setCatalogText] = useState<string>("Catalog");

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
  console.log("slug", slug, pathname);

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
