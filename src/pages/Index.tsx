import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingCoin from "@/components/FloatingCoin";
import IsometricCube from "@/components/IsometricCube";
import RegistrationOverlay from "@/components/RegistrationOverlay";
import TaxWarningOverlay from "@/components/TaxWarningOverlay";
import TaxDecisionOverlay from "@/components/TaxDecisionOverlay";
import TaxConfirmRiskOverlay from "@/components/TaxConfirmRiskOverlay";
import TaxQuizOverlay from "@/components/TaxQuizOverlay";
import TaxSummaryOverlay from "@/components/TaxSummaryOverlay";
import TaxSuccessOverlay from "@/components/TaxSuccessOverlay";
import TaxCongratsOverlay from "@/components/TaxCongratsOverlay";
import TaxAuditOverlay from "@/components/TaxAuditOverlay";
import TaxAuditPassOverlay from "@/components/TaxAuditPassOverlay";
import TaxPenaltyOverlay from "@/components/TaxPenaltyOverlay";
import TaxJailOverlay from "@/components/TaxJailOverlay";
import DashedPath from "@/components/DashedPath";
import ShopOverlay, {
  type StockItem,
  type DecoItem,
  type PurchaseRecord,
} from "@/components/ShopOverlay";
import shopBackground from "@/assets/shop-background.png";

// Item images
import colaImg from "@/assets/items/cola.png";
import icecreamImg from "@/assets/items/icecream.png";
import coffeeImg from "@/assets/items/coffee.png";
import fruitsetImg from "@/assets/items/fruitset.png";
import snackImg from "@/assets/items/snack.png";
import toyImg from "@/assets/items/toy.png";
import cookieImg from "@/assets/items/cookie.png";
import sugarImg from "@/assets/items/sugar.png";
import rockingHorseImg from "@/assets/items/rocking-horse.png";
import snowglobeImg from "@/assets/items/snowglobe.png";
import mermaidImg from "@/assets/items/mermaid.png";
import luckycatImg from "@/assets/items/luckycat.png";
import dragonHorseImg from "@/assets/items/dragon-horse.png";
import snowglobe2Img from "@/assets/items/snowglobe2.png";
import hanumanImg from "@/assets/items/hanuman.png";
import kinnariImg from "@/assets/items/kinnari.png";

