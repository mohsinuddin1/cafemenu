"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Category } from "@/data/menu";
import { crossfadeVariants } from "@/lib/animations";

interface DynamicBackgroundProps {
    activeCategory: Category | undefined;
}

export default function DynamicBackground({ activeCategory }: DynamicBackgroundProps) {
    if (!activeCategory) return null;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory.id}
                    variants={crossfadeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-15"
                        style={{
                            backgroundImage: `url(${activeCategory.backgroundImage})`,
                        }}
                    />

                    {/* Category-specific gradient overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(ellipse at 50% 0%, ${activeCategory.accentColor}15 0%, transparent 60%)`,
                        }}
                    />

                    {/* Bottom fade to content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
