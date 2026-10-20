import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatUsd, getProducts } from "@/lib/copper/catalog";

// One card per product: cutout, name, price, features and colors, all read
// from the catalog so the page follows any price change.
export function Products() {
  const products = getProducts();

  return (
    <section data-testid="products" id="products" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Meet the products
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            Two devices, one helpful assistant, made for life in the desert.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <Card
              key={product.id}
              data-testid="product-card"
              data-product={product.id}
              className="gap-5 pt-4"
            >
              <div className="bg-secondary mx-4 rounded-lg p-6">
                <Image
                  src={product.cutout}
                  alt={`${product.name} ${product.type}`}
                  width={1254}
                  height={1254}
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="mx-auto h-auto w-full max-w-64"
                />
              </div>
              <CardHeader>
                <CardTitle>
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                </CardTitle>
                <CardDescription className="text-base">
                  {product.type}
                </CardDescription>
                <p className="text-primary mt-2 text-3xl font-bold">
                  {formatUsd(product.priceUsd)}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-5">
                <ul className="flex flex-col gap-3 text-base">
                  {product.features.map((feature) => (
                    <li key={feature.name}>
                      <span className="font-semibold">{feature.name}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        — {feature.description}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  <span className="text-muted-foreground text-sm">
                    Available in
                  </span>
                  {product.colors.map((color) => (
                    <Badge key={color} variant="outline">
                      {color}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
