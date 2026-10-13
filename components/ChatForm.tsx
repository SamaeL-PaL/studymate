"use client";

import { useEffect, useRef, useState } from "react";

// Satu baris percakapan: siapa yang bicara + isi teksnya.
type Peran = "user" | "ai" | "error";

type Bubble = {
  id: number;
  peran: Peran;
  teks: string;
};

// Batas panjang pertanyaan. Harus sama dengan batas di app/api/chat/route.ts.
const BATAS_KARAKTER = 1000;

// Gaya tiap jenis bubble. Sudutnya dibuat asimetris supaya terasa seperti
// sobekan catatan, bukan kartu putih seragam.
const GAYA: Record<Peran, { wrapper: string; bubble: string }> = {
  user: {
    wrapper: "justify-end",
    bubble:
      "bg-clay text-cream rounded-[1.25rem_1.25rem_0.35rem_1.25rem] border-clay-dark/40",
  },
  ai: {
    wrapper: "justify-start",
    bubble:
      "bg-cream text-ink rounded-[1.25rem_1.25rem_1.25rem_0.35rem] border-ink/15 shadow-[6px_6px_0_0_rgba(43,39,35,0.07)]",
  },
  error: {
    wrapper: "justify-start",
    bubble:
      "bg-clay-soft text-clay-dark rounded-[1.25rem_1.25rem_1.25rem_0.35rem] border-clay/30",
  },
};

// Label kecil di atas tiap bubble.
const LABEL: Record<Peran, string> = {
  user: "Kamu",
  ai: "StudyMate",
  error: "Gagal terkirim",
};

export default function ChatForm() {
  const [percakapan, setPercakapan] = useState<Bubble[]>([]);
  const [pertanyaan, setPertanyaan] = useState("");
  const [sedangProses, setSedangProses] = useState(false);

  // Titik tujuan gulir otomatis di bagian bawah daftar percakapan.
  const dasarPercakapan = useRef<HTMLDivElement>(null);

  // Setiap kali percakapan bertambah atau AI selesai menulis, gulir ke bawah.
  useEffect(() => {
    dasarPercakapan.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [percakapan, sedangProses]);

  // Nomor unik untuk tiap bubble (waktu + angka acak).
  function idBaru() {
    return Date.now() + Math.random();
  }

  async function kirim(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isi = pertanyaan.trim();
    if (!isi || sedangProses) return;

    // 1. Tampilkan pertanyaan pengguna lebih dulu supaya terasa responsif.
    setPercakapan((lama) => [...lama, { id: idBaru(), peran: "user", teks: isi }]);
    setPertanyaan("");
    setSedangProses(true);

    try {
      // 2. Kirim HANYA pertanyaan terbaru ke server.
      const respons = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pesan: isi }),
      });

      const data: { jawaban?: string; error?: string } = await respons.json();

      if (!respons.ok || !data.jawaban) {
        // 3. Kalau gagal, tampilkan pesan ramah yang dikirim server.
        setPercakapan((lama) => [
          ...lama,
          {
            id: idBaru(),
            peran: "error",
            teks: data.error ?? "Ada gangguan di server. Coba lagi ya.",
          },
        ]);
        return;
      }

      setPercakapan((lama) => [
        ...lama,
        { id: idBaru(), peran: "ai", teks: data.jawaban as string },
      ]);
    } catch {
      // Gagal jaringan (misalnya internet mati atau server dimatikan).
      setPercakapan((lama) => [
        ...lama,
        {
          id: idBaru(),
          peran: "error",
          teks: "Tidak bisa menghubungi server. Periksa koneksimu lalu coba lagi.",
        },
      ]);
    } finally {
      setSedangProses(false);
    }
  }

  const sisaKarakter = BATAS_KARAKTER - pertanyaan.length;
  const tombolMati = sedangProses || pertanyaan.trim().length === 0;

  return (
    <div className="flex flex-col gap-5">
      {/* ===== Area percakapan ===== */}
      <div
        aria-live="polite"
        className="flex h-[26rem] flex-col gap-4 overflow-y-auto rounded-[1.5rem] border border-ink/15 bg-sand/60 p-5 sm:h-[30rem]"
      >
        {/* Tampilan awal sebelum ada pertanyaan. */}
        {percakapan.length === 0 && !sedangProses && (
          <div className="m-auto max-w-sm text-center">
            <p className="font-display text-lg font-semibold">Belum ada percakapan</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Coba tulis pertanyaan seperti &ldquo;Jelaskan hukum Newton dengan bahasa
              sederhana&rdquo; atau &ldquo;Buat 3 contoh soal turunan beserta jawabannya&rdquo;.
            </p>
          </div>
        )}

        {/* Semua bubble percakapan. */}
        {percakapan.map((baris) => (
          <div key={baris.id} className={`flex ${GAYA[baris.peran].wrapper}`}>
            <div className={`max-w-[85%] border px-4 py-3 ${GAYA[baris.peran].bubble}`}>
              <p
                className={`text-[0.68rem] font-semibold tracking-[0.14em] uppercase ${
                  baris.peran === "user" ? "text-cream/60" : "opacity-55"
                }`}
              >
                {LABEL[baris.peran]}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed whitespace-pre-wrap">{baris.teks}</p>
            </div>
          </div>
        ))}

        {/* Penanda bahwa AI masih menulis. */}
        {sedangProses && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-[1.25rem_1.25rem_1.25rem_0.35rem] border border-ink/15 bg-cream px-4 py-3">
              <p className="text-[0.68rem] font-semibold tracking-[0.14em] opacity-55 uppercase">
                StudyMate
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-sm text-ink-soft">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-olive" />
                Sedang menulis…
              </p>
            </div>
          </div>
        )}

        {/* Titik tujuan gulir otomatis, tidak terlihat di layar. */}
        <div ref={dasarPercakapan} />
      </div>

      {/* ===== Kotak input ===== */}
      <form onSubmit={kirim} className="flex flex-col gap-3">
        <textarea
          value={pertanyaan}
          onChange={(event) => setPertanyaan(event.target.value)}
          maxLength={BATAS_KARAKTER}
          rows={3}
          placeholder="Tulis pertanyaanmu di sini…"
          aria-label="Pertanyaan untuk StudyMate"
          className="w-full resize-none rounded-[1.25rem] border border-ink/20 bg-cream px-4 py-3 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-clay"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Penghitung karakter supaya batas panjangnya terlihat jelas. */}
          <p
            className={`text-xs tabular-nums ${
              sisaKarakter < 100 ? "font-semibold text-clay" : "text-ink-soft"
            }`}
          >
            {pertanyaan.length}/{BATAS_KARAKTER} karakter
          </p>

          <button
            type="submit"
            disabled={tombolMati}
            className="rounded-full bg-clay px-6 py-3 text-sm font-semibold text-cream shadow-[3px_3px_0_0_var(--clay-dark)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:hover:translate-y-0"
          >
            {sedangProses ? "Mengirim…" : "Kirim pertanyaan"}
          </button>
        </div>
      </form>

      {/* Catatan jujur: hanya pertanyaan terbaru yang dibaca model. */}
      <p className="text-xs leading-relaxed text-ink-soft">
        Percakapan lama tetap terlihat di layar, tetapi model hanya membaca pertanyaan terbaru.
      </p>
    </div>
  );
}
