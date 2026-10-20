import Link from "next/link";
import { Logo } from "@/components/copper/logo";
import { ModeToggle } from "@/components/copper/mode-toggle";

// In-page links to the landing page sections. On phones they sit in a second
// row under the logo; from md up everything fits on one row.
const NAV_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#plus", label: "Copper Plus" },
  { href: "#privacy", label: "Privacy" },
];

export function SiteHeader() {
  return (
    <header
      data-testid="site-header"
      className="bg-background/90 sticky top-0 z-50 border-b backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 px-4 py-2">
        <Link href="/" aria-label="Copper State Labs home">
          <Logo className="w-36 md:w-44" />
        </Link>
        <nav
          aria-label="Main"
          className="order-last flex w-full justify-center gap-6 pb-1 md:order-none md:w-auto md:pb-0"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-sm text-sm font-medium transition-colors outline-none focus-visible:ring-2"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
}
