import { motion } from "framer-motion";

interface IsometricCubeProps {
  color: "blue" | "red";
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  animate?: any;
  initial?: any;
  transition?: any;
}

const colorMap = {
  blue: { top: "#8EC5FC", left: "#5A9BD5", right: "#4A85C2" },
  red: { top: "#FF8A8A", left: "#E86B6B", right: "#C85555" },
};

const IsometricCube = ({ color, size = 40, style, className, animate, initial, transition }: IsometricCubeProps) => {
  const colors = colorMap[color];
  const w = size;
  const h = size;
  // Isometric cube: top face, left face, right face
  // Center of top face at (w/2, h*0.25)
  const cx = w / 2;
  const topY = h * 0.15;
  const midY = h * 0.5;
  const botY = h * 0.85;
  const halfW = w * 0.45;

  // Top face (diamond)
  const topFace = `${cx},${topY} ${cx + halfW},${midY} ${cx},${midY + (midY - topY) * 0.15} ${cx - halfW},${midY}`;
  // Left face
  const leftFace = `${cx - halfW},${midY} ${cx},${midY + (midY - topY) * 0.15} ${cx},${botY} ${cx - halfW},${botY - (midY - topY) * 0.15}`;
  // Right face
  const rightFace = `${cx + halfW},${midY} ${cx},${midY + (midY - topY) * 0.15} ${cx},${botY} ${cx + halfW},${botY - (midY - topY) * 0.15}`;

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size, ...style }}
      animate={animate}
      initial={initial}
      transition={transition}
    >
      <svg width={size} height={size} viewBox={`0 0 ${w} ${h}`}>
        {/* Left face */}
        <polygon points={leftFace} fill={colors.left} stroke="#00000022" strokeWidth="0.5" />
        {/* Right face */}
        <polygon points={rightFace} fill={colors.right} stroke="#00000022" strokeWidth="0.5" />
        {/* Top face */}
        <polygon points={topFace} fill={colors.top} stroke="#00000022" strokeWidth="0.5" />
      </svg>
    </motion.div>
  );
};

export default IsometricCube;
