"use client";

import nav from "@/components/portal/nav/Nav.json";
import { motion } from "framer-motion";
import React from "react";
import LinkComponent from "./LinkComponent";

const NavListMotion: React.FC = () => {
  return (
    <motion.ul
      className="flex flex-col items-center justify-center font-sans text-sm uppercase text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: "easeOut",
        delay: 0.85,
        staggerChildren: 0.5,
      }}
    >
      <motion.li
        className="relative z-50 mt-10 space-y-7"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {nav.items.map((item) => (
          <LinkComponent key={item.href} item={item} />
        ))}
      </motion.li>
    </motion.ul>
  );
};

export default NavListMotion;
