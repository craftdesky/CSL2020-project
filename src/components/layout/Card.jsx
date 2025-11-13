import React from "react";
import { motion } from "framer-motion";

export default function Card({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-gray-800 p-6 rounded-xl shadow space-y-4"
    >
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      {children}
    </motion.div>
  );
}