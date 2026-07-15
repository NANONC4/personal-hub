export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  gallery: string[];
  avatar?: string;
  links: {
    demo?: string;
    github?: string;
    document?: string;
  };
  colorTheme?: "light" | "dark" | "horror";
  type: "web" | "game" | "bio";
  bgClass: string;
  theme: "light" | "dark" | "blue" | "horror";
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
    colorTheme: "dark",
    type: "web",
    bgClass: "bg-purple-100",
    theme: "blue"
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
    colorTheme: "light",
    type: "web",
    bgClass: "bg-amber-50",
    theme: "dark"
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
    colorTheme: "horror",
    type: "game",
    bgClass: "bg-[#4a0d0d]",
    theme: "horror"
  },
  {
    id: "bio-retro",
    title: "RETRO PIXEL BIO",
    category: "Bio Portfolio",
    description: "ออกแบบหน้าลิงก์ไบโอสไตล์เกมยุค 90s สีสันสดใส เน้นความเป็น Pixel Art ที่เข้ากับยุคสมัยให้กับคุณ Lemony",
    stack: ["Next.js", "Tailwind CSS"],
    gallery: [
      "/จอยาว.png",
      "/จอตั้ง.png"
    ],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lemony&backgroundColor=0ea5e9",
    links: { demo: "#" },
    type: "bio",
    bgClass: "bg-sky-200",
    theme: "light"
  },
  {
    id: "bio-minimal",
    title: "MINIMALIST BIO",
    category: "Bio Portfolio",
    description: "หน้าไบโอที่เรียบง่าย หรูหรา สไตล์ Minimalist เหมาะสำหรับสาย Creative จัดทำให้กับลูกค้าสตูดิโอถ่ายภาพ",
    stack: ["React", "CSS"],
    gallery: [
      "/จอยาว.png",
      "/จอตั้ง.png"
    ],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Studio&backgroundColor=94a3b8",
    links: { demo: "#" },
    type: "bio",
    bgClass: "bg-slate-200",
    theme: "light"
  },
  {
    id: "bio-neon",
    title: "NEON CYBER",
    category: "Bio Portfolio",
    description: "ลูกค้าสตรีมเมอร์อยากได้ธีมไซเบอร์พังก์เรืองแสง โดดเด่นด้วยแสงนีออน สีสันเจ็บปวดกระแทกตา!",
    stack: ["Framer Motion", "Tailwind"],
    gallery: [
      "/จอยาว.png",
      "/จอตั้ง.png"
    ],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cyber&backgroundColor=f472b6",
    links: { demo: "#" },
    type: "bio",
    bgClass: "bg-pink-400",
    theme: "dark"
  },
  {
    id: "bio-forest",
    title: "MYSTIC FOREST",
    category: "Bio Portfolio",
    description: "ธีมธรรมชาติ โทนสีเขียวสบายตา สไตล์ป่าลึกลับ ออกแบบให้กับแบรนด์สินค้าออร์แกนิค",
    stack: ["Next.js", "CSS"],
    gallery: [
      "/จอยาว.png",
      "/จอตั้ง.png"
    ],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Forest&backgroundColor=34d399",
    links: { demo: "#" },
    type: "bio",
    bgClass: "bg-emerald-400",
    theme: "dark"
  },
  {
    id: "bio-sunset",
    title: "VAPORWAVE SUNSET",
    category: "Bio Portfolio",
    description: "สไตล์ Vaporwave ยุค 80s ไล่สีพระอาทิตย์ตกดิน ส่งมอบให้กับวงดนตรีอินดี้",
    stack: ["React", "Styled Components"],
    gallery: [
      "/จอยาว.png",
      "/จอตั้ง.png"
    ],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunset&backgroundColor=fb923c",
    links: { demo: "#" },
    type: "bio",
    bgClass: "bg-orange-400",
    theme: "light"
  },
  {
    id: "bio-royal",
    title: "ROYAL VELVET",
    category: "Bio Portfolio",
    description: "ธีมหรูหราอลังการ โทนสีม่วงทอง ดูแพงสุดๆ สำหรับแบรนด์เครื่องสำอางไฮเอนด์",
    stack: ["HTML", "Tailwind CSS"],
    gallery: [
      "/จอยาว.png",
      "/จอตั้ง.png"
    ],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Royal&backgroundColor=a855f7",
    links: { demo: "#" },
    type: "bio",
    bgClass: "bg-purple-500",
    theme: "dark"
  },
  {
    id: "bio-ocean",
    title: "DEEP OCEAN",
    category: "Bio Portfolio",
    description: "ธีมใต้น้ำลึก โทนสีฟ้าคราม เย็นสบายตา หน้าต่างนำเสนอบริการดำน้ำ",
    stack: ["Next.js", "Framer Motion"],
    gallery: [
      "/จอยาว.png",
      "/จอตั้ง.png"
    ],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ocean&backgroundColor=60a5fa",
    links: { demo: "#" },
    type: "bio",
    bgClass: "bg-blue-400",
    theme: "light"
  }
];

