"use client";

import { motion } from "framer-motion";
import { Category, MenuItem } from "@/data/menu";
import MenuCard from "./MenuCard";
import ReelsScroll from "./ReelsScroll";
import { sectionTitleVariants, staggerContainerVariants } from "@/lib/animations";

interface MenuSectionProps {
    category: Category;
    items: MenuItem[];
}

export default function MenuSection({ category, items }: MenuSectionProps) {
    if (items.length === 0) return null;

    return (
        <section
            id={category.id}
            className="py-6 sm:py-8 scroll-mt-24"
        >
            {/* Mobile: Reels-style scroll */}
            <ReelsScroll
                items={items}
                categoryName={category.name}
                categoryColor={category.accentColor}
            />

            {/* Desktop: Grid layout */}
            <div className="hidden sm:block">
                {/* Section Header */}
                <motion.div
                    variants={sectionTitleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex items-center gap-4 mb-6 px-1"
                >
                    {/* Icon */}
                    <span className="text-3xl">{category.icon}</span>

                    {/* Title */}
                    <h2
                        className="font-display text-2xl md:text-3xl font-bold"
                        style={{ color: category.accentColor }}
                    >
                        {category.name}
                    </h2>

                    {/* Decorative line */}
                    <div
                        className="flex-1 h-px opacity-30"
                        style={{
                            background: `linear-gradient(to right, ${category.accentColor}, transparent)`
                        }}
                    />

                    {/* Item count */}
                    <span className="text-sm text-white/40">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                    </span>
                </motion.div>

                {/* Menu Items Grid */}
                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                    {items.map((item, index) => (
                        <MenuCard key={item.id} item={item} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

