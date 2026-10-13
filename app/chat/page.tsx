import type { Metadata } from "next";
import Link from "next/link";
import ChatForm from "@/components/ChatForm";

export const metadata: Metadata = {
  title: "Ruang Tanya — StudyMate",
  description: "Tanyakan materi kuliahmu dan dapatkan penjelasan singkat dari StudyMate.",
};

export default function ChatPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ===== Header ringkas: logo + jalan kembali ke beranda ===== */}
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-clay font-display text-lg font-bold text-cream">
            S
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">StudyMate</span>
        </Link>

        <Link
          href="/"
          className="rounded-full border border-ink/20 px-4 py-2 text-sm font-medium transition-colors hover:border-clay hover:text-clay"
        >
          ← Kembali
        </Link>
      </header>

      {/* ===== Judul halaman ===== */}
      <section className="mx-auto w-full max-w-3xl px-6 pt-2 pb-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-olive-soft px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-olive-dark uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          Ruang tanya
        </span>

        <h1 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
          Tanya apa saja soal kuliahmu
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
          Tulis pertanyaan, lalu StudyMate menjawab dengan bahasa yang mudah dipahami. Percakapan
          hanya tersimpan di halaman ini dan hilang saat kamu memuat ulang.
        </p>

        {/* Catatan kecil soal batas panjang pertanyaan. */}
        <p className="mt-3 text-xs text-ink-soft">
          Maksimal 1000 karakter per pertanyaan, jawaban dibatasi 500 token agar hemat biaya.
        </p>

        <div className="mt-8">
          <ChatForm />
        </div>
      </section>
    </div>
  );
}
