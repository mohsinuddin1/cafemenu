"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseScrollSpyOptions {
    offset?: number;
    rootMargin?: string;
}

export function useScrollSpy(
    sectionIds: string[],
    options: UseScrollSpyOptions = {}
) {
    const { offset = 150, rootMargin = "-20% 0px -70% 0px" } = options;
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Disconnect previous observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Create new observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin,
                threshold: 0.1,
            }
        );

        // Observe all sections
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element && observerRef.current) {
                observerRef.current.observe(element);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [sectionIds, rootMargin]);

    const scrollToSection = useCallback(
        (sectionId: string) => {
            const element = document.getElementById(sectionId);
            if (element) {
                const top = element.offsetTop - offset;
                window.scrollTo({
                    top,
                    behavior: "smooth",
                });
            }
        },
        [offset]
    );

    return { activeSection, scrollToSection };
}

// Scroll progress hook
export function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;
            const calculatedProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            setProgress(Math.min(calculatedProgress, 1));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return progress;
}
