"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { MenuItem } from "@/data/menu";

interface ReelCardProps {
    item: MenuItem;
    index: number;
}

function ReelCard({ item, index }: ReelCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isInCenter, setIsInCenter] = useState(false);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Transform based on scroll position
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.85, 0.95, 1, 0.95, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.5, 0.8, 1, 0.8, 0.5]);
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Card is in center when progress is between 0.4 and 0.6
        setIsInCenter(latest > 0.35 && latest < 0.65);
    });

    return (
        <motion.div
            ref={cardRef}
            style={{ scale, opacity, y }}
            className="snap-center px-4"
        >
            <article
                className={`relative bg-dark-700 rounded-3xl overflow-hidden border transition-all duration-300 shadow-2xl ${isInCenter
                    ? "border-accent-gold/30 shadow-glow-gold"
                    : "border-white/5"
                    }`}
            >
                {/* Image Container - Taller for Reels feel */}
                <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 90vw, 50vw"
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBQYSEyExQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AJdpqM9veLJaSS28yeG4yUIyARgg5BwSPVa9S/qC3cM9/HNp8M94Z5Fk6t0zMZSQeLFWJJweMcegAeaUqKlLb0zM//Z"
                        priority={index < 3}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {item.isBestSeller && (
                            <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-amber-500 text-dark-900 shadow-lg">
                                ⭐ Bestseller
                            </span>
                        )}
                        {item.isChefsPick && (
                            <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-purple-500 text-white shadow-lg">
                                👨‍🍳 Chef&apos;s Pick
                            </span>
                        )}
                        {item.isSpicy && (
                            <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-red-500 text-white shadow-lg">
                                🌶️ Spicy
                            </span>
                        )}
                    </div>

                    {/* Veg/Non-Veg Indicator */}
                    <div className="absolute top-4 right-4">
                        <div
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center bg-dark-900/50 backdrop-blur-sm ${item.isVeg ? "border-green-500" : "border-red-500"
                                }`}
                        >
                            <div
                                className={`w-3 h-3 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Content overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                        {/* Name */}
                        <h3 className="font-display text-2xl font-bold text-white leading-tight drop-shadow-lg">
                            {item.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-white/80 line-clamp-2 leading-relaxed">
                            {item.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-center justify-between pt-2">
                            <span className="text-2xl font-bold text-accent-gold drop-shadow-lg">
                                ₹{item.price.toLocaleString("en-IN")}
                            </span>

                            {/* Optional: Add to order button */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2.5 bg-accent-gold text-dark-900 font-semibold rounded-full text-sm shadow-lg"
                            >
                                Add +
                            </motion.button>
                        </div>
                    </div>
                </div>
            </article>
        </motion.div>
    );
}

interface ReelsScrollProps {
    items: MenuItem[];
    categoryName: string;
    categoryColor: string;
}

export default function ReelsScroll({ items, categoryName, categoryColor }: ReelsScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    if (items.length === 0) return null;

    return (
        <div className="sm:hidden">
            {/* Category Header */}
            <div className="flex items-center gap-3 px-4 mb-4">
                <h2
                    className="font-display text-xl font-bold"
                    style={{ color: categoryColor }}
                >
                    {categoryName}
                </h2>
                <div
                    className="flex-1 h-px opacity-30"
                    style={{ background: `linear-gradient(to right, ${categoryColor}, transparent)` }}
                />
                <span className="text-xs text-white/40">{items.length} items</span>
            </div>

            {/* Reels Container */}
            <div
                ref={containerRef}
                className="space-y-6 pb-4"
            >
                {items.map((item, index) => (
                    <ReelCard key={item.id} item={item} index={index} />
                ))}
            </div>
        </div>
    );
}
