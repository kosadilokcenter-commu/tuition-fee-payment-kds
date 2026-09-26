import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KDS Tuition Fee Payment',
  description: 'ระบบจำลองการชำระค่าธรรมเนียมการศึกษา คอมมูนิตี้ KDS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/logo-kds.png" type="image/png" />
        <link rel="shortcut icon" href="/logo-kds.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-kds.png" />
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
