# Tax Town

### ภาษีสร้างเมือง · Taxes Build Cities

**เกมจำลองสถานการณ์ที่สอนเรื่องภาษีผ่านการบริหารร้านค้าและพัฒนาเมือง**
**A tax simulation game where every fiscal decision shapes your city's future**

---

## ภาพรวมโปรเจกต์ · Project Overview

Tax Town คือเกมจำลองสถานการณ์ที่ผู้เล่นรับบทบาทเป็นเจ้าของร้านขายของชำในเมืองสมัยอดีต หน้าที่หลักคือบริหารร้านและตัดสินใจว่า "จะจ่ายภาษีหรือไม่" โดยทุกการตัดสินใจส่งผลโดยตรงต่อการพัฒนาเมือง รายได้ และความเสี่ยงจากการสุ่มตรวจของสรรพากร

---

## Background & Motivation · ที่มาและแรงบันดาลใจ

ความเข้าใจเรื่องภาษีในหมู่ประชาชนทั่วไปยังอยู่ในระดับต่ำ โดยเฉพาะผู้ประกอบการรายย่อยที่ไม่คุ้นเคยกับขั้นตอนการยื่นภาษีและเอกสารที่เกี่ยวข้อง Tax Town จึงถูกสร้างขึ้นเพื่อสอนเรื่องภาษีแบบสนุกและจดจำได้ผ่าน Gamification

- ผู้ประกอบการ SME จำนวนมากขาดความรู้เรื่องภาษีเงินได้และภาษีมูลค่าเพิ่ม
- การหลีกเลี่ยงภาษีส่งผลกระทบต่องบประมาณรัฐและการพัฒนาโครงสร้างพื้นฐาน
- Gamification ช่วยให้เรียนรู้เรื่องซับซ้อนได้อย่างเป็นธรรมชาติ

---

## Features & Gameplay · ฟีเจอร์และวิธีเล่น

### Core Gameplay Loop

```
เปิดร้านขายของชำ
     ↓
บริหารรายรับ-รายจ่าย
     ↓
ตัดสินใจ: จ่ายภาษี ✅ หรือ ไม่จ่าย ❌
     ↓
Mini-Quest (กรณีจ่ายภาษี) → รับโบนัส
     ↓
สรรพากรสุ่มตรวจ 🔍
     ↓
เมืองพัฒนา / ถดถอย → รายได้เปลี่ยนแปลง
```

---

### Tax Decision System · ระบบการตัดสินใจภาษี

| เส้นทาง · Path            | ผลระยะสั้น · Short-term | ผลระยะยาว · Long-term                |
| ------------------------- | ----------------------- | ------------------------------------ |
| ✅ จ่ายภาษี · Pay Tax     | กำไรลดลงเล็กน้อย        | เมืองพัฒนา รายได้เพิ่ม ไร้ความเสี่ยง |
| ❌ ไม่จ่ายภาษี · Skip Tax | กำไรสูงชั่วคราว         | เมืองหยุดพัฒนา เสี่ยงถูกตรวจ         |

---

### Mini-Quest System · ระบบ Mini-Quest

เมื่อผู้เล่นกด **"จ่ายภาษี"** จะมีคำถามความรู้ภาษีปรากฏขึ้น ครอบคลุมหัวข้อ:

- 📄 เอกสารที่ต้องใช้ในการยื่นภาษี · Required tax documents
- 📅 วันครบกำหนดยื่นภาษี · Filing deadlines
- 🧮 การคำนวณภาษีเบื้องต้น · Basic tax calculation
- 💡 สิทธิ์ลดหย่อนภาษี · Tax deduction rights
- 🏢 ขั้นตอนการยื่นภาษีจริง · Actual filing procedures

**รางวัล · Rewards:** คะแนนโบนัส · Bonus score | ไอเทมพัฒนาเมือง · City items | Badge ความรู้ · Knowledge badge

---

### App Screens · หน้าจอในแอป

