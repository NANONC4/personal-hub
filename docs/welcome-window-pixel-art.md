# WelcomeWindow — คู่มือวาด Pixel Art ใน Aseprite แล้วเอามาใช้กับเว็บ

เอกสารนี้อ่านแบบ standalone ได้ ไม่ต้องมี context อื่น
เป้าหมาย: แทน art ที่ตอนนี้เขียนด้วย `<div>` + gradient ใน
`components/WelcomeWindow.tsx` ด้วยรูป pixel art ที่วาดเองใน Aseprite
โดย **กลไก scroll (บานเลื่อนแยกซ้าย-ขวา + เฟดเข้า hero) ไม่ต้องแก้**

---

## 0. WelcomeWindow คืออะไร (สรุปสั้น)

หน้าเปิดเว็บหน้าแรก (`app/page.tsx` เรียกเป็น component แรก) — ฉาก "หน้าต่าง
lofi กลางคืนสีฟ้าพระจันทร์" เต็มจอ:

1. เข้ามาเจอหน้าต่างปิด มีแมวเงาดำนั่งขอบหน้าต่าง
2. เลื่อนลง → บานกระจก 2 บานเลื่อนแยกซ้าย-ขวา เผยเมืองกลางคืน + พระจันทร์ + ป้าย NANONC4
3. เลื่อนต่อ → ทั้งเลเยอร์เฟดหาย ไหลเข้า hero ("Hi, I'm Dia.")

ขับด้วย scroll ล้วน (ไม่ใช่ตั้งเวลา) — มี spacer สูง `220vh` ที่มองไม่เห็นเป็นราง

---

## 1. ตัดสินใจ RESOLUTION ก่อนเปิด Aseprite (สำคัญสุด)

วาดที่ **canvas ขนาดเล็กคงที่** แล้วขยายด้วย CSS ตอนแสดงผล
อย่าวาดใหญ่เท่าจอจริง

| ขนาด canvas | ลุค | หมายเหตุ |
|---|---|---|
| **480 × 270** (16:9) | พิกเซลใหญ่ ชัด lofi จัด | **แนะนำ** เริ่มจากอันนี้ |
| 640 × 360 | ละเอียดขึ้น พิกเซลเล็กลง | ใกล้เคียงรูป reference ที่ใช้ |
| 320 × 180 | หยาบมาก retro จัด | ถ้าอยาก 8-bit สุด |

กฎ:
- **ทุกเลเยอร์ / ทุกไฟล์ ใช้ canvas ขนาดเดียวกัน origin เดียวกัน**
  → เอามาซ้อนบนเว็บแล้วตรงเป๊ะโดยไม่ต้องจัดตำแหน่งทีละอัน
- อัตราส่วน **16:9** (จอส่วนใหญ่) — ของสำคัญ (พระจันทร์ แมว ป้าย) วาดให้
  ห่างขอบ เผื่อโดน crop บนจออัตราส่วนอื่น (ดู §7)
- ปิด anti-alias ทุกอย่าง: ปากกา = Pixel Perfect, ไม่มี soft brush, ไม่มี gradient tool แบบ dithering-less

---

## 2. PALETTE (โทนฟ้าพระจันทร์)

ทำ palette ชุดเดียวใน Aseprite (Palette panel > save) แล้วใช้กับทุกไฟล์
ค่าสีจากเวอร์ชันโค้ดปัจจุบัน ใช้เป็นจุดตั้งต้น:

```
ฟ้าบน (ใกล้พระจันทร์)   #3f74ad
ฟ้ากลาง                 #2c5988
ฟ้าล่าง (หลังเมือง)      #164070
หมอกเหนือเมือง          rgba(120,165,210,.35)  → เลือกสีทึบใกล้เคียง #6f9fce
พระจันทร์               #e8f0fa   + เรืองแสง #b4d2f0
ดาว                    #e2ecfb
ตึกชั้นหลัง             #173a63
ตึกชั้นหน้า             #0f2748
ไฟหน้าต่างฟ้า           #8fbde8 / #a9d0f2
ไฟหน้าต่างอุ่น (ประปราย) #ffd48a
กรอบ/คาน/ขอบ/แมว (เกือบดำ) #0a1424  (แมวเข้มกว่า #060c18)
กระจกบานเลื่อน (ทับโปร่งแสง) #0c1c38 ที่ alpha ~45%
```

