# สถานะงาน — หน้า Home

อัปเดต 2026-09-22 · อ่านไฟล์นี้ก่อนทำต่อ

---

## ⚠️ เรื่องด่วนที่สุด

**branch `feat/welcome-window-lofi` นำหน้า `main` อยู่ 32 commit และยังไม่ merge**

เว็บจริงบน Vercel (`nanonc4-portfolio.vercel.app`) **ยังเป็นเวอร์ชันเก่า** — ไม่มีหน้าต่างเวลคัม
ไม่มีสไลด์ผลงาน ยังเป็นการ์ด 4 ใบ งานทั้งหมดด้านล่างนี้คนนอกยังไม่เห็น

Dia กำลังจะสมัครงาน **Junior Full Stack Developer ที่ King Pac Industrial**
(เงินเดือน 17,000–22,000 · ชลบุรี · `pheerasisth.phi@king-pac.com`) ซึ่งขอ
**Portfolio / GitHub** → ต้อง merge ก่อนส่งใบสมัคร

---

## หน้า Home ตอนนี้เป็นยังไง

```
หน้าต่างเวลคัม   เลื่อนเปิดบานเลื่อน 2 ข้าง (WelcomeWindow) ~200vh
HERO             Hi, I'm Dia. / THE LIGHT'S ON
WHO AM I?        เกม SpaceShooter ซ้าย · ข้อความขวา
WHAT I USE       ข้อความ+รายการเทคโนโลยีซ้าย · เกม TechBreakout ขวา
WHAT I'VE BUILT  สไลด์นำเสนอค้างจอ 3 โปรเจกต์ (ProjectSlides)
GOOD NIGHT       ฝันดีนะ แล้วเจอกันใหม่
Footer
```

**ทุกโซน = 1 จอพอดี** (`min-h-screen` + จัดกลาง) — Dia ย้ำเรื่องนี้หลายรอบ
ห้ามให้เห็นเนื้อหาของโซนอื่นตอนจอดกลางโซนใดโซนหนึ่ง

**พื้นหลังไล่สีตามการเลื่อน** — เลื่อนลง = ดึกขึ้น
`rgb(46,92,143)` ฟ้าที่ HERO → `rgb(5,9,16)` เกือบดำที่ GOOD NIGHT

---

## กับดักที่เสียเวลาไปเยอะ — อย่าพลาดซ้ำ

| อาการ | สาเหตุจริง |
|---|---|
| `position: sticky` ไม่ทำงาน | `overflow-x-hidden` ที่ `<main>` ทำให้มันกลายเป็น scroll container → ใช้ **`overflow-x-clip`** แทน |
| เลเยอร์พื้นหลังหายไป | `-z-10` ทำให้ไปอยู่**หลังพื้นหลังของ parent เอง** (main เป็น relative แต่ไม่ใช่ stacking context) → ใช้ `z-0` |
| ตัวหนังสือใน canvas เบลอ/ผิดฟอนต์ | `ctx.font` **อ่าน `var(--font-pixel)` ไม่ได้** ต้อง `getComputedStyle(document.body).getPropertyValue(...)` ก่อน · Silkscreen มีแค่ weight 400 อย่าใส่ `bold` |
| canvas เบลอบนจอ retina | ต้องตั้ง `canvas.width = logicalW * cssW/logicalW * dpr` แล้ว `ctx.setTransform(scale,...)` |
| เมาส์กับ paddle ไม่ตรงกัน | `clientX` เป็นหน่วย CSS แต่สนามเกมเป็น 800 หน่วย ต้องแปลงผ่าน `rect.width` ก่อน |
| framer `useScroll` ค่าไม่ขยับ | Lenis คุม scroll อยู่ → ใช้ `window.addEventListener("scroll")` + `requestAnimationFrame` แทนทุกที่ |
| footer โดนพื้นหลังทับ | `<footer>` ไม่มี `position` → ต้อง `relative z-10` |

---

## งานที่ยังค้าง

### ต้องทำก่อนส่งใบสมัคร
1. **merge เข้า `main`** — 32 commit
2. **รูปผลงาน 404 ทั้ง 11 ไฟล์** — `public/images/` ยังไม่มีโฟลเดอร์ด้วยซ้ำ
   (`lemony-pro-1..4.png`, `lemony-html-1..3.png`, `7,8,9,10.jpg`)
   ตอนนี้ขึ้น placeholder ว่า "ภาพตัวอย่างกำลังมา" — **Dia ต้องแคปหน้าจอเอง ห้ามสร้างรูปปลอม**
