import Image from "next/image";
import { MascotSays } from "@/components/copper/mascot-says";
import { cn } from "@/lib/utils";
import { getProducts } from "@/lib/copper/catalog";

// Alt text, caption and size for each lifestyle photo, keyed by its path in
// the catalog. Photos the catalog adds later fall back to a generic alt.
const PHOTOS: Record<
  string,
  { alt: string; caption: string; width: number; height: number }
> = {
  "/assets/lifestyle/copper-home-desert-light.png": {
    alt: "Copper Home smart speaker on a stone kitchen counter, with saguaros and mountains at sunset outside the window",
    caption:
      "Copper Home on the kitchen counter: the time and the temperature at a glance.",
    width: 1672,
    height: 941,
  },
  "/assets/lifestyle/copper-notes-stone-desk.png": {
    alt: "Copper Notes clip-on recorder standing on a stone counter in warm afternoon light",
    caption:
      "Copper Notes is small enough to clip on and forget, until you need the notes.",
    width: 1672,
    height: 941,
  },
  "/assets/lifestyle/copper-notes-golden-hour.png": {
    alt: "A person writing in a notebook at a café table, with Copper Notes clipped to their shirt pocket and its amber ring lit",
    caption:
      "At a coffee shop at golden hour: the amber ring shows Copper Notes is recording.",
    width: 1536,
    height: 1024,
  },
};

export function Showcase() {
  const photos = getProducts().flatMap((product) =>
    product.lifestyle.map((src) => ({
      src,
      productName: product.name,
      ...(PHOTOS[src] ?? {
        alt: `${product.name} in use`,
        caption: product.type,
        width: 1600,
        height: 1000,
      }),
    })),
  );

  return (
    <section
      data-testid="showcase"
      id="showcase"
      className="bg-secondary py-16 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h2 className="text-secondary-foreground text-3xl font-bold tracking-tight md:text-4xl">
            Made for Arizona life
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            At home on the counter, or clipped on at your favorite coffee shop.
          </p>
          <MascotSays
            alt="Copper the robot mascot pointing out the photos"
            className="mt-2"
          >
            Here&apos;s where I like to hang out: your kitchen counter and your
            favorite coffee shop.
          </MascotSays>
        </div>
        <div className="flex flex-col gap-12 md:gap-16">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              className="grid items-center gap-5 md:grid-cols-5 md:gap-10"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 768px) 60vw, 100vw"
                className={cn(
                  "h-auto w-full rounded-xl shadow-lg md:col-span-3",
                  index % 2 === 1 && "md:order-last",
                )}
              />
              <figcaption className="flex flex-col gap-2 md:col-span-2">
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                  {photo.productName}
                </span>
                <span className="text-secondary-foreground text-xl leading-snug font-medium">
                  {photo.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
