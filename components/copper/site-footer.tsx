import { Logo } from "@/components/copper/logo";
import { MascotSays } from "@/components/copper/mascot-says";

// The `dark` class keeps the footer Night Sky in both themes and makes the
// Logo show its Desert Sand version.
export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="dark bg-background text-foreground border-t"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-center md:flex-row md:justify-between md:text-left">
        <Logo className="w-36" />
        <MascotSays size="sm" alt="Copper the robot mascot waving goodbye">
          Thanks for stopping by! (Psst, I&apos;m fictional too.)
        </MascotSays>
        <p className="text-muted-foreground text-sm">
          Fictional — for educational use.
        </p>
      </div>
    </footer>
  );
}
