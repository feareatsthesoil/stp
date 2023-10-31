import { Boards } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getBoards } from "../../../utils/services";

export default function Boards() {
  const [boards, setBoards] = useState<Boards[]>();
  useEffect(() => {
    getBoards().then((data) => {
      setBoards(data);
    });
  }, []);

  return (
    <>
      {boards?.map((board) => {
        return (
          <>
            <div className="">
              <ul className="">
                <li>
                  <Link href={"/chan/" + (board.slug || "")}>{board.name}</Link>
                </li>
              </ul>
            </div>
          </>
        );
      })}
    </>
  );
}