จะปรับโทนได้ตามชอบ แต่ให้ "กรอบ + แมว + ขอบหน้าต่าง" เป็นสีเกือบดำอมน้ำเงิน
เดียวกัน จะได้ดูเป็น silhouette หน้าต่างเดียวกัน

---

## 3. แบ่งเลเยอร์ = แบ่งไฟล์ (ตาม "อะไรขยับ อะไรอยู่นิ่ง")

1 document, หลาย layer group, export ทีละ group เป็น PNG (มี alpha)

| ไฟล์ (`public/welcome/`) | มีอะไรในนั้น | บนเว็บทำอะไร |
|---|---|---|
| `sky.png` | ฟ้าไล่สี + พระจันทร์ + แสงรอบจันทร์ + ลำแสงจันทร์ + ดาว + หมอก + สกายไลน์ 2 ชั้น + ไฟหน้าต่างเมือง | **อยู่นิ่งสนิท** ไม่โดน transform เลย |
| `sash-left.png` | ครึ่งซ้ายของหน้าต่าง: กรอบ + คานแบ่งช่อง + **กระจกสีทับแบบโปร่งแสง** (alpha ~45% ให้ฟ้าทะลุ) + แสงสะท้อนทแยง + มือจับตรงกลาง | `translateX` ออกซ้ายตอน scroll |
| `sash-right.png` | ครึ่งขวา (mirror ของซ้าย) | `translateX` ออกขวาตอน scroll |
| `frame.png` *(ออปชัน)* | กรอบนอกสุดที่อยู่นิ่ง (จะรวมไปในไฟล์ sash เลยก็ได้ ถ้าไม่อยากมีไฟล์นี้) | อยู่นิ่ง |
| `sill.png` | ขอบหน้าต่าง (ledge เข้ม) เต็มความกว้าง + ของบนขอบ: ขวดสูง + แก้ว (ซ้าย), แจกันมีก้านดอกไม้แห้ง + โหล 2 ใบ (ขวา) | อยู่นิ่ง (หน้าสุด) |
| `cat.png` | แมวเงาดำนั่ง หันมองพระจันทร์ หูตั้ง หางขด — สไปรต์เดี่ยว | อยู่นิ่ง (หรือ idle 2-3 เฟรม ดู §6) |

**หัวใจ:** กระจกในไฟล์ `sash-*` ต้องเป็นสีทับ **โปร่งแสง** ไม่ใช่ทึบ
ตอนบานปิด → ฟ้ามัวลงนิดนึง / ตอนบานเลื่อนออก → ฟ้าสว่างเต็มในช่องที่เปิด

### สิ่งที่ปล่อยให้เป็นโค้ด ไม่ต้องวาด
- ผงลอน/ฝุ่นในอากาศ (motes) — CSS ทำถูกกว่า
- ป้าย "NANONC4 / welcome to the studio of / Creative Developer · Pixel Art · Mini Games" — เป็น text ฟอนต์พิกเซล (`--font-pixel`) อยู่แล้ว จะวาดเป็นรูปก็ได้แต่ไม่จำเป็น
- "scroll to open" + ลูกศร — text/CSS

---

## 4. ตำแหน่ง/สัดส่วนอ้างอิง (จากเวอร์ชันโค้ดปัจจุบัน)

ใช้เป็นไกด์ตอนวาด (ค่าเป็น % ของ canvas):

