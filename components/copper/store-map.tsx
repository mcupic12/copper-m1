import { MapPinIcon } from "lucide-react";
import { MascotSays } from "@/components/copper/mascot-says";

// The (fictional) store, on an OpenStreetMap embed: no API key or account.
const STORE = {
  name: "Copper State Labs Pyongyang store",
  area: "Near Kim Il Sung Square, Pyongyang, North Korea",
  lat: 39.0194,
  lon: 125.7536,
};

const bbox = [
  STORE.lon - 0.018,
  STORE.lat - 0.009,
  STORE.lon + 0.018,
  STORE.lat + 0.009,
].join(",");
const EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${STORE.lat},${STORE.lon}`;
const LARGER_URL = `https://www.openstreetmap.org/?mlat=${STORE.lat}&mlon=${STORE.lon}#map=16/${STORE.lat}/${STORE.lon}`;

export function StoreMap() {
  return (
    <section data-testid="store-map" id="store" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Visit our store
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            Try Copper Home and Copper Notes in person.
          </p>
          <MascotSays
            side="right"
            alt="Copper the robot mascot inviting you to the store"
            className="mt-2"
          >
            Come say hi! Our store is right near Kim Il Sung Square.
          </MascotSays>
        </div>
        <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
          <iframe
            title={`Map showing the ${STORE.name}`}
            src={EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="aspect-[4/3] w-full md:aspect-[16/7]"
          />
          <div className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:justify-between">
            <p className="flex items-start gap-2">
              <MapPinIcon
                className="text-primary mt-0.5 size-5 shrink-0"
                aria-hidden
              />
              <span>
                <span className="font-semibold">{STORE.name}</span>
                <span className="text-muted-foreground block text-sm">
                  {STORE.area} (fictional, for educational use)
                </span>
              </span>
            </p>
            <a
              href={LARGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm font-medium underline-offset-4 hover:underline"
            >
              View larger map
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
