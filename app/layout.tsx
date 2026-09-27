import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KDS Tuition Fee Payment',
  description: 'ระบบจำลองการชำระค่าธรรมเนียมการศึกษา คอมมูนิตี้ KDS',
  icons: {
    icon: '/logo-kds.png',
    shortcut: '/logo-kds.png',
    apple: '/logo-kds.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
