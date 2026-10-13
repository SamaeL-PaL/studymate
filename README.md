# StudyMate

Web asisten belajar berbasis AI untuk mahasiswa.

Rencana fitur:

- **Tanya Dokumen** — unggah materi kuliah (PDF/slide), lalu tanya jawab isinya.
- **Ringkasan Otomatis** — materi panjang dipadatkan jadi poin penting.
- **Kuis Otomatis** — soal latihan dibuat dari materi sendiri.

Sudah jadi:

- **Chat sederhana** — halaman `/chat` untuk bertanya langsung ke LLM (lihat bagian
  [Fitur chat](#fitur-chat-chat) di bawah).

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
app/chat/page.tsx     # halaman chat /chat
app/api/chat/route.ts # API route di server yang memanggil LLM
app/globals.css       # palet warna earthy + gaya dasar
components/ChatForm.tsx     # kotak input + area jawaban chat
components/FeatureCard.tsx  # kartu fitur
components/FeatureIcon.tsx  # ikon garis untuk kartu fitur
lib/llm.ts            # pembuat client OpenAI (baca environment variable)
```

## Fitur chat (/chat)

Halaman `/chat` punya kotak input dan area jawaban. Alurnya:

```text
Browser -> POST /api/chat -> SDK "openai" (baseURL kustom) -> server LLM
```

API key **hanya** hidup di server (di dalam `app/api/chat/route.ts`), jadi tidak pernah
sampai ke browser.

### Cara mengaktifkannya

1. Salin `.env.example` menjadi `.env.local` (kalau belum ada).
2. Isi tiga variabel berikut. Nilainya didapat dari penyedia LLM pilihanmu
   (OpenAI, OpenRouter, Groq, LM Studio, dan lain-lain — asal formatnya kompatibel
   dengan OpenAI).

   ```bash
   LLM_BASE_URL=https://api.openai.com/v1
   LLM_API_KEY=isi-kunci-rahasiamu-di-sini
   LLM_MODEL=gpt-4o-mini
   ```

3. Simpan, lalu jalankan `npm run dev` dan buka [http://localhost:3000/chat](http://localhost:3000/chat).

### Batas yang sudah dipasang

- Pertanyaan maksimal **1000 karakter** (dicek di browser dan di server).
- Jawaban maksimal **500 token** (`max_tokens`), supaya biaya tetap kecil.
- Kalau gagal, pengguna melihat pesan ramah berbahasa Indonesia, bukan pesan error teknis.

### Yang belum ada

- Riwayat percakapan belum disimpan; memuat ulang halaman akan menghapusnya.
- Model hanya membaca pertanyaan terbaru, jadi ia belum "ingat" pertanyaan sebelumnya.
- Belum ada login atau pembatas jumlah permintaan.

## Soal API key (penting)

- **Jangan pernah** menulis API key langsung di dalam kode.
- Simpan di file `.env.local` (file ini sudah diabaikan git, jadi tidak akan ikut terkirim ke GitHub).
- Nama variabel yang dibutuhkan didokumentasikan di `.env.example` (isinya kosong, hanya contoh nama).
- Untuk fitur chat, variabelnya adalah `LLM_BASE_URL`, `LLM_API_KEY`, dan `LLM_MODEL`.
- Jangan memakai awalan `NEXT_PUBLIC_` untuk API key. Variabel dengan awalan itu akan
  otomatis ikut terkirim ke browser dan bisa dilihat siapa pun.
