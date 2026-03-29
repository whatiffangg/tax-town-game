import { motion } from "framer-motion";

interface FloatingCoinProps {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  onComplete: (id: string) => void;
}

const FloatingCoin = ({ id, startX, startY, endX, endY, onComplete }: FloatingCoinProps) => {
  return (
    <motion.div
      className="fixed z-50 pointer-events-none text-2xl"
      initial={{ x: startX, y: startY, opacity: 1, scale: 1 }}
      animate={{
        x: endX,
        y: endY,
        opacity: [1, 1, 0.8, 0],
        scale: [1, 1.4, 1, 0.6],
      }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      onAnimationComplete={() => onComplete(id)}
    >
      🪙
    </motion.div>
  );
};

export default FloatingCoin;
