import { CheckIcon, MinusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  type Plan,
} from "@/lib/copper/catalog";
import { cn } from "@/lib/utils";

// Free vs. Copper Plus. Every price and plan detail comes from the catalog,
// so the page follows any change there.
export function PlusPricing() {
  const plans = getPlans();

  return (
    <section data-testid="plus-pricing" id="plus" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Copper Plus
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            One subscription covers every device in your household.
          </p>
        </div>
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
        <p className="text-muted-foreground mx-auto mt-8 max-w-xl text-center text-sm">
          Refined answers use more powerful models for complex questions and
          planning.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const isPlus = plan.id === "copper-plus";
  const isFree = plan.monthlyUsd === 0;
  // Rounded to cents so floating-point math can't show "$16.880000000001".
  const annualSavings =
    Math.round((plan.monthlyUsd * 12 - plan.annualUsd) * 100) / 100;

  const rows = [
    { label: "Memory kept", value: formatMemory(plan.memoryDays) },
    {
      label: "Notes recording",
      value: formatNotesHours(plan.notesHoursPerMonth),
    },
  ];

  return (
    <Card className={cn("gap-6 py-6", isPlus && "ring-primary ring-2")}>
      <CardHeader className="gap-3 px-6">
        <div className="flex items-center justify-between gap-2">
          <CardTitle>
            <h3 className="text-2xl font-bold">{plan.name}</h3>
          </CardTitle>
          {isPlus && <Badge>Best for busy households</Badge>}
        </div>
        {isFree ? (
          <div>
            <p className="text-4xl font-bold">{formatUsd(plan.monthlyUsd)}</p>
            <p className="text-muted-foreground">Included with every device</p>
          </div>
        ) : (
          <div>
            <p className={cn("text-4xl font-bold", isPlus && "text-primary")}>
              {formatUsd(plan.monthlyUsd)}
              <span className="text-muted-foreground text-base font-normal">
                /month
              </span>
            </p>
            <p className="text-muted-foreground">
              or {formatUsd(plan.annualUsd)}/year
            </p>
            {annualSavings > 0 && (
              <p className="text-primary mt-1 text-sm font-medium">
                Save {formatUsd(annualSavings)} a year with annual billing.
              </p>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="px-6">
        <dl className="divide-border flex flex-col divide-y border-t text-base">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 py-3"
            >
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-semibold">{row.value}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-muted-foreground">Refined answers</dt>
            <dd className="flex items-center gap-1.5 font-semibold">
              {plan.refinedAnswers ? (
                <>
                  <CheckIcon className="text-primary size-5" aria-hidden />
                  Included
                </>
              ) : (
                <>
                  <MinusIcon
                    className="text-muted-foreground size-5"
                    aria-hidden
                  />
                  Not included
                </>
              )}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
