import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlusPricing } from "@/components/copper/plus-pricing";
import { formatUsd, getPlans } from "@/lib/copper/catalog";

const plus = getPlans().find((plan) => plan.id === "copper-plus")!;
const monthly = `${formatUsd(plus.monthlyUsd)}/month`;
const yearly = `${formatUsd(plus.annualUsd)}/year`;

// The big prices currently shown (not inside a hidden block).
const shownPrices = (container: HTMLElement) =>
  [...container.querySelectorAll("p.text-4xl")]
    .filter((p) => !p.closest("[hidden]"))
    .map((p) => p.textContent);

describe("Copper Plus pricing toggle", () => {
  it("shows the monthly price first, and Free at $0", () => {
    const { container } = render(<PlusPricing />);
    expect(screen.getByRole("button", { name: "Monthly" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(shownPrices(container)).toEqual(["$0", monthly]);
  });

  it("switches to the yearly price and back", () => {
    const { container } = render(<PlusPricing />);
    fireEvent.click(screen.getByRole("button", { name: "Yearly" }));
    expect(screen.getByRole("button", { name: "Yearly" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(shownPrices(container)).toEqual(["$0", yearly]);
    fireEvent.click(screen.getByRole("button", { name: "Monthly" }));
    expect(shownPrices(container)).toEqual(["$0", monthly]);
  });

  it("keeps both Copper Plus prices in the page", () => {
    const { container } = render(<PlusPricing />);
    const text = container.textContent ?? "";
    expect(text).toContain(formatUsd(plus.monthlyUsd));
    expect(text).toContain(formatUsd(plus.annualUsd));
  });
});
