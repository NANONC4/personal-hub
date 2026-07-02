# 📓 Development Log & AI Handover Context

**Project:** Personal Hub (Portfolio & Link-in-Bio)
**Tech Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, TypeScript, Lucide React

---

## 🤖 สำหรับ AI ที่มารับงานต่อ (For the Next AI)
โปรเจกต์นี้เน้น **UX/UI สไตล์ Modern ผสมผสาน Retro Pixel-Art** 
หากคุณต้องแก้ไขหรือเขียนโค้ดเพิ่ม โปรดรักษา Theme และรูปแบบ Animation เดิมไว้ และอ่านสรุปโครงสร้างด้านล่างนี้ก่อนเริ่มทำงาน

---

## 🏗️ 1. โครงสร้างไฟล์ที่สำคัญ (Project Structure)
- `app/page.tsx`: หน้าหลักที่รวม Component ทุกส่วน (Hero, Intro, Portfolio, Horror Portal)
- `app/globals.css`: ไฟล์ CSS หลักที่มี **Custom Keyframe Animations** สำคัญๆ (เช่น การลอย, การกะพริบ, การกวาดแสง)
- `data/projects.ts`: ข้อมูล Mock Database สำหรับแสดงผลงานใน Portfolio
- `components/`:
  - `ProfileSection.tsx`: โซนโปรไฟล์ (ซ้ายมือบน Desktop) มีพื้นหลังเมฆ SVG และพระจันทร์เสี้ยว (วาดด้วยตารางพิกเซล 16x30 ให้ปลายเรียวแหลมและโค้งสวยงาม หลีกเลี่ยงรูปทรงตัว C)
  - `SocialLinkButton.tsx`: ปุ่มลิงก์ Interactive ที่มี Sparkles และ Scrolling Background
  - `PixelSky.tsx`: ระบบดาวตกและท้องฟ้า (HTML5 Canvas + requestAnimationFrame)
  - `SectionDivider.tsx`: ตัวช่วย Transition สลับสีพื้นหลังเวลา Scroll

---

## 🧩 2. รายละเอียดคอมโพเนนต์เฉพาะจุด (Component Specifics)

### `ProfileSection.tsx`
- ใช้ SVG Data URI ในการวาดภาพ Pixel Art (เมฆและพระจันทร์) โดยตรงในไฟล์
- **ข้อควรระวัง:** `moonPattern` ถูกปรับแต่ง Grid Path มาอย่างละเอียดเพื่อให้ได้สัดส่วนพระจันทร์เสี้ยวที่เรียวแหลมและยาวโค้งเข้าหากัน **ห้าม** แก้ไข Path นี้โดยพลการเว้นแต่ User ร้องขอ

### `PixelSky.tsx`
- เป็น Canvas ที่มี Object `Star` 100 ดวง 
- มีดาวตก (15% chance) และดาวกะพริบ
- ดาวตกจะหล่นลงมาในแนวทแยงมุม และเมื่อเฟดหายไปจะเกิดใหม่สุ่มตำแหน่ง

### `SocialLinkButton.tsx`
- ไอคอน, รูปแบบอนิเมชัน และลวดลายพื้นหลัง (ดาว/หัวใจ) จะเปลี่ยนไปตาม Index ของปุ่ม
- มี Sparkles ที่วาดด้วยตัวอักษรธรรมดาและลอยขึ้นลงด้วย `float-sparkle` keyframes

---

## 🚀 3. แผนการพัฒนาต่อยอด (Future Work)
- **CMS Integration:** อนาคตสามารถเปลี่ยนจาก `data/projects.ts` ไปเชื่อมกับ Headless CMS ได้
- **Performance:** ตรวจสอบความลื่นไหลของ Canvas และ Animations บนอุปกรณ์มือถือสเปคต่ำ
- **Code Refactoring:** คอมโพเนนต์ใน `components/projects/` สามารถยุบรวมเป็น Template เดียวได้

---
*End of Context.*