interface CoinAnim {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const SELLABLE_ITEMS = [
  { id: "cola", name: "น้ำอัดลม", image: colaImg, sellPrice: 8, cost: 5 },
  { id: "icecream", name: "ไอศกรีม", image: icecreamImg, sellPrice: 55, cost: 50 },
  { id: "coffee", name: "กาแฟ", image: coffeeImg, sellPrice: 15, cost: 10 },
  { id: "fruitset", name: "เซตผลไม้", image: fruitsetImg, sellPrice: 40, cost: 30 },
  { id: "snack", name: "ขนมซอง", image: snackImg, sellPrice: 5, cost: 2 },
  { id: "toy", name: "ของเล่น", image: toyImg, sellPrice: 25, cost: 18 },
];

const INITIAL_STOCK: StockItem[] = [
  { id: "cola", name: "น้ำอัดลม", image: colaImg, cost: 5, sellPrice: 8, owned: 5 },
  { id: "icecream", name: "ไอศกรีม", image: icecreamImg, cost: 50, sellPrice: 55, owned: 5 },
  { id: "coffee", name: "กาแฟ", image: coffeeImg, cost: 10, sellPrice: 15, owned: 5 },
  { id: "fruitset", name: "เซตผลไม้", image: fruitsetImg, cost: 30, sellPrice: 40, owned: 5 },
  { id: "snack", name: "ขนมซอง", image: snackImg, cost: 2, sellPrice: 5, owned: 5 },
  { id: "toy", name: "ของเล่น", image: toyImg, cost: 18, sellPrice: 25, owned: 5 },
  { id: "cookie", name: "คุกกี้", image: cookieImg, cost: 6, sellPrice: 18, owned: 0, locked: true },
  { id: "sugar", name: "น้ำตาลปั้นโบราณ", image: sugarImg, cost: 18, sellPrice: 70, owned: 0, locked: true },
];

const INITIAL_DECO: DecoItem[] = [
  { id: "rocking", name: "ม้าโยกโพนี่", image: rockingHorseImg, diamondCost: 15, owned: 0 },
  { id: "snowglobe", name: "ลูกแก้วนางมัทนา", image: snowglobeImg, diamondCost: 10, owned: 0 },
  { id: "mermaid", name: "รูปปั้นนางเงือก", image: mermaidImg, diamondCost: 10, owned: 0 },
  { id: "luckycat", name: "ตุ๊กตาแมวกวัก", image: luckycatImg, diamondCost: 10, owned: 0 },
  { id: "dragon", name: "ม้าโยกม้านิลมังกร", image: dragonHorseImg, diamondCost: 20, owned: 0 },
  { id: "snowglobe2", name: "ลูกแก้วนางอุทัยเทวี", image: snowglobe2Img, diamondCost: 10, owned: 0 },
  { id: "hanuman", name: "ตุ๊กตาระเบื้องหนุมาน", image: hanumanImg, diamondCost: 15, owned: 0 },
  { id: "kinnari", name: "ตุ๊กตาระเบื้องกินรี", image: kinnariImg, diamondCost: 15, owned: 0 },
];

const PATH_POINTS = [
  { left: 13, top: 75 },
  { left: 17, top: 73.1 },
  { left: 21, top: 71.2 },
  { left: 25, top: 69.3 },
  { left: 29, top: 67.4 },
];

type CustomerState = "walking_in" | "waiting" | "selling" | "walking_out" | "gone";
type TaxPhase =
  | "none"
  | "warning"
  | "decision"
  | "confirm_risk"
  | "quiz"
  | "summary"
  | "success"
  | "congrats"
  | "audit"
  | "audit_pass"
  | "penalty"
  | "jail";

const SECONDS_PER_DAY = 86400;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Index = () => {
  const [registered, setRegistered] = useState(false);
  const [shopName, setShopName] = useState("");
  const [gold, setGold] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [gameSeconds, setGameSeconds] = useState(0);
  const [coins, setCoins] = useState<CoinAnim[]>([]);
  const [customerState, setCustomerState] = useState<CustomerState>("gone");
  const [customerKey, setCustomerKey] = useState(0);
  const [taxPhase, setTaxPhase] = useState<TaxPhase>("none");
  const [taxPaused, setTaxPaused] = useState(false);
  const [lastTaxYear, setLastTaxYear] = useState(-1);
  const [showShop, setShowShop] = useState(false);
  const [stockItems, setStockItems] = useState<StockItem[]>(INITIAL_STOCK);
  const [decoItems, setDecoItems] = useState<DecoItem[]>(INITIAL_DECO);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseRecord[]>([]);
  const [totalCostAccumulated, setTotalCostAccumulated] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [currentBubbleItem, setCurrentBubbleItem] = useState<typeof SELLABLE_ITEMS[0] | null>(null);
  const [lowStockWarning, setLowStockWarning] = useState<string | null>(null);
  const [spawnDelayMultiplier, setSpawnDelayMultiplier] = useState(5); // Start at 5x delay

  // Tax evasion tracking
  const [taxDebtAmount, setTaxDebtAmount] = useState(0); // Accumulated unpaid tax
  const [taxDebtMonths, setTaxDebtMonths] = useState(0); // Months of evasion
  const [yearTaxFiled, setYearTaxFiled] = useState<Record<number, boolean>>({}); // year -> filed?
  const [lastAuditYear, setLastAuditYear] = useState(-1); // Track last audit year
  const [pendingPenalty, setPendingPenalty] = useState(0);

  const goldRef = useRef<HTMLDivElement>(null);

  const isInTaxProcess = taxPhase !== "none" && taxPhase !== "warning";

  useEffect(() => {
    SELLABLE_ITEMS.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  useEffect(() => {
    if (registered && !isInTaxProcess) spawnCustomer();
  }, [registered]);

  useEffect(() => {
    if (!registered || isInTaxProcess) return;
    const interval = setInterval(() => {
      setGameSeconds((s) => s + 1500);
    }, 10);
    return () => clearInterval(interval);
  }, [registered, isInTaxProcess]);

  const getYearAndDay = (totalSeconds: number) => {
    const totalDays = Math.floor(totalSeconds / SECONDS_PER_DAY);
    const year = Math.floor(totalDays / 365);
    const dayOfYear = totalDays % 365;
    return { year, dayOfYear, totalDays };
  };

  const getMonthFromDay = (dayOfYear: number) => {
    let remaining = dayOfYear;
    for (let m = 0; m < 12; m++) {
      if (remaining < DAYS_IN_MONTH[m]) return m;
      remaining -= DAYS_IN_MONTH[m];
    }
    return 11;
  };

  // Tax warning
  useEffect(() => {
    const { year, dayOfYear } = getYearAndDay(gameSeconds);
    if (dayOfYear >= 344 && dayOfYear < 359 && taxPhase === "none" && lastTaxYear < year) {
      setTaxPhase("warning");
    }
    if (dayOfYear >= 359 && taxPhase === "warning") {
      setTaxPhase("none");
    }
  }, [gameSeconds, taxPhase, lastTaxYear]);

  // Tax decision - pause everything
  useEffect(() => {
    const { year, dayOfYear } = getYearAndDay(gameSeconds);
    if (year >= 1 && dayOfYear >= 4 && dayOfYear < 9 && taxPhase === "none" && lastTaxYear < year) {
      setTaxPhase("decision");
      setTaxPaused(true);
      setCustomerState("gone");
    }
  }, [gameSeconds, taxPhase, lastTaxYear]);

  // Random audit at month 6, skip years 0-1, auto-proceed (no button)
  const auditTriggeredRef = useRef<number>(-1);
  useEffect(() => {
    if (isInTaxProcess || !registered) return;
    const { year, dayOfYear } = getYearAndDay(gameSeconds);
    const currentMonth = getMonthFromDay(dayOfYear);

    // Skip year 0 and year 1, only audit from year 2+
    // Trigger at month 6 (July), only once per year
    if (year >= 2 && currentMonth === 5 && year > lastAuditYear && auditTriggeredRef.current !== year) {
      auditTriggeredRef.current = year;
      // 40% chance of audit each year
      if (Math.random() < 0.4) {
        setLastAuditYear(year);
        setTaxPhase("audit");
        setTaxPaused(true);
        setCustomerState("gone");
        // Auto-proceed after 2.5 seconds (no button needed)
        setTimeout(() => {
          handleAuditDismiss();
        }, 2500);
      } else {
        setLastAuditYear(year);
      }
    }
  }, [gameSeconds, isInTaxProcess, registered, lastAuditYear]);

  // Success -> congrats
  useEffect(() => {
    if (taxPhase === "success") {
      const timer = setTimeout(() => setTaxPhase("congrats"), 5000);
      return () => clearTimeout(timer);
    }
  }, [taxPhase]);

  useEffect(() => {
    if (lowStockWarning) {
      const timer = setTimeout(() => setLowStockWarning(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [lowStockWarning]);

  const isInTaxProcessRef = useRef(isInTaxProcess);
  isInTaxProcessRef.current = isInTaxProcess;

  const spawnCustomer = useCallback(() => {
    if (isInTaxProcessRef.current) return;
    const randomItem = SELLABLE_ITEMS[Math.floor(Math.random() * SELLABLE_ITEMS.length)];
    setCurrentBubbleItem(randomItem);
    setCustomerKey((k) => k + 1);
    setCustomerState("walking_in");
  }, []);

  const handleArrival = useCallback(() => {
    if (!currentBubbleItem) return;
    const stockItem = stockItems.find((i) => i.id === currentBubbleItem.id);
    const hasStock = stockItem && stockItem.owned > 0;

    if (!hasStock) {
      setCustomerState("waiting");
      setTimeout(() => {
        setCustomerState("walking_out");
      }, 20000);
      return;
    }

    setCustomerState("waiting");
    setTimeout(() => {
      setCustomerState("selling");
      setTimeout(() => {
        const price = currentBubbleItem.sellPrice;
        const cost = currentBubbleItem.cost;
        setGold((g) => g + price);
        setTotalRevenue((r) => r + price);
        setTotalCostAccumulated((c) => c + cost);

        setStockItems((items) => {
          const updated = items.map((i) =>
            i.id === currentBubbleItem.id ? { ...i, owned: i.owned - 1 } : i
          );
          const updatedItem = updated.find((i) => i.id === currentBubbleItem.id);
          if (updatedItem && updatedItem.owned === 1) {
            setLowStockWarning(`${updatedItem.name} จะหมด โปรดซื้อเพิ่ม`);
          }
          return updated;
        });

        const goldEl = goldRef.current;
        if (goldEl) {
          const rect = goldEl.getBoundingClientRect();
          const newCoin: CoinAnim = {
            id: crypto.randomUUID(),
            startX: window.innerWidth * 0.47,
            startY: window.innerHeight * 0.5,
            endX: rect.left + 10,
            endY: rect.top + 4,
          };
          setCoins((prev) => [...prev, newCoin]);
        }
        setCustomerState("walking_out");
      }, 800);
    }, 2000);
  }, [currentBubbleItem, stockItems]);

  const handleExitComplete = useCallback(() => {
    setCustomerState("gone");
    setCurrentBubbleItem(null);
    if (!isInTaxProcess) {
      setTimeout(() => spawnCustomer(), 600 * spawnDelayMultiplier);
    }
  }, [spawnCustomer, isInTaxProcess, spawnDelayMultiplier]);

  const handleCoinComplete = useCallback((id: string) => {
    setCoins((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleRegistration = (name: string) => {
    setShopName(name);
    setRegistered(true);
  };

  const handleBuyStock = useCallback((itemId: string) => {
    setStockItems((items) => {
      const item = items.find((i) => i.id === itemId);
      if (!item || item.locked || gold < item.cost) return items;
      setGold((g) => g - item.cost);
      setPurchaseHistory((h) => [
        ...h,
        { itemName: item.name, quantity: 1, totalCost: item.cost, currency: "gold", timestamp: Date.now() },
      ]);
      return items.map((i) => (i.id === itemId ? { ...i, owned: i.owned + 1 } : i));
    });
  }, [gold]);

  const handleBuyDeco = useCallback((itemId: string) => {
    setDecoItems((items) => {
      const item = items.find((i) => i.id === itemId);
      if (!item || diamonds < item.diamondCost) return items;
      setDiamonds((d) => d - item.diamondCost);
      setPurchaseHistory((h) => [
        ...h,
        { itemName: item.name, quantity: 1, totalCost: item.diamondCost, currency: "diamond", timestamp: Date.now() },
      ]);
      return items.map((i) => (i.id === itemId ? { ...i, owned: i.owned + 1 } : i));
    });
  }, [diamonds]);

  // === TAX DECISION HANDLERS ===

  // Decision screen: green = file tax, red = skip (go to confirm risk)
  const handleTaxDecisionAccept = () => setTaxPhase("quiz"); // File tax normally
  const handleTaxDecisionDecline = () => setTaxPhase("confirm_risk"); // Go to risk confirmation

  // Confirm risk screen: green = confirm skip, red = cancel (go file tax)
  const handleConfirmSkipTax = () => {
    const { year } = getYearAndDay(gameSeconds);
    // Calculate unpaid tax for this year
    const netProfit = totalRevenue - totalCostAccumulated;
    const yearTax = netProfit > 0 ? netProfit * 0.05 : 0;

    // Accumulate debt
    setTaxDebtAmount((prev) => prev + yearTax);
    setTaxDebtMonths((prev) => prev + 12); // Add 12 months of evasion

    // Mark this year as NOT filed
    setYearTaxFiled((prev) => ({ ...prev, [year]: false }));
    setLastTaxYear(year);
    setTaxPhase("none");
    setTaxPaused(false);
    setTimeout(() => spawnCustomer(), 600);
  };

  const handleCancelRisk = () => setTaxPhase("quiz"); // Go file tax normally

  // Audit handlers
  const handleAuditDismiss = () => {
    const { year } = getYearAndDay(gameSeconds);
    // Check if the most recent year was filed
    const lastYear = year >= 1 ? year - 1 : 0;
    // Find the most recent year we have a record for
    let mostRecentRecordYear = -1;
    for (let y = year; y >= 0; y--) {
      if (yearTaxFiled[y] !== undefined) {
        mostRecentRecordYear = y;
        break;
      }
    }

    if (mostRecentRecordYear >= 0 && yearTaxFiled[mostRecentRecordYear] === false) {
      // CAUGHT! Calculate penalty: (unpaid amount × 1.5%) × months of evasion
      const penalty = Math.ceil(taxDebtAmount * 0.015 * taxDebtMonths);
      setPendingPenalty(penalty > 0 ? penalty : Math.ceil(taxDebtAmount * 1.5));
      setTaxPhase("penalty");
    } else {
      // Safe! Filed last year
      setTaxPhase("audit_pass");
    }
  };

  const handleAuditPassDismiss = () => {
    setTaxPhase("none");
    setTaxPaused(false);
    setTimeout(() => spawnCustomer(), 600);
  };

  const handlePayPenalty = () => {
    if (gold >= pendingPenalty) {
      // Can pay but punished for evasion - reset gold to 0
      setGold(0);
      setTaxDebtAmount(0);
      setTaxDebtMonths(0);
      setPendingPenalty(0);
      setTaxPhase("none");
      setTaxPaused(false);
      setTimeout(() => spawnCustomer(), 600);
    } else {
      // Can't pay - game over / jail
      setGold(0);
      setTaxPhase("jail");
    }
  };

  const handleJailRestart = () => {
    // Full game reset
    setGold(0);
    setDiamonds(0);
    setGameSeconds(0);
    setStockItems(INITIAL_STOCK);
    setDecoItems(INITIAL_DECO);
    setPurchaseHistory([]);
    setTotalCostAccumulated(0);
    setTotalRevenue(0);
    setTaxPhase("none");
    setTaxPaused(false);
    setLastTaxYear(-1);
    setSpawnDelayMultiplier(5);
    setTaxDebtAmount(0);
    setTaxDebtMonths(0);
    setYearTaxFiled({});
    setLastAuditYear(-1);
    setPendingPenalty(0);
    setCustomerState("gone");
    setCurrentBubbleItem(null);
    setTimeout(() => spawnCustomer(), 600);
  };

  const handleQuizComplete = () => setTaxPhase("summary");
  const handleSummaryClose = () => setTaxPhase("success");
  const handleCongratsClose = (reward: "diamond" | "speed" | "chest") => {
    const { year } = getYearAndDay(gameSeconds);
    setLastTaxYear(year);
    setYearTaxFiled((prev) => ({ ...prev, [year]: true }));

    // Apply reward
    if (reward === "diamond") {
      setDiamonds((d) => d + 10);
    } else if (reward === "chest") {
      setGold((g) => g + 100);
    } else if (reward === "speed") {
      // Speed boost: set multiplier to 2x
      setSpawnDelayMultiplier(2);
    }

    setTaxPhase("none");
    setTaxPaused(false);
    setTimeout(() => spawnCustomer(), 600);
  };

  const formatTime = (totalSeconds: number) => {
    const totalDays = Math.floor(totalSeconds / SECONDS_PER_DAY);
    const remainingSec = totalSeconds % SECONDS_PER_DAY;
    const hours = Math.floor(remainingSec / 3600) % 24;
    const minutes = Math.floor((remainingSec % 3600) / 60);
    const seconds = Math.floor(remainingSec % 60);
    let remainingDays = totalDays;
    let year = 0;
    while (remainingDays >= 365) { remainingDays -= 365; year++; }
    let month = 0;
    for (let m = 0; m < 12; m++) {
      if (remainingDays < DAYS_IN_MONTH[m]) { month = m; break; }
      remainingDays -= DAYS_IN_MONTH[m];
      if (m === 11) { month = 11; remainingDays = 0; }
    }
    return { year, month, day: remainingDays, hours, minutes, seconds };
  };

  const { year, month, day, hours, minutes, seconds } = formatTime(gameSeconds);
  const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const BLUE_POS = { left: 31, top: 66 };
  const STOP_POINT = PATH_POINTS[PATH_POINTS.length - 1];
  const startPoint = PATH_POINTS[0];

  if (!registered) {
    return <RegistrationOverlay onComplete={handleRegistration} />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-black" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${shopBackground})` }}
      />
      
      <DashedPath />

      <AnimatePresence>
        {coins.map((c) => (
          <FloatingCoin key={c.id} {...c} onComplete={handleCoinComplete} />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {lowStockWarning && (
          <motion.div
            className="absolute bottom-36 left-1/2 -translate-x-1/2 z-20 text-base font-bold px-6 py-3 rounded-lg"
            style={{
              color: "#ffffff",
              background: "rgba(220, 38, 38, 0.9)",
              border: "2px solid #991b1b",
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            ⚠️ {lowStockWarning}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-Left: Currency */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div
          ref={goldRef}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold shadow-lg"
          style={{ background: "rgba(30,20,10,0.85)", color: "#fbbf24", minWidth: 140 }}
        >
          <span className="text-lg">🪙</span>
          <span>Gold: {gold}</span>
          <button className="ml-auto w-5 h-5 rounded-full bg-yellow-500 text-black text-xs font-bold flex items-center justify-center hover:scale-110 transition-transform">+</button>
        </div>
        <div
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold shadow-lg"
          style={{ background: "rgba(30,20,10,0.85)", color: "#60a5fa", minWidth: 140 }}
        >
          <span className="text-lg">💎</span>
          <span>Diamonds: {diamonds}</span>
          <button className="ml-auto w-5 h-5 rounded-full bg-blue-400 text-black text-xs font-bold flex items-center justify-center hover:scale-110 transition-transform">+</button>
        </div>
      </div>

      {/* Top-Right: Time */}
      <div
        className="absolute top-4 right-4 z-10 rounded-lg px-5 py-3 text-sm font-bold shadow-lg"
        style={{ background: "rgba(30,20,10,0.85)", color: "#e5e7eb" }}
      >
        <div className="text-xs opacity-70 mb-1">Time</div>
        <div className="text-sm font-mono">Y{year} M{month} D{day} | {timeStr}</div>
      </div>

      {/* Shop name */}
      {shopName && (
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 z-10 text-sm font-bold px-4 py-1 rounded-lg"
          style={{ background: "rgba(30,20,10,0.85)", color: "#fbbf24" }}
        >
          🏪 {shopName}
        </div>
      )}

      {/* Blue shopkeeper cube */}
      <IsometricCube
        color="blue"
        size={50}
        className="absolute z-10"
        style={{ top: `${BLUE_POS.top}%`, left: `${BLUE_POS.left}%` }}
      />

      {/* Red customer cube */}
      <AnimatePresence>
        {(customerState === "walking_in" || customerState === "waiting" || customerState === "selling" || customerState === "walking_out") && (
          <motion.div
            key={customerKey}
            className="absolute z-10"
            initial={{ left: `${startPoint.left}%`, top: `${startPoint.top}%`, opacity: 1 }}
            animate={
              customerState === "walking_out"
                ? { left: `${startPoint.left}%`, top: `${startPoint.top}%`, opacity: 1 }
                : { left: `${STOP_POINT.left}%`, top: `${STOP_POINT.top}%`, opacity: 1 }
            }
            transition={{ duration: customerState === "walking_out" ? 2.4 : 3.6, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={() => {
              if (customerState === "walking_in") handleArrival();
              if (customerState === "walking_out") handleExitComplete();
            }}
          >
            <IsometricCube color="red" size={40} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speech bubble */}
      <AnimatePresence>
        {currentBubbleItem && customerState === "waiting" && (
          <motion.div
            className="absolute z-20 flex flex-col items-center"
            style={{ top: `${STOP_POINT.top - 12}%`, left: `${STOP_POINT.left}%` }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl px-3 py-2 shadow-lg relative flex flex-col items-center min-w-[60px]">
              <img src={currentBubbleItem.image} alt={currentBubbleItem.name} className="w-10 h-10 object-contain" loading="eager" decoding="async" />
              <div className="text-xs font-bold mt-1" style={{ color: "#2d8a4e" }}>฿{currentBubbleItem.sellPrice}</div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-Left: Menu */}
      <div className="absolute bottom-[14%] left-4 z-10 flex flex-col gap-2">
        {[
          { label: "SHOP", icon: "🏪", action: () => setShowShop(true) },
          { label: "Invest", icon: "📈", action: () => {} },
          { label: "Community", icon: "👥", action: () => {} },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold shadow-lg hover:scale-105 transition-transform"
            style={{
              background: "linear-gradient(180deg, #d4a574 0%, #a0764a 100%)",
              color: "#3b1e08",
              border: "2px solid #8b5e3c",
              textShadow: "0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <span>{btn.icon}</span>
            {btn.label}
          </button>
        ))}
      </div>

      {/* Title */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-2xl font-extrabold tracking-widest"
        style={{
          color: "#fbbf24",
          textShadow: "0 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(251,191,36,0.3)",
        }}
      >
        TAX TOWN
      </div>

      {/* Shop overlay */}
      {showShop && (
        <ShopOverlay
          gold={gold}
          diamonds={diamonds}
          onClose={() => setShowShop(false)}
          stockItems={stockItems}
          decoItems={decoItems}
          onBuyStock={handleBuyStock}
          onBuyDeco={handleBuyDeco}
          purchaseHistory={purchaseHistory}
        />
      )}

      {/* Tax system overlays */}
      <AnimatePresence>
        {!showShop && taxPhase === "warning" && <TaxWarningOverlay visible={true} />}
      </AnimatePresence>

      {!showShop && taxPhase === "decision" && (
        <TaxDecisionOverlay onAccept={handleTaxDecisionAccept} onDecline={handleTaxDecisionDecline} />
      )}

      {!showShop && taxPhase === "confirm_risk" && (
        <TaxConfirmRiskOverlay onConfirmSkip={handleConfirmSkipTax} onCancel={handleCancelRisk} />
      )}

      {!showShop && taxPhase === "quiz" && <TaxQuizOverlay onComplete={handleQuizComplete} />}

      {!showShop && taxPhase === "summary" && (
        <TaxSummaryOverlay
          gold={gold}
          totalRevenue={totalRevenue}
          totalCost={totalCostAccumulated}
          onClose={handleSummaryClose}
        />
      )}

      <AnimatePresence>
        {!showShop && taxPhase === "success" && <TaxSuccessOverlay visible={true} />}
      </AnimatePresence>

      {!showShop && taxPhase === "congrats" && <TaxCongratsOverlay onClose={handleCongratsClose} />}

      {!showShop && taxPhase === "audit" && <TaxAuditOverlay />}

      {!showShop && taxPhase === "audit_pass" && <TaxAuditPassOverlay onDismiss={handleAuditPassDismiss} />}

      {!showShop && taxPhase === "penalty" && (
        <TaxPenaltyOverlay penaltyAmount={pendingPenalty} onPay={handlePayPenalty} />
      )}

      {!showShop && taxPhase === "jail" && <TaxJailOverlay onRestart={handleJailRestart} />}
    </div>
  );
};

export default Index;
