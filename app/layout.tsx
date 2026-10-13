import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Fraunces = judul (serif hangat), Plus Jakarta Sans = teks isi (bersih).
// next/font mengunduh font saat build lalu menyimpannya, jadi halaman tetap cepat.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Info yang muncul di tab browser dan hasil pencarian Google.
export const metadata: Metadata = {
  title: "StudyMate — Asisten belajar berbasis AI untuk mahasiswa",
  description:
    "StudyMate membaca dokumen kuliahmu, membuat ringkasan otomatis, dan menyusun kuis latihan. Semua di satu tempat.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
