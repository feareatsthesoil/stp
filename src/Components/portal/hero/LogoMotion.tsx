"use client";

import Logo from "@/components/portal/logo/Logo";
import spotlight from "@/images/spotlight.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const LogoMotion: React.FC = () => {
  return (
    <div className="relative flex h-[90px] w-[300px] flex-col justify-center">
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "34%",
          zIndex: 1,
        }}
        initial={{ y: "150%", opacity: 1 }}
        animate={{ y: "-50%", opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: "60%",
            left: "5%",
            transform: "translate(-50%, -50%)",
            zIndex: -1,
            width: "300px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div
            style={{
              position: "absolute",
              top: "49%",
              left: "66.2%",
              transform: "translate(-50%, -50%)",
              width: "95px",
              height: "81px",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              zIndex: 1,
            }}
          />
          <Image src={spotlight} alt="spotlight" draggable={false} />
        </motion.div>
        <Logo width={95} />
      </motion.div>
    </div>
  );
};

export default LogoMotion;
