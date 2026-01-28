"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollSpy";

export default function ScrollProgress() {
    const progress = useScrollProgress();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
            style={{
                scaleX: progress,
                background: "linear-gradient(to right, #d4a574, #f59e0b)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.1, ease: "linear" }}
        />
    );
}
