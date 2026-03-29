import { motion } from "framer-motion";
import shopBackground from "@/assets/shop-background.png";
import taxJail from "@/assets/tax-jail.png";

interface TaxJailOverlayProps {
  onRestart: () => void;
}

const TaxJailOverlay = ({ onRestart }: TaxJailOverlayProps) => {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${shopBackground})`, opacity: 0.3 }} />
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        className="relative z-10 max-w-[300px] w-[60%] flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={taxJail} alt="Game Over - Jail" className="w-full drop-shadow-2xl" />
        <button
          onClick={onRestart}
          className="mt-4 px-6 py-2 rounded-lg font-bold text-white shadow-lg hover:brightness-110 transition-all text-sm"
          style={{ background: "linear-gradient(180deg, #ef4444 0%, #b91c1c 100%)", border: "2px solid #991b1b" }}
        >
          เริ่มใหม่
        </button>
      </motion.div>
    </div>
  );
};

export default TaxJailOverlay;
