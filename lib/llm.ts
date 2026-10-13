import OpenAI from "openai";

// Satu client OpenAI dipakai ulang oleh semua permintaan.
// Opsi "baseURL" membuat SDK resmi OpenAI ini bisa dipakai untuk penyedia apa pun
// yang formatnya kompatibel dengan OpenAI (OpenRouter, Groq, LM Studio, dan lain-lain).

type KonfigurasiLLM = {
  client: OpenAI;
  model: string;
};

// Membaca konfigurasi LLM dari environment variable.
// Mengembalikan null kalau ada yang belum diisi, supaya pemanggil bisa
// memberi pesan ramah alih-alih membuat aplikasi error.
export function ambilKonfigurasiLLM(): KonfigurasiLLM | null {
  // Ketiga variabel ini sengaja TANPA awalan NEXT_PUBLIC_,
  // jadi nilainya tidak pernah ikut terkirim ke browser.
  const apiKey = process.env.LLM_API_KEY;
  const baseURL = process.env.LLM_BASE_URL;
  const model = process.env.LLM_MODEL;

  if (!apiKey || !baseURL || !model) {
    return null;
  }

  return {
    client: new OpenAI({ apiKey, baseURL }),
    model,
  };
}