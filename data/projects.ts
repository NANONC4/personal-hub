export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  gallery: string[];
  links: {
    demo?: string;
    github?: string;
    document?: string;
  };
  colorTheme?: "light" | "dark" | "horror";
}

export const projects: Project[] = [
  {
    id: "lemony-shop-pro",
    title: "LEMONY SHOP PRO",
    category: "Full-Stack Application",
    description: "โปรเจกต์ยกระดับ Lemony Shop สู่ Full-stack Application เต็มรูปแบบ โดย Rewrite โครงสร้างใหม่ทั้งหมดด้วย Next.js และ TypeScript เพื่อประสิทธิภาพและความปลอดภัยที่ดีขึ้น ระบบหลังบ้าน (Admin Dashboard) จัดการฐานข้อมูลผ่าน Prisma ORM เชื่อมต่อกับ Supabase รองรับการจัดการสินค้า โปรโมชัน และคูปองส่วนลด ใช้งาน NextAuth สำหรับระบบสมาชิก เชื่อมต่อ EasySlip API เพื่อตรวจสอบสลิปโอนเงินอัตโนมัติอย่างแม่นยำ พร้อมจัดการไฟล์รูปภาพด้วย UploadThing และระบบแจ้งเตือนสถานะต่างๆ ผ่าน LINE Notify",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "NextAuth", "UploadThing", "LINE Notify"],
    gallery: [
      "/images/lemony-pro-1.png",
      "/images/lemony-pro-2.png",
      "/images/lemony-pro-3.png",
      "/images/lemony-pro-4.png"
    ],
    links: {
      demo: "https://www.lemonyshop.com/",
      github: "https://github.com/NANONC4/lemony-shop-pro"
    },
    colorTheme: "dark"
  },
  {
    id: "lemony-shop",
    title: "LEMONY SHOP",
    category: "Web Application",
    description: "โปรเจกต์ Web Application เติมเกมที่เน้นความลื่นไหลและระบบหลังบ้านที่ไว้ใจได้ 100% โดยตัว UI/UX ดีไซน์ด้วย HTML5/CSS3 แบบ Responsive รองรับการใช้งานผ่านมือถือได้สมบูรณ์แบบ ขับเคลื่อนระบบด้วย Firebase Firestore และ Auth ของ Google เพื่อจัดการข้อมูลคำสั่งซื้อแบบ Real-time พร้อมยกระดับความปลอดภัยด้วยการใช้ Node.js บน Cloud Functions เชื่อมต่อ EasySlip API ตรวจสอบสลิปโอนเงินอัตโนมัติเพื่อดักจับสลิปปลอมหรือยอดเงินไม่ตรงได้ทันที นอกจากนี้ยังมีระบบ Automation แจ้งเตือนแอดมินผ่าน LINE Notify และระบบ Reward System สำหรับสะสมแต้มแลกของรางวัลให้ลูกค้าโดยอัตโนมัติครับ",
    stack: ["HTML5", "CSS3", "JavaScript", "Firebase", "Cloud Functions"],
    gallery: [
      "/images/lemony-html-1.png",
      "/images/lemony-html-2.png",
      "/images/lemony-html-3.png"
    ],
    links: {
      demo: "https://lemony-shop-data.web.app/",
      github: "https://github.com/NANONC4/lemony-shop.com"
    },
    colorTheme: "light"
  },
  {
    id: "rules-of-horror",
    title: "RULES OF HORROR",
    category: "Game Development",
    description: "โปรเจกต์ Mini-Thesis รูปแบบงานกลุ่มที่ท้าทายการพัฒนาเกมสยองขวัญมุมมองบุคคลที่ 1 (First-person) บน Unity Engine โดยผมรับหน้าที่เป็นหลักในการพัฒนาระบบ Core Game Logic ทั้งหมด รวมถึงการเขียน Script ระบบ Manager ต่างๆ เพื่อควบคุม Event ภายในเกม, ระบบกฎ (Rule System) ที่เปลี่ยนตามสถานการณ์ และการจัดการทรัพยากรเบื้องหลัง เพื่อให้ประสบการณ์การเล่นลื่นไหลและตรงตามเงื่อนไข 'Rule-based Survival' ที่ทีมออกแบบไว้ครับ",
    stack: ["Unity", "C#", "System Design", "Git"],
    gallery: [
      "/images/7.jpg",
      "/images/8.jpg",
      "/images/9.jpg",
      "/images/10.jpg"
    ],
    links: {
      demo: "https://drive.google.com/file/d/1zyA-MeBdRYvWHQ0EiAAQQyGj3gAzOp6n/view?usp=sharing",
      document: "https://canva.link/ajib9dtbqhgsl05"
    },
    colorTheme: "horror"
  }
];
