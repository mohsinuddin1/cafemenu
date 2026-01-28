"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MenuItem } from "@/data/menu";
import { fadeUpVariants } from "@/lib/animations";

interface MenuCardProps {
    item: MenuItem;
    index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
    return (
        <motion.article
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05 }}
            className="menu-card group relative bg-dark-700 rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 shadow-card hover:shadow-card-hover"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBQYSEyExQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AJdpqM9veLJaSS28yeG4yUIyARgg5BwSPVa9S/qC3cM9/HNp8M94Z5Fk6t0zMZSQeLFWJJweMce9gAeaUqKlLb0zM//Z"
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {item.isBestSeller && (
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500 text-dark-900">
                            ⭐ Bestseller
                        </span>
                    )}
                    {item.isChefsPick && (
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-500 text-white">
                            👨‍🍳 Chef&apos;s Pick
                        </span>
                    )}
                    {item.isSpicy && (
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-500 text-white">
                            🌶️ Spicy
                        </span>
                    )}
                </div>

                {/* Veg/Non-Veg Indicator */}
                <div className="absolute top-3 right-3">
                    <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${item.isVeg
                            ? "border-green-500"
                            : "border-red-500"
                            }`}
                    >
                        <div
                            className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"
                                }`}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                {/* Name */}
                <h3 className="font-display text-lg font-semibold text-white leading-tight">
                    {item.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">
                    {item.description}
                </p>

                {/* Price */}
                <div className="pt-2 flex items-center justify-between">
                    <span className="text-xl font-bold text-accent-gold">
                        ₹{item.price.toLocaleString("en-IN")}
                    </span>
                </div>
            </div>
        </motion.article>
    );
}
