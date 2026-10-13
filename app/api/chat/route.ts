import OpenAI from "openai";
import { ambilKonfigurasiLLM } from "@/lib/llm";

// Batas panjang pertanyaan (karakter) dan panjang jawaban (token).
// Tujuannya supaya biaya pemakaian AI tetap terkendali.
const BATAS_KARAKTER = 1000;
const BATAS_TOKEN = 500;

// Gaya jawaban StudyMate. Ubah kalimat ini kalau ingin nada jawaban yang berbeda.
const PROMPT_SISTEM =
  "Kamu adalah StudyMate, asisten belajar untuk mahasiswa Indonesia. " +
  "Jawab dengan bahasa Indonesia yang jelas, ringkas, dan ramah. " +
  "Pakai contoh sederhana bila membantu, dan jujur bila kamu tidak yakin.";

// Membuat balasan JSON berisi pesan error yang ramah untuk pengguna.
function galat(pesan: string, status: number) {
  return Response.json({ error: pesan }, { status });
}

// POST /api/chat -> menerima { pesan } lalu mengembalikan { jawaban }.
// Route ini berjalan di server, jadi API key tidak pernah sampai ke browser.
export async function POST(request: Request) {
  // 1. Baca isi permintaan.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return galat("Format permintaan tidak dikenali.", 400);
  }

  const pesan = (body as { pesan?: unknown } | null)?.pesan;

  // 2. Validasi panjang dan isi pesan.
  if (typeof pesan !== "string" || pesan.trim().length === 0) {
    return galat("Tulis pertanyaan dulu ya.", 400);
  }

  if (pesan.length > BATAS_KARAKTER) {
    return galat(
      `Pertanyaan terlalu panjang, maksimal ${BATAS_KARAKTER} karakter.`,
      400,
    );
  }

  // 3. Pastikan konfigurasi AI sudah lengkap.
  const konfigurasi = ambilKonfigurasiLLM();

  if (!konfigurasi) {
    // Detail teknis hanya muncul di terminal server, bukan di browser pengguna.
    console.error(
      "Konfigurasi LLM belum lengkap. Isi LLM_BASE_URL, LLM_API_KEY, dan LLM_MODEL di .env.local",
    );
    return galat("Fitur AI belum dikonfigurasi. Hubungi pengelola ya.", 500);
  }

  // 4. Minta jawaban ke LLM.
  try {
    const hasil = await konfigurasi.client.chat.completions.create({
      model: konfigurasi.model,
      messages: [
        { role: "system", content: PROMPT_SISTEM },
        { role: "user", content: pesan.trim() },
      ],
      max_tokens: BATAS_TOKEN,
      temperature: 0.7,
    });

    const jawaban = hasil.choices[0]?.message?.content?.trim();

    if (!jawaban) {
      console.error("LLM membalas tanpa isi:", hasil.choices[0]?.finish_reason);
      return galat("Model tidak memberi jawaban. Coba tanyakan dengan cara lain.", 502);
    }

    return Response.json({ jawaban });
  } catch (error) {
    // Pesan asli dari penyedia hanya dicatat di server supaya tidak bocor ke browser.
    console.error("Gagal memanggil LLM:", error);

    if (error instanceof OpenAI.APIError) {
      if (error.status === 401 || error.status === 403) {
        return galat("Kunci API sepertinya salah. Hubungi pengelola ya.", 500);
      }
      if (error.status === 429) {
        return galat("Permintaan sedang penuh. Tunggu sebentar lalu coba lagi.", 429);
      }
    }

    // Gagal tersambung / kehabisan waktu.
    if (error instanceof OpenAI.APIConnectionError) {
      return galat("Server AI sedang tidak bisa dihubungi. Coba lagi sebentar lagi.", 504);
    }

    return galat("Ada gangguan di server. Coba lagi ya.", 500);
  }
}