import { useState } from "react";
import closeBtnImg from "@/assets/close-btn.png";
import { motion, AnimatePresence } from "framer-motion";

// Item images
import colaImg from "@/assets/items/cola.png";
import icecreamImg from "@/assets/items/icecream.png";
import coffeeImg from "@/assets/items/coffee.png";
import fruitsetImg from "@/assets/items/fruitset.png";
import snackImg from "@/assets/items/snack.png";
import toyImg from "@/assets/items/toy.png";
import cookieImg from "@/assets/items/cookie.png";
import sugarImg from "@/assets/items/sugar.png";
// Decoration images
import rockingHorseImg from "@/assets/items/rocking-horse.png";
import snowglobeImg from "@/assets/items/snowglobe.png";
import mermaidImg from "@/assets/items/mermaid.png";
import luckycatImg from "@/assets/items/luckycat.png";
import dragonHorseImg from "@/assets/items/dragon-horse.png";
import snowglobe2Img from "@/assets/items/snowglobe2.png";
import hanumanImg from "@/assets/items/hanuman.png";
import kinnariImg from "@/assets/items/kinnari.png";

export interface StockItem {
  id: string;
  name: string;
  image: string;
  cost: number;
  sellPrice: number;
  owned: number;
  locked?: boolean;
}

export interface DecoItem {
  id: string;
  name: string;
  image: string;
  diamondCost: number;
  owned: number;
}

export interface PackageItem {
  id: string;
  diamonds: number;
  coins: number;
  noAds?: number;
  price: string;
  priceValue: number;
}

export interface PurchaseRecord {
  itemName: string;
  quantity: number;
  totalCost: number;
  currency: "gold" | "diamond";
  timestamp: number;
}

interface ShopOverlayProps {
  gold: number;
  diamonds: number;
  onClose: () => void;
  stockItems: StockItem[];
  decoItems: DecoItem[];
  onBuyStock: (itemId: string) => void;
  onBuyDeco: (itemId: string) => void;
  purchaseHistory: PurchaseRecord[];
}

type ShopTab = "stock" | "deco" | "package";

