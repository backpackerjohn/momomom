import React from "react";
import { use3DTilt } from "../hooks/use3DTilt";

// Type definitions for our decoupled data structure
export interface CardLink {
  href?: string;
  pageId?: string;
  text: string;
  ariaLabel: string;
  className: string;
}

export interface CardData {
  title: string;
  titleClassName: string;
  subtitle: React.ReactNode;
  subtitleClassName: string;
  links?: CardLink[];
  linksContainerClassName?: string;
  className: string;
  style?: React.CSSProperties;
  illustrationSrc?: string;
  illustrationClassName?: string;
}

// The props for our refactored Card component
export interface CardProps extends CardData {
    navigate: (page: string) => void;
}


/**
 * REFACTORED Card component.
 * Now accepts data props instead of children, making it truly reusable.
 * It's also now accessible via keyboard navigation.
 */
export const Card: React.FC<CardProps> = ({ 
  className = "", 
  style = {},
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  links,
  linksContainerClassName,
  navigate,
  illustrationSrc,
  illustrationClassName,
 }) => {
  const { ref } = use3DTilt();

  const noiseTexture =
    "before:content-[''] before:absolute before:inset-0 before:bg-[url(data:image/svg+xml,%3Csvg_xmlns='http://www.w3.org/2000/svg'_viewBox='0_0_800_800'%3E%3Cfilter_id='a'_x='0'_y='0'_width='100%25'_height='100%25'%3E%3CfeTurbulence_type='fractalNoise'_baseFrequency='.6'_numOctaves='4'_stitchTiles='stitch'/%3E%3C/filter%3E%3Crect_width='100%25'_height='100%25'_filter='url(%23a)'/%3E%3C/svg%3E)] before:opacity-[0.03] before:pointer-events-none";

  const shimmerEffect =
    "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:-translate-x-full hover:after:translate-x-full focus-within:after:translate-x-full after:transition-transform after:duration-700 after:pointer-events-none";

  const baseCardStyles =
    "rounded-[22px] shadow-md ring-1 ring-black/5 relative overflow-hidden transition-all duration-500 [transform-style:preserve-3d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-accent-primary";

  const combinedClassName = [
    baseCardStyles,
    shimmerEffect,
    noiseTexture,
    "opacity-0 animate-fade-in-up",
    className,
  ].join(" ");

  const titleBaseStyles = "font-semibold uppercase tracking-[0.1em] select-none";
  const subtextBaseStyles = "font-normal select-none";

  return (
    <div 
      ref={ref} 
      style={style} 
      className={combinedClassName}
      tabIndex={0} // ACCESSIBILITY: Make card focusable
    >
      {illustrationSrc && (
        <img
          src={illustrationSrc}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none ${illustrationClassName || ''}`}
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="relative">
        <h2 className={`${titleClassName} ${titleBaseStyles}`}>
          {title}
        </h2>
        <p className={`${subtitleClassName} ${subtextBaseStyles}`}>
          {subtitle}
        </p>
      </div>
      {links && (
        <div className={`relative ${linksContainerClassName || ""}`}>
          {links.map((link) => {
            if (link.pageId) {
              return (
                <button key={link.text} onClick={() => navigate(link.pageId!)} className={link.className} aria-label={link.ariaLabel}>
                  {link.text}
                </button>
              )
            }
            return (
              <a key={link.text} href={link.href} className={link.className} aria-label={link.ariaLabel}>
                {link.text}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};