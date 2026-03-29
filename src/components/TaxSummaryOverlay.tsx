import { motion } from "framer-motion";
import shopBackground from "@/assets/shop-background.png";
import taxSummary from "@/assets/tax-summary.png";

interface TaxSummaryOverlayProps {
  gold: number;
  totalRevenue: number;
  totalCost: number;
  onClose: () => void;
}

const TaxSummaryOverlay = ({ gold, totalRevenue, totalCost, onClose }: TaxSummaryOverlayProps) => {
  const netProfit = totalRevenue - totalCost;
  const taxAmount = (netProfit > 0 ? netProfit * 0.05 : 0).toFixed(2);

  const finalFields = [
    { top: 19.31, value: totalRevenue.toLocaleString() },         // Field 1: Total Revenue
    { top: 24.91, value: totalCost.toLocaleString() },            // Field 2: Total Cost (auto-filled)
    { top: 30.51, value: "0" },                                    // Field 3: Other expenses
    { top: 36.11, value: netProfit.toLocaleString() },            // Field 4: Net Profit (Revenue - Cost)
    { top: 42.01, value: taxAmount },                              // Field 5: Tax amount
    { top: 47.61, value: "-" },                                    // Field 6: Deductions
    { top: 53.51, value: taxAmount },                              // Field 7: Final tax
  ];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-auto">
      <div className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${shopBackground})`, opacity: 0.4 }} />
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        className="relative z-10 max-w-[380px] w-[65%] my-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <img src={taxSummary} alt="Tax Summary" className="w-full drop-shadow-2xl" />
        {finalFields.map((f, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-end pr-[15%] font-bold"
            style={{
              top: `${f.top}%`,
              right: "5%",
              width: "35%",
              height: "4.5%",
              color: "#5a3e1b",
              fontFamily: "'Sarabun', 'Segoe UI', sans-serif",
              fontSize: "clamp(9px, 1.6vw, 14px)",
            }}
          >
            {f.value}
          </div>
        ))}
        <button
          onClick={onClose}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-lg font-bold text-white shadow-lg hover:brightness-110 transition-all text-sm"
          style={{ background: "linear-gradient(180deg, #4ade80 0%, #16a34a 100%)", border: "2px solid #15803d" }}
        >
          ปิด
        </button>
      </motion.div>
    </div>
  );
};

export default TaxSummaryOverlay;
