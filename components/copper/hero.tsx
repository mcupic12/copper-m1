import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/copper/catalog";

// The landing page's first section: headline, tagline, "See products" and
// the two product cutouts. Image paths, names and types come from the catalog.
export function Hero() {
  const products = getProducts();

  return (
    <section data-testid="hero" id="top" className="bg-secondary">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <h1 className="text-secondary-foreground text-4xl font-bold tracking-tight md:text-5xl">
            Smart help for Arizona homes and meetings.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            From raw ideas to refined answers.
          </p>
          <Button asChild size="lg" className="h-11 px-6 text-base">
            <a href="#products">See products</a>
          </Button>
        </div>
        <div className="grid grid-cols-2 items-end gap-4">
          {products.map((product, index) => (
            <Image
              key={product.id}
              src={product.cutout}
              alt={`${product.name} ${product.type}`}
              width={1254}
              height={1254}
              sizes="(min-width: 768px) 25vw, 45vw"
              preload={index === 0}
              className="h-auto w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