const ShopOverlay = ({
  gold,
  diamonds,
  onClose,
  stockItems,
  decoItems,
  onBuyStock,
  onBuyDeco,
  purchaseHistory,
}: ShopOverlayProps) => {
  const [activeTab, setActiveTab] = useState<ShopTab>("stock");

  const tabs: { key: ShopTab; label: string }[] = [
    { key: "stock", label: "สต๊อคสินค้า" },
    { key: "deco", label: "ของตกแต่ง" },
    { key: "package", label: "แพ็คเกจ" },
  ];

  const packages: PackageItem[] = [
    { id: "pkg1", diamonds: 60, coins: 100, price: "ซื้อ 49฿", priceValue: 49 },
    { id: "pkg2", diamonds: 130, coins: 1200, noAds: 30, price: "ซื้อ 109฿", priceValue: 109 },
    { id: "pkg3", diamonds: 0, coins: 0, noAds: 15, price: "ซื้อ 59฿", priceValue: 59 },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #8b6914 0%, #a07d3a 30%, #b8975a 100%)" }} />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center" style={{ background: "rgba(90,55,10,0.9)" }}>
        {/* Left section: close btn + SHOP label, same width as sidebar */}
        <div className="flex items-center justify-center w-[200px] px-4 py-3 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute left-3 w-10 h-10 rounded-lg overflow-hidden hover:scale-110 transition-transform z-30"
          >
            <img src={closeBtnImg} alt="Close" className="w-full h-full object-cover" />
          </button>
          <div className="text-2xl font-extrabold tracking-wider" style={{ color: "#f5deb3" }}>
            SHOP
          </div>
        </div>
        {/* Right section: currency */}
        <div className="flex-1 flex justify-end gap-3 px-4 py-3">
          <div className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold" style={{ background: "rgba(255,248,220,0.9)", color: "#5a3e1b" }}>
            <span>🪙</span> {gold}
            <span className="ml-1 w-6 h-6 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: "#d4a017", color: "#fff" }}>+</span>
          </div>
          <div className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold" style={{ background: "rgba(255,248,220,0.9)", color: "#5a3e1b" }}>
            <span>💎</span> {diamonds}
            <span className="ml-1 w-6 h-6 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: "#5bc0eb", color: "#fff" }}>+</span>
          </div>
        </div>
      </div>

      {/* Sidebar tabs */}
      <div className="relative z-10 flex flex-col gap-0 pt-16 w-[200px] shrink-0" style={{ background: "rgba(90,55,10,0.7)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="relative text-center px-6 py-5 text-lg font-bold transition-all"
            style={{
              color: activeTab === tab.key ? "#3b1e08" : "#f5deb3",
              background: activeTab === tab.key ? "rgba(200,180,140,0.6)" : "transparent",
            }}
          >
            {activeTab === tab.key && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r" style={{ background: "#d4a017" }} />
            )}
            {tab.label}
            <div className="mt-2 h-[1px]" style={{ background: "rgba(210,180,120,0.5)" }} />
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="relative z-10 flex-1 pt-16 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {activeTab === "stock" && (
            <motion.div
              key="stock"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-4 gap-4"
            >
              {stockItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-3 flex flex-col items-center relative"
                  style={{
                    background: item.locked
                      ? "rgba(120,100,70,0.6)"
                      : "rgba(255,240,210,0.85)",
                    border: "3px solid rgba(180,140,80,0.6)",
                  }}
                >
                  {item.locked && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl" style={{ background: "rgba(0,0,0,0.4)" }}>
                      <span className="text-4xl">🔒</span>
                    </div>
                  )}
                  <div className="text-xs font-bold mb-1" style={{ color: "#5a3e1b" }}>{item.owned}</div>
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mb-2" loading="lazy" width={80} height={80} />
                  <div className="text-sm font-bold mb-2" style={{ color: "#5a3e1b" }}>{item.name}</div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mb-1">
                    <button
                      className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{ background: "rgba(180,140,80,0.5)", color: "#5a3e1b" }}
                    >−</button>
                    <span className="text-sm font-bold" style={{ color: "#5a3e1b" }}>{item.owned}</span>
                    <button
                      onClick={() => !item.locked && onBuyStock(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{ background: "rgba(180,140,80,0.5)", color: "#5a3e1b" }}
                    >+</button>
                  </div>

                  <div className="w-full text-xs" style={{ color: "#7a5c2b" }}>
                    <div className="flex justify-between"><span>ต้นทุน</span><span>{item.cost}</span></div>
                    <div className="flex justify-between"><span>ราคาขาย</span><span>{item.sellPrice}</span></div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "deco" && (
            <motion.div
              key="deco"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-4 gap-4"
            >
              {decoItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-3 flex flex-col items-center"
                  style={{
                    background: "rgba(255,240,210,0.85)",
                    border: "3px solid rgba(180,140,80,0.6)",
                  }}
                >
                  <div className="text-xs font-bold mb-1" style={{ color: "#5a3e1b" }}>{item.owned}</div>
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mb-2" loading="lazy" width={80} height={80} />
                  <div className="text-sm font-bold mb-2" style={{ color: "#5a3e1b" }}>{item.name}</div>

                  <div className="flex items-center gap-2 mb-1">
                    <button className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: "rgba(180,140,80,0.5)", color: "#5a3e1b" }}>−</button>
                    <span className="text-sm font-bold" style={{ color: "#5a3e1b" }}>{item.owned}</span>
                    <button
                      onClick={() => onBuyDeco(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{ background: "rgba(180,140,80,0.5)", color: "#5a3e1b" }}
                    >+</button>
                  </div>

                  <div className="flex items-center gap-1 text-xs" style={{ color: "#5bc0eb" }}>
                    <span>💎</span><span>{item.diamondCost}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "package" && (
            <motion.div
              key="package"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-center gap-6 rounded-2xl px-6 py-5"
                  style={{
                    background: "rgba(255,240,210,0.3)",
                    borderTop: "1px solid rgba(210,180,120,0.5)",
                    borderBottom: "1px solid rgba(210,180,120,0.5)",
                  }}
                >
                  <div className="flex items-center gap-2 text-3xl">
                    {pkg.diamonds > 0 && <span>💎</span>}
                    {pkg.coins > 0 && <span>🪙</span>}
                    {pkg.noAds && <span className="text-2xl">🚫📢</span>}
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-base font-bold" style={{ color: "#f5deb3" }}>
                      {pkg.diamonds > 0 && <div>เพชร {pkg.diamonds} เม็ด</div>}
                      {pkg.coins > 0 && <div>เหรียญ {pkg.coins.toLocaleString()} เหรียญ</div>}
                      {pkg.noAds && <div>ไม่มีโฆษณา {pkg.noAds} วัน</div>}
                    </div>
                  </div>
                  <button
                    className="rounded-full px-6 py-3 text-base font-bold"
                    style={{ background: "rgba(100,140,180,0.8)", color: "#fff" }}
                  >
                    {pkg.price}
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ShopOverlay;
