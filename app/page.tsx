import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";

// Data 3 fitur utama StudyMate.
// Kalau mau menambah atau mengubah kartu, cukup ubah daftar ini.
const FITUR = [
  {
    nomor: "01",
    judul: "Tanya Dokumen",
    deskripsi:
      "Unggah PDF, slide, atau catatan kuliah lalu tanyakan apa saja. Jawabannya disertai rujukan halaman, jadi kamu bisa cek sendiri.",
    ikon: "dokumen",
    tone: "clay",
  },
  {
    nomor: "02",
    judul: "Ringkasan Otomatis",
    deskripsi:
      "Materi 40 halaman dipadatkan jadi poin-poin penting yang gampang dibaca sebelum kelas atau saat mengulang ujian.",
    ikon: "ringkasan",
    tone: "paper",
  },
  {
    nomor: "03",
    judul: "Kuis Otomatis",
    deskripsi:
      "StudyMate menyusun soal latihan dari materimu sendiri, lengkap dengan kunci jawaban dan pembahasan singkat.",
    ikon: "kuis",
    tone: "olive",
  },
] as const;

// Satu kalimat penjelasan yang dipakai di bagian paling atas halaman.
const PENJELASAN =
  "Asisten belajar berbasis AI untuk mahasiswa: tanya isi dokumen kuliahmu, dapatkan ringkasan otomatis, lalu uji pemahaman dengan kuis.";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ===== Header: nama aplikasi + navigasi singkat ===== */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-clay font-display text-lg font-bold text-cream">
            S
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">StudyMate</span>
        </div>

        <nav className="hidden items-center gap-7 text-sm text-ink-soft sm:flex">
          <a href="#fitur" className="transition-colors hover:text-clay">
            Fitur
          </a>
          <a href="#tentang" className="transition-colors hover:text-clay">
            Tentang
          </a>
        </nav>

        {/* Tautan ke halaman chat. */}
        <Link
          href="/chat"
          className="rounded-full border border-ink/20 px-4 py-2 text-sm font-medium transition-colors hover:border-clay hover:text-clay"
        >
          Coba gratis
        </Link>
      </header>

      {/* ===== Hero: judul besar + satu kalimat penjelasan ===== */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pt-8 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-olive-soft px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-olive-dark uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            Untuk mahasiswa
          </span>

          <h1 className="mt-6 font-display text-6xl leading-[0.92] font-semibold tracking-tight sm:text-7xl lg:text-8xl">
            StudyMate
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{PENJELASAN}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/chat"
              className="rounded-full bg-clay px-6 py-3.5 text-sm font-semibold text-cream shadow-[4px_4px_0_0_var(--clay-dark)] transition-transform hover:-translate-y-0.5"
            >
              Mulai belajar
            </Link>
            <a
              href="#fitur"
              className="rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-ink/50"
            >
              Lihat fitur
            </a>
          </div>
        </div>

        {/* Hiasan: tumpukan catatan, dibuat dari CSS (tanpa file gambar). */}
        <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          <div className="absolute top-6 -left-2 h-56 w-full -rotate-6 rounded-2xl bg-olive/25" />
          <div className="absolute top-3 left-3 h-56 w-full rotate-3 rounded-2xl bg-clay-soft" />

          <div className="relative rounded-2xl border border-ink/10 bg-cream p-6 shadow-[10px_10px_0_0_rgba(43,39,35,0.08)]">
            <p className="text-xs font-semibold tracking-[0.16em] text-ink-soft uppercase">
              Ringkasan · Bab 3
            </p>
            <div className="mt-5 space-y-3">
              {["88%", "70%", "80%", "54%"].map((lebar) => (
                <span
                  key={lebar}
                  className="block h-2.5 rounded-full bg-ink/10"
                  style={{ width: lebar }}
                />
              ))}
            </div>
            <span className="absolute -right-3 -bottom-4 rounded-xl bg-olive px-4 py-2.5 text-xs font-semibold text-cream shadow-md">
              Kuis siap · 10 soal
            </span>
          </div>
        </div>
      </section>
      {/* ===== Tiga kartu fitur ===== */}
      <section id="fitur" className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-clay uppercase">Fitur</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Tiga hal yang bikin belajar lebih ringan
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            Semua fitur bekerja dari dokumen yang kamu unggah sendiri, jadi isinya selalu sesuai
            materi kelasmu.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FITUR.map((fitur) => (
            <FeatureCard
              key={fitur.nomor}
              nomor={fitur.nomor}
              judul={fitur.judul}
              deskripsi={fitur.deskripsi}
              ikon={fitur.ikon}
              tone={fitur.tone}
            />
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer id="tentang" className="mt-auto bg-ink text-sand">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-clay font-display text-lg font-bold text-cream">
              S
            </span>
            <div>
              <p className="font-display text-lg font-semibold">StudyMate</p>
              <p className="text-xs text-sand/60">
                Dibuat untuk mahasiswa yang ingin belajar efisien.
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-6 text-sm text-sand/75">
            <a href="#fitur" className="transition-colors hover:text-cream">
              Fitur
            </a>
            <a href="mailto:halo@studymate.id" className="transition-colors hover:text-cream">
              Kontak
            </a>
          </nav>

          <p className="text-xs text-sand/50">© 2026 StudyMate</p>
        </div>
      </footer>
    </div>
  );
}
