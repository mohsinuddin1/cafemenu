import { Variants } from "framer-motion";

// Fade up animation for cards
export const fadeUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Stagger children animation
export const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// Scale in animation for badges/pills
export const scaleInVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Slide up from bottom (for bottom sheets)
export const slideUpVariants: Variants = {
    hidden: {
        y: "100%",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        y: "100%",
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Background crossfade
export const crossfadeVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1.2,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.8,
            ease: "easeIn",
        },
    },
};

// Hero text animation
export const heroTextVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Category pill hover animation
export const pillHoverVariants = {
    rest: {
        scale: 1,
        boxShadow: "0 0 0 rgba(212, 165, 116, 0)",
    },
    hover: {
        scale: 1.05,
        boxShadow: "0 0 20px rgba(212, 165, 116, 0.3)",
    },
    tap: {
        scale: 0.98,
    },
};

// Section title animation
export const sectionTitleVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -20,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Scroll progress bar
export const progressBarVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: (progress: number) => ({
        scaleX: progress,
        transition: {
            duration: 0.1,
            ease: "linear",
        },
    }),
};
