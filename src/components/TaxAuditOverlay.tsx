import { motion } from "framer-motion";
import shopBackground from "@/assets/shop-background.png";
import taxAudit from "@/assets/tax-audit.png";

interface TaxAuditOverlayProps {}

const TaxAuditOverlay = ({}: TaxAuditOverlayProps) => {
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
        <img src={taxAudit} alt="Tax Audit" className="w-full drop-shadow-2xl" />
      </motion.div>
    </div>
  );
};

export default TaxAuditOverlay;
