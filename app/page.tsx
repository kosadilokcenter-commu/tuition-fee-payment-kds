'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Noto_Sans_Thai } from 'next/font/google';
import { toBlob } from 'html-to-image';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
});

/* =========================
   Tuition Database
========================= */

const tuition = {
  มัธยมศึกษาปีที่_1: {
    enrollment: 35000,
    programs: {
      ทั่วไป: {
        semester: 85000,
        yearly: 170000,
      },
    },
  },

  มัธยมศึกษาปีที่_2: {
    enrollment: 35000,
    programs: {
      ทั่วไป: {
        semester: 85000,
        yearly: 170000,
      },
    },
  },

  มัธยมศึกษาปีที่_3: {
    enrollment: 35000,
    programs: {
      ทั่วไป: {
        semester: 85000,
        yearly: 170000,
      },
    },
  },

  มัธยมศึกษาปีที่_4: {
    enrollment: 45000,
    programs: {
      'วิทย์ - คณิต': {
        semester: 98000,
        yearly: 196000,
      },
      'ศิลป์ - คำนวณ': {
        semester: 92000,
        yearly: 184000,
      },
      'ศิลป์ - จีน': {
        semester: 92000,
        yearly: 184000,
      },
      'ศิลป์ - ญี่ปุ่น': {
        semester: 92000,
        yearly: 184000,
      },
      'ศิลป์ - ฝรั่งเศส': {
        semester: 92000,
        yearly: 184000,
      },
      'ศิลป์ - ทั่วไป': {
        semester: 88000,
        yearly: 176000,
      },
      'ศิลป์ - คหกรรม': {
        semester: 98000,
        yearly: 196000,
      },
    },
  },

  มัธยมศึกษาปีที่_5: {
    enrollment: 0,
    programs: {
      'วิทย์ - คณิต': {
        semester: 110000,
        yearly: 220000,
      },
      'ศิลป์ - คำนวณ': {
        semester: 105000,
        yearly: 210000,
      },
      'ศิลป์ - จีน': {
        semester: 105000,
        yearly: 210000,
      },
      'ศิลป์ - ญี่ปุ่น': {
        semester: 105000,
        yearly: 210000,
      },
      'ศิลป์ - ฝรั่งเศส': {
        semester: 105000,
        yearly: 210000,
      },
      'ศิลป์ - ทั่วไป': {
        semester: 98000,
        yearly: 196000,
      },
      'ศิลป์ - คหกรรม': {
        semester: 110000,
        yearly: 220000,
      },
    },
  },

  มัธยมศึกษาปีที่_6: {
    enrollment: 0,
    programs: {
      'วิทย์ - คณิต': {
        semester: 110000,
        yearly: 220000,
      },
      'ศิลป์ - คำนวณ': {
        semester: 105000,
        yearly: 210000,
      },
      'ศิลป์ - จีน': {
        semester: 105000,
        yearly: 210000,
      },
      'ศิลป์ - ญี่ปุ่น': {
        semester: 105000,
        yearly: 210000,
      },
      'ศิลป์ - ฝรั่งเศส': {
        semester: 105000,
        yearly: 210000,
      },
      'ศิลป์ - ทั่วไป': {
        semester: 98000,
        yearly: 196000,
      },
      'ศิลป์ - คหกรรม': {
        semester: 110000,
        yearly: 220000,
      },
    },
  },
} as const;

const levelLabel = {
  มัธยมศึกษาปีที่_1: 'มัธยมศึกษาปีที่ 1',
  มัธยมศึกษาปีที่_2: 'มัธยมศึกษาปีที่ 2',
  มัธยมศึกษาปีที่_3: 'มัธยมศึกษาปีที่ 3',
  มัธยมศึกษาปีที่_4: 'มัธยมศึกษาปีที่ 4',
  มัธยมศึกษาปีที่_5: 'มัธยมศึกษาปีที่ 5',
  มัธยมศึกษาปีที่_6: 'มัธยมศึกษาปีที่ 6',
};

