"use client";

import Footer from "@/components/portal/footer/Footer";
import { motion } from "framer-motion";
import React from "react";

const FooterMotion: React.FC = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <Footer />
    </motion.div>
  );
};

export default FooterMotion;
