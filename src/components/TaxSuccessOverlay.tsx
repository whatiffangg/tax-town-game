import { motion } from "framer-motion";
import shopBackground from "@/assets/shop-background.png";
import taxSuccess from "@/assets/tax-success.png";

interface TaxSuccessOverlayProps {
  visible: boolean;
}

const TaxSuccessOverlay = ({ visible }: TaxSuccessOverlayProps) => {
  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${shopBackground})`, opacity: 0.3 }} />
      <div className="absolute inset-0 bg-black/30" />
      <motion.img
        src={taxSuccess}
        alt="Tax Success"
        className="relative z-10 max-w-[280px] w-[60%] drop-shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default TaxSuccessOverlay;
