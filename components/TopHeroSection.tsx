import React from "react";
import { cardData } from "../data/dashboard-data";
import { Card } from "./ui";

/**
 * TopHeroSection (with row of 3 cards)
 * - Top row: big left tile + one big right tile
 * - New row: three equal-width cards below
 * - Colors: dark (#2c2e3b), light gray (#dad6cd), light blue (#adc2c5), coral (#e57452)
 *
 * Enhancements:
 * - Subtle Gradients: Adds depth and simulates a light source.
 * - Noise Texture: A faint noise overlay for a premium, tangible feel.
 * - Inner Glow: A glassmorphic effect on the light blue card.
 * - 3D Tilt on Hover: Cards react to cursor position for an interactive feel.
 * - Shimmer Effect: A glossy shine animates across cards on hover.
 * - Aura/Shadow Bloom: Shadow expands and gains color on hover.
 * - Staggered Animation: Cards animate in sequentially on load.
 */
export default function TopHeroSection({ navigate }: { navigate: (page: string) => void }) {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-[95rem] px-2 sm:px-4 md:px-6 lg:px-8 space-y-8">
        {/* Top row */}
        <div
          className={[
            "grid gap-6",
            "grid-cols-1 md:[grid-template-columns:2fr_1fr]",
            "md:h-[clamp(22rem,45vw,32rem)]",
          ].join(" ")}
        >
          {/* Left: big dark card */}
          <Card {...cardData.topLeft} navigate={navigate} style={{ ...cardData.topLeft.style, animationDelay: '100ms' }} />

          {/* Right: single card */}
          <Card {...cardData.topRight} navigate={navigate} style={{ animationDelay: '200ms' }} />
        </div>

        {/* Bottom row: three equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardData.bottom.map((card, index) => (
            <Card key={index} {...card} navigate={navigate} style={{ animationDelay: `${400 + index * 100}ms` }}/>
          ))}
        </div>
      </div>
    </section>
  );
}