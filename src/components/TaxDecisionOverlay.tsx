import { motion } from "framer-motion";
import shopBackground from "@/assets/shop-background.png";
import taxDecisionMain from "@/assets/tax-decision-main.png";

interface TaxDecisionOverlayProps {
  onAccept: () => void;
  onDecline: () => void;
}

const TaxDecisionOverlay = ({ onAccept, onDecline }: TaxDecisionOverlayProps) => {
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
        <img src={taxDecisionMain} alt="Tax Decision" className="w-full drop-shadow-2xl" />
        {/* Green checkmark button (accept / file tax) */}
        <button
          onClick={onAccept}
          className="absolute cursor-pointer hover:brightness-110 transition-all"
          style={{ bottom: "5%", left: "8%", width: "38%", height: "22%" }}
        />
        {/* Red X button (decline / skip tax) */}
        <button
          onClick={onDecline}
          className="absolute cursor-pointer hover:brightness-110 transition-all"
          style={{ bottom: "5%", right: "8%", width: "38%", height: "22%" }}
        />
      </motion.div>
    </div>
  );
};

export default TaxDecisionOverlay;