```
ช่องหน้าต่าง (WIN):  ซ้าย 5%   ขวา 95%   บน 4%   ล่าง 80%
ขอบหน้าต่าง (sill):  เริ่มที่ y = 80% ลงไปจนสุด
พระจันทร์:          ประมาณ x 34%, y 6-16%  (โตราว ⌀ 6% ของความกว้าง)
แมว:               ฐานอยู่บนเส้น sill (y≈80%), x กลางค่อนขวา ~52-64%,
                   สูงราว 20-24% ของ canvas
คานหน้าต่าง:        แนวตั้งกลาง 1 เส้น + แนวนอน 3 เส้น (แบ่งเป็น 4x4 ช่อง)
                   *เรฟจริงช่องกลางใหญ่ ช่องข้างแคบ — ปรับได้ตามใจ*
สกายไลน์:          กินความสูงราว 28-40% ล่างของช่องหน้าต่าง
```

ถ้าวาดคุมสัดส่วนนี้ เวลาสลับมาใช้รูปจะแทบไม่ต้องแก้โค้ดตำแหน่งเลย
(ถ้าจะวาดสัดส่วนใหม่ก็ได้ เดี๋ยวปรับ constant `WIN` กับตำแหน่ง `Cat` ให้)

---

## 5. EXPORT จาก ASEPRITE (gotcha: อย่าให้มัน trim)

Aseprite เวลา export layer เดี่ยวชอบตัดขอบให้พอดีรูป → **ตำแหน่งหาย**
ต้องให้ทุกไฟล์ออกมาขนาดเท่า canvas (480×270) เท่ากันหมด ตัวรูปอยู่ตำแหน่งจริง
ที่เหลือโปร่งใส

วิธี (เลือกอันใดอันหนึ่ง):
- **`File > Export Sprite Sheet`** → tab "Layout": เลือก **"Split Layers"**
  / ในบางเวอร์ชันคือ Source = "Layers", **ปิด "Trim Cels" และ "Trim Sprite"**
  → ได้ PNG ต่อ layer เต็ม canvas
- **`File > Save Copy As...`** ทีละครั้ง เปิด/ปิด visibility ของ layer เอง (ช้าแต่ชัวร์)
- Script "Export Layers" ที่ keep canvas size

ตั้งค่า:
- **Scale = 1x** (อย่า pre-scale — ไปขยายในเว็บ จะคุมความคมและ responsive ได้ดีกว่า)
- Format PNG, มี alpha
- ตั้งชื่อไฟล์ให้ตรง layer: `sky`, `sash-left`, `sash-right`, `sill`, `cat`

เก็บ layer "reference" (รูป reference / สกรีนช็อตเวอร์ชันปัจจุบัน) ไว้ล่างสุด
เป็นไกด์ ตั้งไม่ให้ export

---

## 6. ANIMATION — แบ่ง 3 แบบ

| อยากได้ | วิธี | ต้องวาดเฟรมเพิ่มไหม |
|---|---|---|
| บานเลื่อนแยก / เฟดเข้า hero | JS อ่านค่า scroll → CSS `transform`/`opacity` (โค้ดเดิม ไม่แตะ) | ไม่ |
| พระจันทร์ลอยเบาๆ, ดาวกะพริบ, ไฟเมืองกะพริบ, ผงลอย | CSS `@keyframes` บน `<img>` / element | ไม่ |
| หูแมวกระดิก, หางขยับ, ไฟนีออนวูบ | วาด 2-3 เฟรมใน Aseprite → `Export Sprite Sheet` เป็นแถบแนวนอน 1 ไฟล์ → CSS `animation: x .8s steps(3) infinite` เลื่อน `object-position` หรือ `background-position` | ใช่ (เฉพาะชิ้นนั้น) |

แนะนำเฟสแรก: วาด art นิ่งทั้งหมด แล้วใช้ CSS ขยับพระจันทร์/ดาวพอ
ค่อยทำ sprite sheet แมวกระดิกหูทีหลังถ้าอยากได้

---

## 7. SCALING / RESPONSIVE บนเว็บ

- Container เป็นกล่องอัตราส่วน `16/9` เต็ม viewport, ทุก `<img>` ใช้
  `object-fit: cover` + `image-rendering: pixelated`
  → พิกเซลไม่คมเป๊ะแบบ integer scale แต่ `pixelated` ทำให้ยังดูคมพอสำหรับ lofi
