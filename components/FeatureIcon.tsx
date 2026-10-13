// Ikon garis sederhana buatan sendiri (tanpa library tambahan).
// Warnanya mengikuti teks induknya karena memakai "currentColor".
export type NamaIkon = "dokumen" | "ringkasan" | "kuis";

export default function FeatureIcon({ nama }: { nama: NamaIkon }) {
  // Atribut yang sama untuk semua ikon supaya tampilannya konsisten.
  const dasar = {
    className: "h-6 w-6",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  // Balon percakapan = fitur tanya jawab dokumen.
  if (nama === "dokumen") {
    return (
      <svg {...dasar}>
        <path d="M4.5 6.2A1.7 1.7 0 0 1 6.2 4.5h8.1a1.7 1.7 0 0 1 1.7 1.7v6.6a1.7 1.7 0 0 1-1.7 1.7H9l-4.5 3.6z" />
        <path d="M8.2 8.4h5.9" />
        <path d="M8.2 11.6h3.6" />
      </svg>
    );
  }

  // Baris makin pendek = materi dipadatkan jadi ringkasan.
  if (nama === "ringkasan") {
    return (
      <svg {...dasar}>
        <path d="M4.5 6.5h15" />
        <path d="M4.5 11.5h10.5" />
        <path d="M4.5 16.5h6" />
        <path d="M17.5 14.2l3 3-3 3" />
      </svg>
    );
  }

  // Daftar dengan centang = soal kuis.
  return (
    <svg {...dasar}>
      <path d="M4.2 7.6l1.5 1.5 2.8-3" />
      <path d="M12 7.6h7.8" />
      <path d="M4.2 16.6l1.5 1.5 2.8-3" />
      <path d="M12 16.6h7.8" />
    </svg>
  );
}
