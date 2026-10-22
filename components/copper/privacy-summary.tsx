import { CircleCheckIcon } from "lucide-react";
import { MascotSays } from "@/components/copper/mascot-says";
import { Card, CardContent } from "@/components/ui/card";
import { getPrivacySummary } from "@/lib/copper/catalog";

// How Copper handles recordings, shown word for word from the catalog's 2026
// policy so the page can't drift from it.
export function PrivacySummary() {
  const privacy = getPrivacySummary();

  return (
    <section
      data-testid="privacy-summary"
      id="privacy"
      className="bg-secondary py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-5 md:items-start">
        <div className="flex flex-col gap-4 md:col-span-2">
          <h2 className="text-secondary-foreground text-3xl font-bold tracking-tight md:text-4xl">
            Your privacy, in plain words
          </h2>
          <p className="text-muted-foreground text-lg">
            How Copper handles your recordings under our {privacy.policy}{" "}
            privacy policy.
          </p>
          <MascotSays alt="Copper the robot mascot holding a privacy checklist">
            Here&apos;s exactly how I handle your recordings, in plain words.
          </MascotSays>
        </div>
        <Card className="border-accent rounded-l-none border-l-4 md:col-span-3">
          <CardContent className="px-6">
            <ul className="flex flex-col gap-4 text-base">
              {privacy.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <CircleCheckIcon
                    className="text-accent mt-0.5 size-5 shrink-0"
                    aria-hidden
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
