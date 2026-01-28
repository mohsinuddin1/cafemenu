"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/data/menu";

interface SearchFilterProps {
    items: MenuItem[];
    onFilteredItems: (items: MenuItem[]) => void;
}

type FilterType = "all" | "veg" | "nonveg" | "bestseller";

export default function SearchFilter({ items, onFilteredItems }: SearchFilterProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [isExpanded, setIsExpanded] = useState(false);

    const filters: { id: FilterType; label: string; icon: string }[] = [
        { id: "all", label: "All", icon: "🍽️" },
        { id: "veg", label: "Veg", icon: "🥬" },
        { id: "nonveg", label: "Non-Veg", icon: "🍖" },
        { id: "bestseller", label: "Popular", icon: "⭐" },
    ];

    // Filter items based on search and filter
    useMemo(() => {
        let filtered = items;

        // Apply text search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (item) =>
                    item.name.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query)
            );
        }

        // Apply filter
        switch (activeFilter) {
            case "veg":
                filtered = filtered.filter((item) => item.isVeg);
                break;
            case "nonveg":
                filtered = filtered.filter((item) => !item.isVeg);
                break;
            case "bestseller":
                filtered = filtered.filter((item) => item.isBestSeller);
                break;
        }

        onFilteredItems(filtered);
    }, [searchQuery, activeFilter, items, onFilteredItems]);

    return (
        <div className="sticky top-[60px] z-40 px-4 py-3 glass border-b border-white/5">
            <div className="max-w-4xl mx-auto space-y-3">
                {/* Search Bar */}
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search dishes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        className="w-full pl-12 pr-4 py-3 bg-dark-600 rounded-xl border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Filter Pills */}
                <AnimatePresence>
                    {(isExpanded || searchQuery || activeFilter !== "all") && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
                                {filters.map((filter) => (
                                    <motion.button
                                        key={filter.id}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setActiveFilter(filter.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${activeFilter === filter.id
                                                ? "bg-accent-gold text-dark-900 font-medium"
                                                : "bg-dark-600 text-white/70 hover:bg-dark-700 border border-white/10"
                                            }`}
                                    >
                                        <span>{filter.icon}</span>
                                        <span className="text-sm">{filter.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
