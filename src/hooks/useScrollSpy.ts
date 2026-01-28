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
    const { offset = 150, rootMargin = "-10% 0px -80% 0px" } = options;
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "");
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isScrollingRef = useRef(false);

    useEffect(() => {
        // Disconnect previous observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Create new observer with improved settings
        observerRef.current = new IntersectionObserver(
            (entries) => {
                // Don't update during programmatic scroll
                if (isScrollingRef.current) return;

                // Find the most visible/topmost intersecting entry
                const visibleEntries = entries.filter(entry => entry.isIntersecting);

                if (visibleEntries.length > 0) {
                    // Sort by position (top of viewport = higher priority)
                    visibleEntries.sort((a, b) => {
                        const rectA = a.boundingClientRect;
                        const rectB = b.boundingClientRect;
                        return rectA.top - rectB.top;
                    });

                    // Pick the topmost visible section
                    const topEntry = visibleEntries[0];
                    setActiveSection(topEntry.target.id);
                }
            },
            {
                rootMargin,
                threshold: [0, 0.1, 0.25, 0.5],
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
                // Immediately update active section on click
                setActiveSection(sectionId);
                isScrollingRef.current = true;

                // Use getBoundingClientRect for accurate positioning
                const rect = element.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetTop = scrollTop + rect.top - offset;

                window.scrollTo({
                    top: Math.max(0, targetTop),
                    behavior: "smooth",
                });

                // Re-enable observer after scroll completes
                setTimeout(() => {
                    isScrollingRef.current = false;
                }, 1000);
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
