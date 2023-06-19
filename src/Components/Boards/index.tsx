import { Boards } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { getBoards } from "../../utils/services";
import Link from "next/link";
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
            <div className="center">
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
