import { PlanCards } from "@/components/copper/plan-cards";
import { getPlans } from "@/lib/copper/catalog";

// Free vs. Copper Plus. Every price and plan detail comes from the catalog,
// so the page follows any change there.
export function PlusPricing() {
  const plans = getPlans();

  return (
    <section data-testid="plus-pricing" id="plus" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Copper Plus
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            One subscription covers every device in your household.
          </p>
        </div>
        <PlanCards plans={plans} />
        <p className="text-muted-foreground mx-auto mt-8 max-w-xl text-center text-sm">
          Refined answers use more powerful models for complex questions and
          planning.
        </p>
      </div>
    </section>
  );
}