- อยากคมเป๊ะจริง = ขยายเป็นเท่าจำนวนเต็ม (×2 ×3 ×4) แล้ว center (จะมีขอบว่าง) —
  ส่วนใหญ่ hero ใช้ `cover` พอ
- **Safe zone:** เพราะ `cover` จะ crop ด้านที่อัตราส่วนไม่พอดี
  วาดพระจันทร์/แมว/บริเวณที่ป้ายจะไปวาง ให้ห่างขอบ canvas ทุกด้าน
  อย่างน้อย ~8-10%

---

## 8. เอาเข้าโปรเจกต์ (Next.js 16)

วางไฟล์:
```
public/welcome/sky.png
public/welcome/sash-left.png
public/welcome/sash-right.png
public/welcome/sill.png
public/welcome/cat.png
```

ใน `components/WelcomeWindow.tsx` แทน art เดิมด้วย layer ของ `<img>`:

```tsx
<div className="relative aspect-[16/9] w-full">
  <img src="/welcome/sky.png"        alt="" className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]" />
  <img src="/welcome/sash-left.png"  alt="" className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]" style={{ transform: `translateX(${-offset}%)` }} />
  <img src="/welcome/sash-right.png" alt="" className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]" style={{ transform: `translateX(${offset}%)` }} />
  <img src="/welcome/sill.png"       alt="" className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]" />
  <img src="/welcome/cat.png"        alt="" className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]" />
</div>
```

- ใช้ **`<img>` ธรรมดา ไม่ใช่ `next/image`** — `next/image` re-encode ทำพิกเซลเบลอ
  (ถ้าจะใช้จริงต้องใส่ prop `unoptimized`) โปรเจกต์นี้มี `<img>` อยู่แล้วหลายที่
  (`RetroBrowserFrame` ฯลฯ) eslint แค่เตือน `no-img-element` ไม่ error
- ทุก img ใส่ `[image-rendering:pixelated]`
- `inset-0` + ขนาดเท่ากันทุกไฟล์ = เรียงตรงอัตโนมัติ ไม่ต้องระบุตำแหน่งทีละอัน
- **logic scroll เดิมคงไว้ทั้งหมด**: ตัวแปร `offset`, `signOpacity`, `layerOpacity`,
  spacer `220vh`, portal ไป `document.body`, scroll listener — ไม่แตะ
  แค่เปลี่ยนส่วน "วาดอะไร" จาก `<div>` เป็น `<img>`

---

## 9. CHECKLIST ก่อนลงมือวาด

- [ ] ตั้ง canvas 480×270 (หรือ 640×360), 16:9
- [ ] โหลด/สร้าง palette โทนฟ้าพระจันทร์ ล็อกไว้
- [ ] ใส่ layer "reference" ไว้ล่างสุด (รูป reference + สกรีนช็อตปัจจุบัน)
- [ ] layer groups: `sky` / `sash-left` / `sash-right` / `sill` / `cat` (+ `frame` ถ้าจะแยก)
- [ ] วาดบานเลื่อนในตำแหน่ง "ปิดเต็มหน้าต่าง"
- [ ] กระจกบานเลื่อน = สีทับ **โปร่งแสง** (~45%) ไม่ใช่ทึบ
- [ ] พระจันทร์/แมว/พื้นที่ป้าย ห่างขอบ ≥ 8-10%
- [ ] ปิด anti-alias / trim ทุกอย่างตอน export, scale 1x, PNG+alpha
- [ ] ตั้งชื่อไฟล์ = ชื่อ layer

---

## 10. พอมีไฟล์แล้ว

บอกในแชท → จะแปลง `WelcomeWindow.tsx` จาก div-art เป็น img-layer ให้
โดยคงกลไก scroll / เฟด / portal เดิมไว้ครบ และปรับ constant `WIN` / ตำแหน่ง `Cat`
ให้ตรงกับสัดส่วนที่วาดจริง
