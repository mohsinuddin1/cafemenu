"use client";

import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";
import { heroTextVariants } from "@/lib/animations";
import { restaurantInfo } from "@/data/menu";

export default function Hero() {
    const { offset, elementRef } = useParallax({ speed: 0.4 });

    return (
        <section
            ref={elementRef}
            className="relative h-screen w-full overflow-hidden"
        >
            {/* Background Image with Parallax */}
            <div
                className="absolute inset-0 w-full h-[120%]"
                style={{
                    transform: `translateY(-${offset}px)`,
                    willChange: "transform",
                }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${restaurantInfo.heroImage})`,
                    }}
                />
                {/* Premium dark gradient overlay */}
                <div className="absolute inset-0 gradient-overlay-strong" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={heroTextVariants}
                    className="max-w-lg"
                >
                    {/* Restaurant Logo/Name */}
                    <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white">
                        {restaurantInfo.name}
                    </h1>

                    {/* Tagline */}
                    <p className="text-lg md:text-xl text-white/80 font-light tracking-wide">
                        {restaurantInfo.tagline}
                    </p>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="h-0.5 bg-gradient-to-r from-accent-gold to-transparent mt-6"
                    />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-white/50 uppercase tracking-widest">
                        Scroll to explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
                    >
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