3. ~~**รีวิวปลอมหน้า `/contact`**~~ ✅ เอาออกแล้ว (2026-09-22) — ลบรีวิว 3 อัน
   พาดหัว "Verified Reviews" และดาว 5.0/5.0 ทิ้ง เปลี่ยนเป็นการ์ดลิงก์ 2 ใบ
   GitHub + Fastwork (ของจริง รีวิวจริงอยู่บน Fastwork อยู่แล้ว)

### รอ Dia ตัดสินใจ
- `components/BentoGrid.tsx` + `BentoAnimations.tsx` **ไม่มีใครเรียกใช้แล้ว** ลบไหม
- บรรทัด "รับงานฟรีแลนซ์ · ดูบริการ" ท้ายหน้า เก็บไว้ไหม
- 👾 ข้าง "THE LIGHT'S ON" ขัดกับคำ — เสนอเปลี่ยนเป็นจุดสี่เหลี่ยมสีเหลืองอำพันกระพริบ
- หน้าจอ **GAME OVER** ในเกม TechBreakout ยังเป็นสไตล์เก่า (ปุ่มแดง เงาทึบ) ยังไม่ได้แก้
- คำในหน้า Services / FAQ / Contact / Portfolio ยังไม่ได้ตรวจเหมือนที่ทำกับหน้า Home
- `&` ใน "PRISMA & SQL" ฟอนต์ Silkscreen วาดออกมาคล้าย `$`

### ยังไม่ได้ทำ
- วาดภาพหน้าต่างเวลคัมเองใน Aseprite — คู่มืออยู่ที่ `docs/welcome-window-pixel-art.md`
- หน้า `/services` (ราคา) Dia บอกว่าไม่ชอบ ยังไม่ได้แตะ

---

## วิธีคุยกับ Dia

- **ภาษาไทยง่ายๆ** ห้ามใช้ศัพท์ดีไซน์ · รายงานยาวๆ แน่นๆ เขาจะไม่อ่าน
- อธิบายแบบ **อะไรพัง / ทำไมสำคัญ / แก้ยังไง**
- **ใช้ตัวเลขจริง** เขาชอบเห็นตัวเลขวัดได้ ไม่ใช่ความเห็นลอยๆ
- เสนอเป็นตัวเลือก 🅐 🅑 🅒 แล้วให้เลือก + บอกว่าเชียร์อันไหนเพราะอะไร
- **เขาเถียงกลับด้วยเหตุผลจริง** ถ้าเขาบอกว่าตั้งใจทำแบบนั้น ให้เชื่อ (เคยเข้าใจผิดเรื่องเกม TechBreakout มาแล้ว — บล็อกที่โดนยิงแล้ว**ตั้งใจให้สว่างค้างไว้** ไม่ใช่บั๊ก)
- อย่าใช้ `AskUserQuestion` เขาไม่ชอบ ถามในข้อความปกติ

---

## รันยังไง

```bash
npm run dev          # ล่าสุดได้ port 3000
npm run build        # ต้องผ่านก่อน commit เสมอ
npx tsc --noEmit
npx eslint app components
```

ถ่ายรูปหน้าเว็บด้วย puppeteer-core + Chrome ของเครื่อง:
`C:/Program Files/Google/Chrome/Application/chrome.exe`
(ติดตั้งใน scratchpad ด้วย `npm install --no-save puppeteer-core` โฟลเดอร์นี้โดนล้างทุกวัน ต้องลงใหม่)

---

## เอกสารอื่น

| ไฟล์ | เนื้อหา |
|---|---|
| `PRODUCT.md` | เว็บนี้คืออะไร ใครดู อะไรจริงอะไรปลอม |
| `DESIGN.md` | North Star "The 2 A.M. Window" · จานสี · กฎ 6 ข้อ |
| `AGENTS.md` | **Next.js 16 มี breaking changes — อ่าน `node_modules/next/dist/docs/` ก่อนเขียนโค้ด Next** |
| `docs/welcome-window-pixel-art.md` | คู่มือวาดหน้าต่างใน Aseprite |
| `docs/impeccable-cheatsheet.md` | สรุปคำสั่ง impeccable 21 ตัว |
