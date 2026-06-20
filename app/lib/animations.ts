import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ANIMATION_CONFIG = {
  ease: {
    default: "power2.out",
    smooth: "power3.out",
    snappy: "expo.out",
  },
  duration: {
    fast: 0.6,
    normal: 0.8,
    slow: 1.2,
  },
  distance: {
    small: 20,
    medium: 30,
    large: 40,
  },
  stagger: {
    tight: 0.1,
    normal: 0.15,
    relaxed: 0.2,
  },
} as const;

export const MOBILE_BREAKPOINT = 768;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

export function getResponsiveConfig() {
  const mobile = isMobile();
  return {
    distance: {
      small: mobile ? 15 : ANIMATION_CONFIG.distance.small,
      medium: mobile ? 20 : ANIMATION_CONFIG.distance.medium,
      large: mobile ? 25 : ANIMATION_CONFIG.distance.large,
    },
    duration: {
      fast: ANIMATION_CONFIG.duration.fast,
      normal: ANIMATION_CONFIG.duration.normal,
      slow: ANIMATION_CONFIG.duration.slow,
    },
    stagger: {
      tight: ANIMATION_CONFIG.stagger.tight,
      normal: ANIMATION_CONFIG.stagger.normal,
      relaxed: ANIMATION_CONFIG.stagger.relaxed,
    },
  };
}

export interface FadeUpOptions {
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
}

export function createFadeUpAnimation(
  target: gsap.TweenTarget,
  options: FadeUpOptions = {},
) {
  const config = getResponsiveConfig();
  const {
    y = config.distance.medium,
    duration = config.duration.normal,
    delay = 0,
    ease = ANIMATION_CONFIG.ease.default,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  return gsap.fromTo(
    target,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease },
  );
}

export interface ScaleInOptions {
  scale?: number;
  duration?: number;
  delay?: number;
  ease?: string;
}

export function createScaleInAnimation(
  target: gsap.TweenTarget,
  options: ScaleInOptions = {},
) {
  const config = getResponsiveConfig();
  const {
    scale = 1.05,
    duration = config.duration.slow,
    delay = 0,
    ease = ANIMATION_CONFIG.ease.smooth,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, scale: 1 });
    return gsap.timeline();
  }

  return gsap.fromTo(
    target,
    { opacity: 0, scale },
    { opacity: 1, scale: 1, duration, delay, ease },
  );
}

export interface StaggerFadeUpOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  delay?: number;
}

export function createStaggerFadeUp(
  targets: gsap.TweenTarget,
  options: StaggerFadeUpOptions = {},
) {
  const config = getResponsiveConfig();
  const {
    y = config.distance.large,
    duration = config.duration.normal,
    stagger = config.stagger.normal,
    ease = ANIMATION_CONFIG.ease.default,
    delay = 0,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, stagger, ease, delay },
  );
}

export interface ScrollTriggerConfig {
  trigger: string | Element;
  start?: string;
  end?: string;
  toggleActions?: string;
  markers?: boolean;
  scrub?: boolean | number;
  once?: boolean;
}

export function createScrollTrigger(
  animation: gsap.core.Timeline | gsap.core.Tween,
  config: ScrollTriggerConfig,
) {
  const {
    trigger,
    start = "top 85%",
    end = "bottom 20%",
    toggleActions = "play none none none",
    markers = false,
    scrub = false,
    once = true,
  } = config;

  if (prefersReducedMotion()) {
    return null;
  }

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    toggleActions,
    markers,
    scrub,
    animation,
    once,
  });
}

export function killScrollTriggers(triggers: (ScrollTrigger | null)[]) {
  triggers.forEach((trigger) => trigger?.kill());
}

export { gsap, ScrollTrigger };
