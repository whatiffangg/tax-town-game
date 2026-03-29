import { useState } from "react";
import scrollBg from "@/assets/registration-scroll.png";
import gameBg from "@/assets/shop-background.png";

interface RegistrationOverlayProps {
  onComplete: (shopName: string) => void;
}

const RegistrationOverlay = ({ onComplete }: RegistrationOverlayProps) => {
  const [shopName, setShopName] = useState("");

  const handleSubmit = () => {
    if (shopName.trim()) {
      onComplete(shopName.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Full-screen game background */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${gameBg})` }}
      />
      {/* Dark semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Scroll overlay centered */}
      <div className="relative w-full max-w-[500px] aspect-[3/4] z-10">
        <img
          src={scrollBg}
          alt="Registration Scroll"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
        {/* Input field pinned to the yellow rectangle on the scroll */}
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="พิมพ์ชื่อร้าน..."
          className="absolute bg-transparent border-none outline-none text-center text-lg font-bold"
          style={{
            top: "66%",
            left: "38%",
            width: "30%",
            height: "5%",
            color: "#5a3e1b",
            fontFamily: "'Sarabun', 'Segoe UI', sans-serif",
            caretColor: "#5a3e1b",
          }}
          autoFocus
        />
        {/* ตกลง button overlay */}
        <button
          onClick={handleSubmit}
          className="absolute bg-transparent border-none cursor-pointer hover:brightness-110 transition-all"
          style={{
            top: "82%",
            left: "28%",
            width: "44%",
            height: "8%",
          }}
          disabled={!shopName.trim()}
        />
      </div>
    </div>
  );
};

export default RegistrationOverlay;
