import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import shopBackground from "@/assets/shop-background.png";
import rewardDiamond from "@/assets/reward-diamond-new.png";
import rewardSpeed from "@/assets/reward-speed-new.png";
import rewardChest from "@/assets/reward-chest-new.png";

type RewardType = "diamond" | "speed" | "chest";

interface TaxCongratsOverlayProps {
  onClose: (reward: RewardType) => void;
}

interface Particle {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

const REWARDS: { type: RewardType; image: string }[] = [
  { type: "diamond", image: rewardDiamond },
  { type: "speed", image: rewardSpeed },
  { type: "chest", image: rewardChest },
];

const TaxCongratsOverlay = ({ onClose }: TaxCongratsOverlayProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [flyParticles, setFlyParticles] = useState<{ id: number; startX: number; startY: number; endX: number; endY: number; emoji: string }[]>([]);
  const [showReward, setShowReward] = useState(true);

  const reward = useMemo(() => REWARDS[Math.floor(Math.random() * REWARDS.length)], []);

  useEffect(() => {
    const emojis = reward.type === "diamond"
      ? ["💎", "✨", "💎", "✨"]
      : reward.type === "chest"
        ? ["🪙", "💰", "🪙", "💰"]
        : ["⚡", "🔥", "⚡", "🔥"];

    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      size: 16 + Math.random() * 16,
    }));
    setParticles(newParticles);
  }, [reward]);

  const handleCollect = () => {
    if (reward.type === "diamond" || reward.type === "chest") {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const targetX = reward.type === "diamond" ? 80 : 80;
      const targetY = reward.type === "diamond" ? 72 : 32;
      const emoji = reward.type === "diamond" ? "💎" : "🪙";

      const flies = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        startX: centerX + (Math.random() - 0.5) * 100,
        startY: centerY + (Math.random() - 0.5) * 60,
        endX: targetX,
        endY: targetY,
        emoji,
      }));
      setFlyParticles(flies);
      setShowReward(false);
      setTimeout(() => onClose(reward.type), 1000);
    } else {
      // Speed reward - show "Boost!" text then close
      setShowReward(false);
      setTimeout(() => onClose(reward.type), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${shopBackground})`, opacity: 0.4 }} />
      <div className="absolute inset-0 bg-black/40" />

      {/* Falling particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute z-20 pointer-events-none"
          style={{ left: `${p.x}%`, fontSize: p.size, top: -40 }}
          initial={{ y: -40, opacity: 1, rotate: 0 }}
          animate={{ y: "100vh", opacity: [1, 1, 0.5], rotate: 360 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* Fly particles to UI counter */}
      {flyParticles.map((fp) => (
        <motion.div
          key={`fly-${fp.id}`}
          className="fixed z-[100] pointer-events-none text-2xl"
          initial={{ x: fp.startX, y: fp.startY, opacity: 1, scale: 1 }}
          animate={{ x: fp.endX, y: fp.endY, opacity: [1, 1, 0.8, 0], scale: [1, 1.3, 1, 0.5] }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: fp.id * 0.06 }}
        >
          {fp.emoji}
        </motion.div>
      ))}

      {/* Speed boost text */}
      {!showReward && reward.type === "speed" && (
        <motion.div
          className="relative z-30 text-4xl font-extrabold"
          style={{ color: "#fbbf24", textShadow: "0 0 20px rgba(251,191,36,0.8), 0 2px 8px rgba(0,0,0,0.7)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1.2], opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          ⚡ Boost! ⚡
        </motion.div>
      )}

      {showReward && (
        <motion.div
          className="relative z-10 max-w-[280px] w-[65%] flex flex-col items-center"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img src={reward.image} alt="Reward" className="w-full drop-shadow-2xl" />
          <button
            onClick={handleCollect}
            className="mt-4 px-6 py-1.5 rounded-lg font-bold text-white shadow-lg hover:brightness-110 transition-all text-sm"
            style={{ background: "linear-gradient(180deg, #4ade80 0%, #16a34a 100%)", border: "2px solid #15803d" }}
          >
            รับรางวัล
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TaxCongratsOverlay;
