"use client";

import { useState, useEffect, useRef } from "react";

interface UseParallaxOptions {
    speed?: number;
    disabled?: boolean;
}

export function useParallax(options: UseParallaxOptions = {}) {
    const { speed = 0.3, disabled = false } = options;
    const [offset, setOffset] = useState(0);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (disabled) return;

        const handleScroll = () => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                const scrollY = window.scrollY;

                // Only apply parallax when element is in viewport
                if (rect.bottom > 0 && rect.top < window.innerHeight) {
                    setOffset(scrollY * speed);
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed, disabled]);

    return { offset, elementRef };
}
