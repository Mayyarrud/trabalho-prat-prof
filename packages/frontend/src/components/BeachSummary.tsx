import BeachIllustration from "@/components/BeachIllustration";
import type { Beach } from "@/models/beach";

export default function BeachSummary({ beach }: { beach: Beach }) {
  const mapUrl = `https://www.google.com/maps?q=${beach.latitude},${beach.longitude}`;

  return (
    <section className="overflow-hidden rounded-2xl bg-[#FFFDF2]">
      <BeachIllustration className="h-[190px]" />

      <div className="p-5">
        <h1 className="text-xl font-semibold">{beach.name}</h1>
        <p className="mt-2 text-xs text-[#6B665C]">
          Latitude {beach.latitude.toFixed(4)} · Longitude{" "}
          {beach.longitude.toFixed(4)}
        </p>
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-full bg-[#E9E2FF] px-4 py-2 text-xs font-medium transition hover:bg-[#CDB4FF]"
        >
          Ver no mapa
        </a>
      </div>
    </section>
  );
}