| หน้าจอ · Screen | รายละเอียด · Description                                     |
| --------------- | ------------------------------------------------------------ |
| 🏠 Home         | ภาพรวมร้านค้าและสถานะเมือง · Shop overview & city status     |
| 🏪 Shop         | บริหารสินค้าและรายได้ · Manage inventory & income            |
| 🧾 Tax Decision | เลือกจ่ายหรือไม่จ่ายภาษี · Choose to pay or skip tax         |
| 📝 Mini-Quest   | ตอบคำถามความรู้ภาษีรับโบนัส · Answer tax quizzes for rewards |
| 🌆 City View    | ดูภาพเมืองที่เปลี่ยนแปลง · Watch your city evolve            |
| 🏆 Leaderboard  | อันดับผู้เล่นแบบ Real-time · Real-time player rankings       |
| 🔍 Tax Audit    | แจ้งเตือนเมื่อถูกสุ่มตรวจ · Audit notifications & results    |
| 📊 History      | ประวัติการตัดสินใจย้อนหลัง · Past decision history           |
| 👤 Profile      | Badge ความรู้และสถิติ · Knowledge badges & stats             |

---

## 🚀 Installation & Setup · การติดตั้งและตั้งค่า

### Steps · ขั้นตอน

```bash
# 1. Clone the repository
git clone https://github.com/your-org/tax-town-game.git
cd tax-town-game/model

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
```

### Environment Variables · ตัวแปรสภาพแวดล้อม

เปิดไฟล์ `.env.local` และกรอกค่าต่อไปนี้:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_WS_URL=wss://ws.example.com
```

### Run Development Server · รันเซิร์ฟเวอร์สำหรับพัฒนา

```bash
npm run dev
# เปิดเบราว์เซอร์ที่ http://localhost:3000
```

---

## 📁 Project Structure · โครงสร้างโปรเจกต์

```
tax-town-game/model
│
├── public/
│   ├── favicon.png
│   ├── placeholder.svg
│   ├── robots.txt
│   └── models/                  # 3D / game asset models
│
├── src/
│   ├── assets/                  # Static assets (images, fonts)
│   │
│   ├── components/
│   │   ├── AppHeader.tsx        # Top navigation bar
│   │   ├── AppLayout.tsx        # Main layout wrapper
│   │   ├── BottomNav.tsx        # Bottom navigation
│   │   ├── NavLink.tsx          # Navigation link component
│   │   ├── SubPageLayout.tsx    # Sub-page layout wrapper
│   │   └── ui/                  # shadcn/ui component library
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── badge.tsx
│   │       ├── chart.tsx
│   │       └── ...              # (40+ UI components)
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx       # Mobile detection hook
│   │   ├── use-theme.tsx        # Theme management hook
│   │   └── use-toast.ts         # Toast notification hook
│   │
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   │
│   ├── pages/
│   │   ├── HomePage.tsx         # Main dashboard
│   │   ├── ChatPage.tsx         # Multiplayer chat
│   │   ├── HistoryPage.tsx      # Decision history
│   │   ├── NotificationsPage.tsx # Audit alerts & notifications
│   │   ├── PharmacistPage.tsx   # (reserved)
│   │   ├── PrivacyPolicyPage.tsx
│   │   ├── ProfilePage.tsx      # Player profile & badges
│   │   ├── ReportPage.tsx       # Monthly report
│   │   ├── ScanPage.tsx         # Tax filing scan flow
│   │   ├── SecurityPage.tsx
│   │   ├── ChangePasswordPage.tsx
│   │   └── NotFound.tsx
│   │
│   ├── test/
│   │   ├── example.test.ts      # Unit test examples
│   │   └── setup.ts             # Test setup configuration
│   │
│   ├── App.tsx                  # Root component & routing
│   ├── App.css
│   ├── index.css                # Global styles
│   ├── main.tsx                 # Entry point
│   └── vite-env.d.ts
│
├── .gitignore
├── components.json              # shadcn/ui config
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── playwright.config.ts         # E2E test config
├── playwright-fixture.ts        # Playwright test fixtures
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts             # Unit test config
```

---

## 🌍 Social Impact · ผลกระทบทางสังคม

| เป้าหมาย · Goal    | รายละเอียด · Detail                                                      |
| ------------------ | ------------------------------------------------------------------------ |
| 📚 Tax Literacy    | เพิ่มความรู้ภาษีในกลุ่มผู้ประกอบการรายย่อยและเยาวชน                      |
| 🏙️ Civic Awareness | สร้างความเข้าใจว่าภาษีของทุกคนมีผลต่อสังคมโดยรวม                         |
| 💡 Behavior Change | กระตุ้นให้เกิดพฤติกรรมการจ่ายภาษีที่ถูกต้องผ่านการเรียนรู้เชิงประสบการณ์ |
| ⚖️ SDG 16          | สอดคล้องกับ Peace, Justice and Strong Institutions                       |
| 🏘️ SDG 11          | สอดคล้องกับ Sustainable Cities and Communities                           |
