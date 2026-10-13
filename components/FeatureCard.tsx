import FeatureIcon, { type NamaIkon } from "@/components/FeatureIcon";

// Tiga "tone" (gaya warna) kartu. Dipakai agar 3 kartu tidak terlihat seragam.
export type Tone = "clay" | "paper" | "olive";

type Props = {
  nomor: string; // nomor urut, misalnya "01"
  judul: string;
  deskripsi: string;
  ikon: NamaIkon;
  tone: Tone;
};

// Warna, bentuk sudut, dan kemiringan tiap tone.
const TONE: Record<Tone, { kartu: string; ikonKotak: string; nomor: string }> = {
  clay: {
    kartu:
      "bg-clay text-cream border-clay-dark/50 rounded-[1.75rem_0.4rem_1.75rem_1.75rem] -rotate-1 hover:rotate-0",
    ikonKotak: "bg-cream/15 text-cream",
    nomor: "text-cream/45",
  },
  paper: {
    kartu:
      "bg-cream text-ink border-ink/15 rounded-[1.25rem] shadow-[8px_8px_0_0_rgba(43,39,35,0.08)]",
    ikonKotak: "bg-clay-soft text-clay-dark",
    nomor: "text-clay/45",
  },
  olive: {
    kartu:
      "bg-olive text-cream border-olive-dark/50 rounded-[1.75rem_1.75rem_1.75rem_0.4rem] rotate-1 hover:rotate-0",
    ikonKotak: "bg-cream/15 text-cream",
    nomor: "text-cream/45",
  },
};

export default function FeatureCard({ nomor, judul, deskripsi, ikon, tone }: Props) {
  const gaya = TONE[tone];

  return (
    <article
      className={`flex flex-col border p-7 transition-transform duration-300 hover:-translate-y-1.5 ${gaya.kartu}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={`grid h-12 w-12 place-items-center rounded-xl ${gaya.ikonKotak}`}>
          <FeatureIcon nama={ikon} />
        </span>
        <span className={`font-display text-2xl font-semibold ${gaya.nomor}`}>{nomor}</span>
      </div>

      <h3 className="mt-7 font-display text-2xl font-semibold tracking-tight">{judul}</h3>

      {/* Di kartu kertas teksnya gelap, di kartu berwarna teksnya terang. */}
      <p
        className={`mt-3 text-sm leading-relaxed ${
          tone === "paper" ? "text-ink-soft" : "text-cream/80"
        }`}
      >
        {deskripsi}
      </p>
    </article>
  );
}
