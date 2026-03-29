import { useState } from "react";
import shopBackground from "@/assets/shop-background.png";

import q1Img from "@/assets/quiz/q1.png";
import q2Img from "@/assets/quiz/q2.png";
import q3Img from "@/assets/quiz/q3.png";
import q4Img from "@/assets/quiz/q4.png";
import q5Img from "@/assets/quiz/q5.png";
import q6Img from "@/assets/quiz/q6.png";
import q7Img from "@/assets/quiz/q7.png";
import q8Img from "@/assets/quiz/q8.png";

interface TaxQuizOverlayProps {
  onComplete: () => void;
}

const QUESTIONS = [
  {
    image: q1Img,
    options: ["A) พนักงานประจำ", "B) ผู้มีรายได้หลายทาง/อาชีพอิสระ", "C) นักเรียน", "D) ผู้ไม่มีรายได้"],
    answer: 1,
  },
  {
    image: q2Img,
    options: ["A) 150,000", "B) 200,000", "C) 100,000", "D) 120,000"],
    answer: 0,
  },
  {
    image: q3Img,
    options: ["A) ไม่มีความต่าง", "B) ใช้กับคนละประเภทผู้มีรายได้", "C) ใช้กับบริษัท", "D) ใช้กับนักเรียน"],
    answer: 1,
  },
  {
    image: q4Img,
    options: ["A) อินเทอร์เน็ต", "B) สำนักงานสรรพากร", "C) ทั้ง A และ B", "D) ทำไม่ได้เลย"],
    answer: 2,
  },
  {
    image: q5Img,
    options: ["A) ใบเสร็จ", "B) 50 ทวิ", "C) ภ.ง.ด.90", "D) ใบแจ้งหนี้"],
    answer: 1,
  },
  {
    image: q6Img,
    options: ["A) การจ่ายเงินล่วงหน้า", "B) การหักภาษีไว้ก่อนจ่ายเงินให้ผู้รับ", "C) การกู้เงิน", "D) การให้โบนัส"],
    answer: 1,
  },
  {
    image: q7Img,
    options: [
      "A) มีไว้สรุปรวมว่ามีรายได้เท่าไหร่ เสียภาษี ณ ที่จ่ายไว้แล้วเท่าไหร่",
      "B) ไม่แน่ใจ",
      "C) ไว้ดูว่าต้องเสียภาษีไปเท่าไหร่",
      "D) ไว้รวมรายได้",
    ],
    answer: 0,
  },
  {
    image: q8Img,
    options: ["A) ชื่อผู้จ่ายเงิน", "B) เลขประจำตัวผู้เสียภาษี", "C) จำนวนเงินที่หัก", "D) ถูกทุกข้อ"],
    answer: 3,
  },
];

const TaxQuizOverlay = ({ onComplete }: TaxQuizOverlayProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string>("");
  const [result, setResult] = useState<boolean | null>(null);
  const [completedCount, setCompletedCount] = useState(0);

  const question = QUESTIONS[currentQ];

  const handleSelect = (value: string) => {
    const idx = parseInt(value);
    if (isNaN(idx)) return;

    setSelected(value);
    const isCorrect = idx === question.answer;
    setResult(isCorrect);

    if (isCorrect) {
      const newCount = completedCount + 1;
      setCompletedCount(newCount);

      if (newCount === QUESTIONS.length) {
        setTimeout(() => onComplete(), 1000);
      } else {
        setTimeout(() => {
          setCurrentQ((prev) => prev + 1);
          setSelected("");
          setResult(null);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setSelected("");
        setResult(null);
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden">
      {/* Shop background */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${shopBackground})` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-[520px] px-4">
        {/* Progress */}
        <div
          className="text-sm font-bold px-4 py-1.5 rounded-full"
          style={{ background: "rgba(30,20,10,0.85)", color: "#fbbf24" }}
        >
          ข้อ {currentQ + 1} / {QUESTIONS.length}
        </div>

        {/* Question card */}
        <div className="relative w-full">
          <img
            src={question.image}
            alt={`Question ${currentQ + 1}`}
            className="w-full rounded-lg shadow-2xl"
          />

          {/* Dropdown overlaid on yellow rectangle area */}
          <div
            className="absolute flex items-center"
            style={{
              bottom: "21.5%",
              left: "8%",
              width: "84%",
              height: "8%",
            }}
          >
            <select
              value={selected}
              onChange={(e) => handleSelect(e.target.value)}
              disabled={result === true}
              className="w-full h-full rounded-md border-none outline-none font-bold cursor-pointer"
              style={{
                background: "rgba(235, 220, 170, 0.7)",
                color: "#5a3e1b",
                fontFamily: "'Sarabun', 'Segoe UI', sans-serif",
                fontSize: "clamp(10px, 2vw, 16px)",
                paddingLeft: "10px",
                paddingRight: "30px",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
            >
              <option value="">เลือกคำตอบ...</option>
              {question.options.map((opt, j) => (
                <option key={j} value={String(j)}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Triangle icon - hidden when result is shown (correct or wrong) */}
            {result === null && (
              <div
                className="absolute pointer-events-none"
                style={{
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 20,
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "7px solid #5a3e1b",
                }}
              />
            )}

            {/* Validation mark */}
            {result !== null && (
              <span
                className="absolute font-extrabold"
                style={{
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: result ? "#22c55e" : "#ef4444",
                  fontSize: "clamp(16px, 3vw, 24px)",
                  zIndex: 21,
                }}
              >
                {result ? "✓" : "✗"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxQuizOverlay;
