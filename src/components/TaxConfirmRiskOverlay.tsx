import { motion } from "framer-motion";
import shopBackground from "@/assets/shop-background.png";
import taxConfirmRisk from "@/assets/tax-confirm-risk.png";

interface TaxConfirmRiskOverlayProps {
  onConfirmSkip: () => void;
  onCancel: () => void;
}

const TaxConfirmRiskOverlay = ({ onConfirmSkip, onCancel }: TaxConfirmRiskOverlayProps) => {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${shopBackground})`, opacity: 0.3 }} />
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        className="relative z-10 max-w-[300px] w-[60%]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={taxConfirmRisk} alt="Confirm Risk" className="w-full drop-shadow-2xl" />
        {/* Green checkmark = confirm NOT filing (risky) */}
        <button
          onClick={onConfirmSkip}
          className="absolute cursor-pointer hover:brightness-110 transition-all"
          style={{ bottom: "5%", left: "8%", width: "38%", height: "20%" }}
        />
        {/* Red X = cancel, go back to file tax normally */}
        <button
          onClick={onCancel}
          className="absolute cursor-pointer hover:brightness-110 transition-all"
          style={{ bottom: "5%", right: "8%", width: "38%", height: "20%" }}
        />
      </motion.div>
    </div>
  );
};

export default TaxConfirmRiskOverlay;
