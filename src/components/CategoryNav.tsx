"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, Category } from "@/data/menu";
import { slideUpVariants } from "@/lib/animations";

interface CategoryNavProps {
    activeCategory: string;
    onCategoryChange: (categoryId: string) => void;
}

export default function CategoryNav({
    activeCategory,
    onCategoryChange,
}: CategoryNavProps) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll active category into view
    useEffect(() => {
        if (scrollContainerRef.current) {
            const activeButton = scrollContainerRef.current.querySelector(
                `[data-category="${activeCategory}"]`
            );
            if (activeButton) {
                activeButton.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        }
    }, [activeCategory]);

    const handleCategoryClick = (categoryId: string) => {
        onCategoryChange(categoryId);
        setIsSheetOpen(false);
    };

    return (
        <>
            {/* Sticky Navigation Bar */}
            <nav className="sticky top-0 z-50 glass border-b border-white/5">
                <div className="px-4 py-3">
                    {/* Mobile: Dropdown trigger + Active category */}
                    <div className="flex items-center gap-3 sm:hidden">
                        <button
                            onClick={() => setIsSheetOpen(true)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-dark-600 border border-white/10 transition-all active:scale-95"
                        >
                            <svg
                                className="w-4 h-4 text-white/70"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <span className="text-sm font-medium">Categories</span>
                        </button>

                        {/* Active category display */}
                        <div
                            className="flex items-center gap-2 px-4 py-2.5 rounded-full"
                            style={{
                                backgroundColor: `${categories.find(c => c.id === activeCategory)?.accentColor}20`,
                                borderColor: categories.find(c => c.id === activeCategory)?.accentColor,
                            }}
                        >
                            <span className="text-lg">
                                {categories.find((c) => c.id === activeCategory)?.icon}
                            </span>
                            <span
                                className="text-sm font-medium"
                                style={{
                                    color: categories.find(c => c.id === activeCategory)?.accentColor,
                                }}
                            >
                                {categories.find((c) => c.id === activeCategory)?.name}
                            </span>
                        </div>
                    </div>

                    {/* Desktop: Horizontal pills */}
                    <div
                        ref={scrollContainerRef}
                        className="hidden sm:flex items-center gap-2 overflow-x-auto hide-scrollbar px-1 py-1"
                    >
                        {categories.map((category) => (
                            <CategoryPill
                                key={category.id}
                                category={category}
                                isActive={activeCategory === category.id}
                                onClick={() => handleCategoryClick(category.id)}
                            />
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile: Bottom Sheet */}
            <AnimatePresence>
                {isSheetOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSheetOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Sheet */}
                        <motion.div
                            variants={slideUpVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed bottom-0 left-0 right-0 z-50 bg-dark-800 rounded-t-3xl border-t border-white/10 overflow-hidden"
                        >
                            {/* Handle */}
                            <div className="flex justify-center py-3">
                                <div className="w-10 h-1 rounded-full bg-white/20" />
                            </div>

                            {/* Title */}
                            <div className="px-6 pb-4">
                                <h2 className="text-lg font-semibold">Browse Categories</h2>
                            </div>

                            {/* Category Grid */}
                            <div className="grid grid-cols-2 gap-3 px-4 pb-8">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.id)}
                                        className={`flex items-center gap-3 p-4 rounded-2xl transition-all active:scale-95 ${activeCategory === category.id
                                            ? "ring-2"
                                            : "bg-dark-600 hover:bg-dark-700"
                                            }`}
                                        style={{
                                            backgroundColor:
                                                activeCategory === category.id
                                                    ? `${category.accentColor}20`
                                                    : undefined,
                                            ringColor:
                                                activeCategory === category.id
                                                    ? category.accentColor
                                                    : undefined,
                                        }}
                                    >
                                        <span className="text-2xl">{category.icon}</span>
                                        <span
                                            className="text-sm font-medium"
                                            style={{
                                                color:
                                                    activeCategory === category.id
                                                        ? category.accentColor
                                                        : "white",
                                            }}
                                        >
                                            {category.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

// Category Pill Component
function CategoryPill({
    category,
    isActive,
    onClick,
}: {
    category: Category;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <motion.button
            data-category={category.id}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 ${isActive
                ? "shadow-lg"
                : "bg-dark-600 hover:bg-dark-700 border border-white/5"
                }`}
            style={{
                backgroundColor: isActive ? `${category.accentColor}25` : undefined,
                boxShadow: isActive
                    ? `0 0 20px ${category.accentColor}30`
                    : undefined,
                border: isActive ? `1px solid ${category.accentColor}50` : undefined,
            }}
        >
            <span className="text-lg">{category.icon}</span>
            <span
                className={`text-sm font-medium transition-colors ${isActive ? "" : "text-white/80"
                    }`}
                style={{
                    color: isActive ? category.accentColor : undefined,
                }}
            >
                {category.name}
            </span>
        </motion.button>
    );
}
