import { motion } from "framer-motion";
import shopBackground from "@/assets/shop-background.png";
import taxAuditPass from "@/assets/tax-audit-pass.png";

interface TaxAuditPassOverlayProps {
  onDismiss: () => void;
}

const TaxAuditPassOverlay = ({ onDismiss }: TaxAuditPassOverlayProps) => {
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
        <img src={taxAuditPass} alt="Audit Passed" className="w-full drop-shadow-2xl" />
        <button
          onClick={onDismiss}
          className="mt-3 px-6 py-1.5 rounded-lg font-bold text-white shadow-lg hover:brightness-110 transition-all text-sm"
          style={{ background: "linear-gradient(180deg, #4ade80 0%, #16a34a 100%)", border: "2px solid #15803d" }}
        >
          ดีใจด้วย!
        </button>
      </motion.div>
    </div>
  );
};

export default TaxAuditPassOverlay;
