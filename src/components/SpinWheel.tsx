"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Prize {
    id: number;
    text: string;
    shortText: string;
    color: string;
    icon: string;
}

const prizes: Prize[] = [
    { id: 1, text: "5% OFF", shortText: "5%", color: "#f59e0b", icon: "🎉" },
    { id: 2, text: "Free Drink", shortText: "🍹", color: "#3b82f6", icon: "🍹" },
    { id: 3, text: "8% OFF", shortText: "8%", color: "#22c55e", icon: "💰" },
    { id: 4, text: "Free Sweet", shortText: "🍰", color: "#ec4899", icon: "🍰" },
    { id: 5, text: "Free Naan", shortText: "🫓", color: "#a855f7", icon: "🫓" },
    { id: 6, text: "Try Again", shortText: "🔄", color: "#64748b", icon: "🔄" },
];

export default function SpinWheel() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [wonPrize, setWonPrize] = useState<Prize | null>(null);
    const [hasSpun, setHasSpun] = useState(false);

    const spinWheel = () => {
        if (isSpinning || hasSpun) return;

        setIsSpinning(true);
        setWonPrize(null);

        // Random number of full rotations (5-8) plus random segment
        const fullRotations = 5 + Math.floor(Math.random() * 4);
        const segmentAngle = 360 / prizes.length;

        // Weighted random - make discounts more likely than "Try Again"
        const weights = [20, 20, 15, 20, 20, 5]; // percentages
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;
        let prizeIndex = 0;

        for (let i = 0; i < weights.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                prizeIndex = i;
                break;
            }
        }

        // Calculate final rotation to land on the prize
        // Pointer is at top (0 degrees), prizes start from right and go clockwise
        const prizeRotation = prizeIndex * segmentAngle + segmentAngle / 2;
        const finalRotation = fullRotations * 360 + (360 - prizeRotation + 90);

        setRotation(prev => prev + finalRotation);

        // Show result after spin completes
        setTimeout(() => {
            setIsSpinning(false);
            setWonPrize(prizes[prizeIndex]);
            if (prizes[prizeIndex].text !== "Try Again") {
                setHasSpun(true);
            }
        }, 4000);
    };

    const closeModal = () => {
        setIsOpen(false);
        setWonPrize(null);
    };

    // Generate conic gradient for wheel
    const conicGradient = prizes
        .map((prize, i) => {
            const start = (i / prizes.length) * 100;
            const end = ((i + 1) / prizes.length) * 100;
            return `${prize.color} ${start}% ${end}%`;
        })
        .join(", ");

    return (
        <>
            {/* Floating Spin Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-4 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/30 flex items-center justify-center border-2 border-amber-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    repeatDelay: 3
                }}
            >
                <span className="text-3xl">🎡</span>
            </motion.button>

            {/* Spin Wheel Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            className="fixed inset-4 z-50 flex items-center justify-center"
                        >
                            <div className="bg-dark-800 rounded-3xl p-6 border border-white/10 shadow-2xl w-full max-w-sm">
                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors z-10"
                                >
                                    ✕
                                </button>

                                {/* Header */}
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        🎰 Spin & Win!
                                    </h2>
                                    <p className="text-white/60 text-sm">
                                        {hasSpun
                                            ? "You've already claimed your reward!"
                                            : "Spin the wheel for exclusive offers!"}
                                    </p>
                                </div>

                                {/* Wheel Container */}
                                <div className="relative w-64 h-64 mx-auto mb-6">
                                    {/* Pointer */}
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                                        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-white drop-shadow-lg" />
                                    </div>

                                    {/* Outer Ring */}
                                    <div className="absolute inset-0 rounded-full border-8 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.4)]" />

                                    {/* Wheel */}
                                    <motion.div
                                        className="w-full h-full rounded-full overflow-hidden"
                                        style={{
                                            background: `conic-gradient(from 0deg, ${conicGradient})`,
                                        }}
                                        animate={{ rotate: rotation }}
                                        transition={{
                                            duration: 4,
                                            ease: [0.2, 0.8, 0.2, 1]
                                        }}
                                    >
                                        {/* Prize Labels */}
                                        {prizes.map((prize, index) => {
                                            const angle = (index * 360) / prizes.length + 360 / prizes.length / 2;
                                            return (
                                                <div
                                                    key={prize.id}
                                                    className="absolute w-full h-full flex items-start justify-center pt-6"
                                                    style={{
                                                        transform: `rotate(${angle}deg)`,
                                                    }}
                                                >
                                                    <span className="text-2xl drop-shadow-lg">
                                                        {prize.shortText}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </motion.div>

                                    {/* Center Circle */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-dark-900 border-4 border-amber-500 flex items-center justify-center shadow-xl z-10">
                                        <span className="text-3xl">🍽️</span>
                                    </div>
                                </div>

                                {/* Prize Display */}
                                <AnimatePresence>
                                    {wonPrize && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-center mb-4 p-4 rounded-xl border-2"
                                            style={{
                                                backgroundColor: `${wonPrize.color}20`,
                                                borderColor: wonPrize.color
                                            }}
                                        >
                                            <motion.span
                                                className="text-5xl mb-2 block"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {wonPrize.icon}
                                            </motion.span>
                                            <p className="text-xl font-bold text-white">
                                                {wonPrize.text === "Try Again"
                                                    ? "Better luck next time!"
                                                    : `You won: ${wonPrize.text}!`}
                                            </p>
                                            {wonPrize.text !== "Try Again" && (
                                                <p className="text-white/60 text-sm mt-2">
                                                    📱 Show this to your waiter to claim!
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Spin Button */}
                                <motion.button
                                    onClick={spinWheel}
                                    disabled={isSpinning || hasSpun}
                                    whileHover={!isSpinning && !hasSpun ? { scale: 1.02 } : {}}
                                    whileTap={!isSpinning && !hasSpun ? { scale: 0.98 } : {}}
                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isSpinning || hasSpun
                                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-amber-500 to-orange-600 text-dark-900 shadow-lg shadow-orange-500/30"
                                        }`}
                                >
                                    {isSpinning ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            >
                                                🎰
                                            </motion.span>
                                            Spinning...
                                        </span>
                                    ) : hasSpun ? (
                                        "✅ Already Claimed"
                                    ) : (
                                        "🎡 SPIN NOW!"
                                    )}
                                </motion.button>

                                {/* Prize Legend */}
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                    {prizes.slice(0, 5).map((prize) => (
                                        <div
                                            key={prize.id}
                                            className="text-center p-2 rounded-lg text-xs"
                                            style={{ backgroundColor: `${prize.color}20` }}
                                        >
                                            <span className="text-lg">{prize.icon}</span>
                                            <p className="text-white/70 mt-1">{prize.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
