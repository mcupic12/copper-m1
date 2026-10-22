"use client";

import { useState } from "react";
import { CheckIcon, MinusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  type Plan,
} from "@/lib/copper/catalog";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

const BILLING_OPTIONS: { value: Billing; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

// The plan cards with a Monthly | Yearly switch. Both prices stay in the page
// (the other one is hidden), so the page always shows the catalog's values.
export function PlanCards({ plans }: { plans: Plan[] }) {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div className="flex flex-col items-center gap-8">
      <ButtonGroup aria-label="Billing period">
        {BILLING_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={billing === option.value ? "default" : "outline"}
            size="lg"
            aria-pressed={billing === option.value}
            onClick={() => setBilling(option.value)}
            className="px-5"
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
      <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billing={billing} />
        ))}
      </div>
    </div>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const isPlus = plan.id === "copper-plus";
  const isFree = plan.monthlyUsd === 0;
  // Rounded to cents so floating-point math can't show "$16.880000000001".
  const annualSavings =
    Math.round((plan.monthlyUsd * 12 - plan.annualUsd) * 100) / 100;
  const priceClass = cn("text-4xl font-bold", isPlus && "text-primary");

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
          <div aria-live="polite">
            <div hidden={billing !== "monthly"}>
              <p className={priceClass}>
                {formatUsd(plan.monthlyUsd)}
                <span className="text-muted-foreground text-base font-normal">
                  /month
                </span>
              </p>
              <p className="text-muted-foreground">
                or {formatUsd(plan.annualUsd)}/year
              </p>
            </div>
            <div hidden={billing !== "yearly"}>
              <p className={priceClass}>
                {formatUsd(plan.annualUsd)}
                <span className="text-muted-foreground text-base font-normal">
                  /year
                </span>
              </p>
              {annualSavings > 0 && (
                <p className="text-primary text-sm font-medium">
                  Save {formatUsd(annualSavings)} a year compared with monthly.
                </p>
              )}
            </div>
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
