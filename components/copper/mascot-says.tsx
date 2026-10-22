import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
  xs: "w-8",
  sm: "w-14 md:w-16",
  md: "w-20 md:w-24",
} as const;

// Copper the robot with a speech bubble. `side` is where the robot stands; he
// is mirrored on the right so he always faces his bubble.
export function MascotSays({
  children,
  alt = "Copper the robot mascot waving and holding a clipboard",
  side = "left",
  size = "md",
  className,
  bubbleClassName,
}: {
  children: ReactNode;
  alt?: string;
  side?: "left" | "right";
  size?: keyof typeof SIZES;
  className?: string;
  bubbleClassName?: string;
}) {
  const right = side === "right";

  return (
    <div
      className={cn(
        "flex items-end gap-3",
        right && "flex-row-reverse",
        size === "xs" && "items-center gap-2",
        className,
      )}
    >
      <Image
        src="/assets/brand/copper-mascot.png"
        alt={alt}
        width={1254}
        height={1254}
        sizes="96px"
        className={cn("h-auto shrink-0", SIZES[size], right && "-scale-x-100")}
      />
      <div
        className={cn(
          "bg-card text-card-foreground relative rounded-2xl border px-4 py-3 text-left text-base leading-snug font-medium shadow-sm",
          size === "md" && "mb-6",
          size === "sm" && "mb-4",
          size === "xs" && "rounded-xl px-2.5 py-1 text-xs",
          bubbleClassName,
        )}
      >
        <span
          aria-hidden
          className={cn(
            "bg-card absolute size-3 rotate-45",
            size === "xs" ? "top-1/2 -mt-1.5" : "bottom-4",
            right
              ? "-right-1.5 border-t border-r"
              : "-left-1.5 border-b border-l",
          )}
        />
        {children}
      </div>
    </div>
  );
}