export default function Home() {
  const receiptRef = useRef<HTMLDivElement>(null);

  /* =========================
     Student Data
  ========================= */

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');

  /* =========================
     Academic Data
  ========================= */

  const [level, setLevel] = useState<keyof typeof tuition>('มัธยมศึกษาปีที่_4');

  const [program, setProgram] = useState('วิทย์ - คณิต');

  const [firstEntry, setFirstEntry] = useState(false);

  /* =========================
     Extra Service
  ========================= */

  const [extra, setExtra] = useState({
    food: false,
    activity: false,
  });

  const [busZone, setBusZone] = useState<'none' | 'A' | 'B' | 'C'>('none');

  const [exporting, setExporting] = useState(false);

  /* =========================
     Calculate Price
  ========================= */

  const programList = Object.keys(tuition[level].programs);

  const basePrice = tuition[level].programs[program].semester;

  let admissionFee = 0;

  if (
    level === 'มัธยมศึกษาปีที่_1' ||
    level === 'มัธยมศึกษาปีที่_2' ||
    level === 'มัธยมศึกษาปีที่_3'
  ) {
    admissionFee = 35000;
  }

  if (level === 'มัธยมศึกษาปีที่_4' && firstEntry) {
    admissionFee = 45000;
  }

  const specialFee = 10000;

  let total = basePrice + specialFee + admissionFee;

  if (extra.food) total += 12000;
  if (extra.activity) total += 5000;

  if (busZone === 'A') total += 15000;
  if (busZone === 'B') total += 20000;
  if (busZone === 'C') total += 25000;

  const today = new Date().toLocaleDateString('th-TH');

  /* =========================
     Export Receipt JPG
  ========================= */

  const exportReceipt = async () => {
    if (!receiptRef.current) return;

    try {
      setExporting(true);

      await document.fonts.ready;

      const element = receiptRef.current;

      const width = element.offsetWidth;
      const height = element.scrollHeight;

      const blob = await toBlob(element, {
        quality: 0.95,
        backgroundColor: '#7A1A22',
        pixelRatio: 3,
        width,
        height,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          margin: '0',
          maxWidth: 'none',
        },
      });

      if (!blob) {
        throw new Error('ไม่สามารถสร้างไฟล์ใบเสร็จได้');
      }

      const fileName = `KDS-Receipt-${studentId || name || 'student'}.jpg`;

      const file = new File([blob], fileName, {
        type: 'image/jpeg',
      });

      /* =========================
         Mobile Share
      ========================= */

      if (
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) &&
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: 'KDS Receipt',
          text: 'ใบเสร็จค่าธรรมเนียมการศึกษา',
        });

        return;
      }

      /* =========================
         Desktop / Android Fallback
      ========================= */

      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = fileName;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error(error);

      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      alert('ไม่สามารถดาวน์โหลดใบเสร็จได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setExporting(false);
    }
  };

  return (
    <main
      className={`${notoSansThai.className} min-h-screen bg-[#F5F1E8] p-8 text-[#2D2926]`}
    >
      {/* =========================
          Minimal Header
      ========================= */}

      <header className="max-w-6xl mx-auto bg-[#7A1A22] rounded-2xl text-white">
        <div className="px-8 py-9 md:px-12 md:py-10">
          <div className="flex items-center gap-6">
            <div className="shrink-0">
              <Image
                src="/logo-kds.png"
                alt="KDS Logo"
                width={88}
                height={88}
                className="object-contain"
              />
            </div>

            <div className="h-14 w-px bg-white/20" />

            <div>
              <p className="text-xs md:text-sm text-white/60 tracking-[0.18em] mb-2">
                KOSADILOK DEMONSTRATION SCHOOL
              </p>

              <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
                ชำระค่าธรรมเนียมการศึกษา
              </h1>

              <p className="mt-2 text-sm md:text-base text-white/70">
                ภาคเรียนที่ 1 ปีการศึกษา 2569
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto mt-8 space-y-8">
        {/* =========================
            Student Info
        ========================= */}
        <section className="bg-white rounded-2xl p-6 border text-[#2D2926]">
          <h2 className="text-[#7A1A22] font-bold mb-4">Student Information</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border border-gray-300 bg-white text-[#2D2926] placeholder:text-gray-400 rounded-xl p-3 outline-none focus:border-[#7A1A22]"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border border-gray-300 bg-white text-[#2D2926] placeholder:text-gray-400 rounded-xl p-3 outline-none focus:border-[#7A1A22]"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
        </section>

        {/* =========================
            Academic Program
        ========================= */}
        <section className="bg-white rounded-2xl p-6 border text-[#2D2926]">
          <h2 className="text-[#7A1A22] font-bold mb-4">Academic Program</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              className="border border-gray-300 bg-white text-[#2D2926] rounded-xl p-3 outline-none focus:border-[#7A1A22]"
              value={level}
              onChange={(e) => {
                const value = e.target.value as keyof typeof tuition;

                setLevel(value);
                setProgram(Object.keys(tuition[value].programs)[0]);
              }}
            >
              {Object.keys(tuition).map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-white text-[#2D2926]"
                >
                  {levelLabel[item as keyof typeof levelLabel]}
                </option>
              ))}
            </select>

            <select
              className="border border-gray-300 bg-white text-[#2D2926] rounded-xl p-3 outline-none focus:border-[#7A1A22]"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            >
              {programList.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-white text-[#2D2926]"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          {level === 'มัธยมศึกษาปีที่_4' && (
            <label className="flex gap-3 mt-5 items-center text-[#2D2926]">
              <input
                type="checkbox"
                checked={firstEntry}
                onChange={(e) => setFirstEntry(e.target.checked)}
              />

              <span>นักเรียนใหม่ / ค่าสมัครแรกเข้า</span>
            </label>
          )}
        </section>

        {/* =========================
            Student Services & Facility Support
        ========================= */}
        <section className="bg-white rounded-2xl p-6 border text-[#2D2926]">
          <h2 className="text-[#7A1A22] font-bold mb-4">
            Student Services & Facility Support
          </h2>

          <div className="space-y-4">
            <label className="flex justify-between items-center border border-gray-200 bg-white rounded-xl p-4 text-[#2D2926]">
              <div>
                <p className="font-semibold text-[#2D2926]">
                  ค่าอาหารกลางวันและของว่าง
                </p>

                <p className="text-sm text-gray-500">12,000 บาท / ภาคเรียน</p>
              </div>

              <input
                type="checkbox"
                checked={extra.food}
                onChange={(e) =>
                  setExtra({
                    ...extra,
                    food: e.target.checked,
                  })
                }
              />
            </label>

            <label className="flex justify-between items-center border border-gray-200 bg-white rounded-xl p-4 text-[#2D2926]">
              <div>
                <p className="font-semibold text-[#2D2926]">
                  ค่าธรรมเนียมกิจกรรมและทัศนศึกษา
                </p>

                <p className="text-sm text-gray-500">5,000 บาท / ปีการศึกษา</p>
              </div>

              <input
                type="checkbox"
                checked={extra.activity}
                onChange={(e) =>
                  setExtra({
                    ...extra,
                    activity: e.target.checked,
                  })
                }
              />
            </label>

            <div className="border border-gray-200 bg-white rounded-xl p-4 text-[#2D2926]">
              <div className="mb-3">
                <p className="font-semibold text-[#2D2926]">
                  ค่าธรรมเนียมพัฒนาและบำรุงรักษาสถานศึกษา
                </p>

                <p className="text-sm text-gray-500">10,000 บาท / ปีการศึกษา</p>
              </div>
            </div>

            <select
              className="w-full border border-gray-300 bg-white text-[#2D2926] rounded-xl p-3 outline-none focus:border-[#7A1A22]"
              value={busZone}
              onChange={(e) =>
                setBusZone(e.target.value as 'none' | 'A' | 'B' | 'C')
              }
            >
              <option value="none" className="bg-white text-[#2D2926]">
                ค่าบริการรถรับ-ส่งนักเรียน
              </option>

              <option value="A" className="bg-white text-[#2D2926]">
                โซน A — 15,000 บาท / ภาคเรียน
              </option>

              <option value="B" className="bg-white text-[#2D2926]">
                โซน B — 20,000 บาท / ภาคเรียน
              </option>

              <option value="C" className="bg-white text-[#2D2926]">
                โซน C — 25,000 บาท / ภาคเรียน
              </option>
            </select>

            <p className="text-sm text-gray-500">
              (สามารถเลือกโซนได้ตามที่ต้องการ)
            </p>
          </div>
        </section>

        {/* =========================
            Total
        ========================= */}
        <section className="bg-[#7A1A22] text-white rounded-2xl p-8 text-center">
          <p className="text-white opacity-70">Total Amount</p>

          <h2 className="text-4xl font-bold text-white">
            {total.toLocaleString()} THB
          </h2>
        </section>

        {/* =========================
            Receipt
        ========================= */}
        <div className="flex justify-center">
          <section
            ref={receiptRef}
            className="w-[448px] bg-[#7A1A22] rounded-2xl p-8"
          >
            <div className="bg-white rounded-xl overflow-hidden text-[#2D2926]">
              <div className="text-center px-6 pt-8 pb-5">
                <Image
                  src="/logo-kds.png"
                  alt="KDS Logo"
                  width={140}
                  height={140}
                  className="mx-auto mb-3 object-contain"
                />

                <h3 className="font-bold text-[#7A1A22]">
                  KOSADILOK
                  <br />
                  DEMONSTRATION SCHOOL
                </h3>

                <p className="text-xs text-gray-500 mt-2">
                  Official Tuition Receipt
                </p>
              </div>

              <div className="border-t border-gray-200 mx-5" />

              <div className="px-6 py-5 text-[#2D2926]">
                <h2 className="text-xl font-bold text-[#2D2926]">
                  ค่าเล่าเรียนการศึกษา
                </h2>

                <div className="flex justify-between text-sm mt-3 text-[#2D2926]">
                  <span>วันที่ชำระ</span>
                  <span>{today}</span>
                </div>

                <div className="text-sm mt-4 space-y-2 text-[#2D2926]">
                  <p>เลขประจำตัวนักเรียน</p>
                  <b>{studentId || '-'}</b>

                  <p>ชื่อ-นามสกุล</p>
                  <b>{name || '-'}</b>

                  <p>ระดับชั้น</p>
                  <b>{levelLabel[level]}</b>
                </div>

                <div className="border-t border-gray-200 my-5" />

                <div className="space-y-3 text-sm text-[#2D2926]">
                  <div className="flex justify-between gap-4">
                    <span>ค่าเล่าเรียนปกติ</span>
                    <span>{basePrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>ค่าธรรมเนียมพัฒนาและบำรุงรักษาสถานศึกษา</span>

                    <span>10,000</span>
                  </div>

                  {admissionFee > 0 && (
                    <div className="flex justify-between gap-4">
                      <span>ค่าสมัครแรกเข้า</span>
                      <span>{admissionFee.toLocaleString()}</span>
                    </div>
                  )}

                  {extra.food && (
                    <div className="flex justify-between gap-4">
                      <span>ค่าอาหารกลางวันและของว่าง</span>
                      <span>12,000</span>
                    </div>
                  )}

                  {extra.activity && (
                    <div className="flex justify-between gap-4">
                      <span>ค่าธรรมเนียมกิจกรรมและทัศนศึกษา</span>
                      <span>5,000</span>
                    </div>
                  )}

                  {busZone === 'A' && (
                    <div className="flex justify-between gap-4">
                      <span>ค่าบริการรถรับ-ส่งนักเรียน โซน A</span>
                      <span>15,000</span>
                    </div>
                  )}

                  {busZone === 'B' && (
                    <div className="flex justify-between gap-4">
                      <span>ค่าบริการรถรับ-ส่งนักเรียน โซน B</span>
                      <span>20,000</span>
                    </div>
                  )}

                  {busZone === 'C' && (
                    <div className="flex justify-between gap-4">
                      <span>ค่าบริการรถรับ-ส่งนักเรียน โซน C</span>
                      <span>25,000</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 mt-6 pt-5 flex justify-between font-bold text-[#2D2926]">
                  <span>รวมเป็นจำนวนเงิน</span>

                  <span className="text-xl text-[#7A1A22]">
                    {total.toLocaleString()}
                  </span>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                  ชำระเงินโดยระบบอัตโนมัติ
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* =========================
            Export Receipt
        ========================= */}
        <div className="flex justify-center">
          <button
            onClick={exportReceipt}
            disabled={exporting}
            className="bg-[#7A1A22] text-white px-8 py-3 rounded-xl font-bold"
          >
            {exporting ? 'Exporting...' : 'Download Receipt'}
          </button>
        </div>
      </div>
    </main>
  );
}
