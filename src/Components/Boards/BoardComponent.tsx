import { Boards } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BoardSearch from "../../Components/Boards/BoardSearch";
import BoardView from "../../Components/Boards/BoardView";
import ChanLayout from "../../Components/Layouts/ChanLayout";
import { getBoards } from "../../utils/services";
import BoardPills from "./BoardPills";

export default function BoardComponent() {
  const router = useRouter();
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
  const {
    query: { slug, name },
  } = router;

  return (
    <div className="bg-[#F4F4FE]">
      <ChanLayout>
        <BoardSearch
          catalogText={catalogText}
          setQuery={setQuery}
          toggleCatalogView={toggleCatalogView}
        />
        <BoardPills
          slug={String(slug!)}
          currentPath={router.asPath}
          boards={boards}
        />
        <BoardView
          slug={slug ? (slug as string) : "all"}
          slugToPost="gc"
          query={query}
          isCatalogView={isCatalogView}
        />
      </ChanLayout>
    </div>
  );
}
