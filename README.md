# StudyMate

Web asisten belajar berbasis AI untuk mahasiswa.

Rencana fitur:

- **Tanya Dokumen** — unggah materi kuliah (PDF/slide), lalu tanya jawab isinya.
- **Ringkasan Otomatis** — materi panjang dipadatkan jadi poin penting.
- **Kuis Otomatis** — soal latihan dibuat dari materi sendiri.

## Teknologi

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4 (tema diatur di `app/globals.css` lewat `@theme`, bukan `tailwind.config.js`)

## Menjalankan di komputer sendiri

```bash
npm run dev
```

Lalu buka [http://localhost:3000](http://localhost:3000) di browser.
Halaman akan otomatis diperbarui setiap kali file disimpan.

## Perintah lain

```bash
npm run build   # cek apakah project siap dirilis (wajib dijalankan sebelum dianggap selesai)
npm start       # menjalankan hasil build
npm run lint    # memeriksa gaya penulisan kode
```

## Struktur file penting

```
app/layout.tsx        # kerangka halaman + font + judul tab browser
app/page.tsx          # halaman landing (hero, 3 kartu fitur, footer)
app/globals.css       # palet warna earthy + gaya dasar
components/FeatureCard.tsx  # kartu fitur
components/FeatureIcon.tsx  # ikon garis untuk kartu fitur
```

## Soal API key (penting)

- **Jangan pernah** menulis API key langsung di dalam kode.
- Simpan di file `.env.local` (file ini sudah diabaikan git, jadi tidak akan ikut terkirim ke GitHub).
- Nama variabel yang dibutuhkan didokumentasikan di `.env.example` (isinya kosong, hanya contoh nama).
