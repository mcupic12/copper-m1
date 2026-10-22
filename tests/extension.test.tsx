import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";

vi.mock("next-themes", () => ({ useTheme: () => ({ setTheme: vi.fn() }) }));

const SECTIONS = [
  "site-header",
  "hero",
  "products",
  "showcase",
  "plus-pricing",
  "privacy-summary",
  "store-map",
  "site-footer",
];

describe("Module 1 extension", () => {
  it("Copper the robot speaks in every section", () => {
    const { container } = render(<Home />);
    for (const testId of SECTIONS) {
      const section = container.querySelector(`[data-testid="${testId}"]`);
      expect(section, testId).not.toBeNull();
      const robot = section!.querySelector(
        'img[src*="copper-mascot"], img[srcset*="copper-mascot"]',
      );
      expect(robot, `robot in ${testId}`).not.toBeNull();
      const bubble = robot!.nextElementSibling;
      expect(
        bubble?.textContent?.trim().length,
        `bubble in ${testId}`,
      ).toBeGreaterThan(3);
    }
  });

  it("shows the store on an OpenStreetMap embed, linked from the header", () => {
    const { container } = render(<Home />);
    const map = screen.getByTitle(/map showing the copper state labs/i);
    expect(map.getAttribute("src")).toMatch(
      /^https:\/\/www\.openstreetmap\.org\/export\/embed\.html\?.*marker=39\.0194,125\.7536/,
    );
    const header = container.querySelector('[data-testid="site-header"]')!;
    expect(header.querySelector('a[href="#store"]')).not.toBeNull();
    expect(
      screen.getByRole("link", { name: "View larger map" }),
    ).toHaveAttribute("target", "_blank");
  });
});
