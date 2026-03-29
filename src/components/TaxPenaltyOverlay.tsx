import { motion } from "framer-motion";
import shopBackground from "@/assets/shop-background.png";
import taxPenalty from "@/assets/tax-penalty.png";

interface TaxPenaltyOverlayProps {
  penaltyAmount: number;
  onPay: () => void;
}

const TaxPenaltyOverlay = ({ penaltyAmount, onPay }: TaxPenaltyOverlayProps) => {
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
        <img src={taxPenalty} alt="Tax Penalty" className="w-full drop-shadow-2xl" />
        {/* Penalty amount displayed in the yellow box area */}
        <div
          className="absolute font-extrabold text-center"
          style={{
            bottom: "22%",
            left: "52%",
            width: "30%",
            height: "8%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#5a3e1b",
            fontSize: "clamp(12px, 2.5vw, 18px)",
          }}
        >
          {penaltyAmount.toLocaleString()}
        </div>
        {/* PAY button area */}
        <button
          onClick={onPay}
          className="absolute cursor-pointer hover:brightness-110 transition-all"
          style={{ bottom: "3%", left: "25%", width: "50%", height: "14%" }}
        />
      </motion.div>
    </div>
  );
};

export default TaxPenaltyOverlay;
