"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  getResponsiveConfig,
  ANIMATION_CONFIG,
} from "@/app/lib/animations";

interface UseScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  toggleActions?: string;
  once?: boolean;
  disabled?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const contextRef = useRef<gsap.Context | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const {
    trigger,
    start = "top 85%",
    end = "bottom 20%",
    toggleActions = "play none none none",
    once = true,
    disabled = false,
  } = options;

  useEffect(() => {
    if (disabled || prefersReducedMotion()) return;

    contextRef.current = gsap.context(() => {});

    return () => {
      contextRef.current?.revert();
      triggersRef.current.forEach((st) => st.kill());
      triggersRef.current = [];
    };
  }, [disabled]);

  const animate = (
    targets: gsap.TweenTarget,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars,
    scrollTriggerElement?: string | Element,
  ) => {
    if (disabled || prefersReducedMotion()) {
      gsap.set(targets, toVars);
      return null;
    }

    const tween = gsap.fromTo(targets, fromVars, toVars);

    if (scrollTriggerElement || trigger) {
      const st = ScrollTrigger.create({
        trigger: scrollTriggerElement || trigger,
        start,
        end,
        toggleActions,
        animation: tween,
        once,
      });
      triggersRef.current.push(st);
    }

    return tween;
  };

  const fadeUp = (
    targets: gsap.TweenTarget,
    customOptions: {
      y?: number;
      duration?: number;
      delay?: number;
      ease?: string;
      scrollTrigger?: string | Element;
    } = {},
  ) => {
    const config = getResponsiveConfig();
    const {
      y = config.distance.medium,
      duration = config.duration.normal,
      delay = 0,
      ease = ANIMATION_CONFIG.ease.default,
      scrollTrigger: st,
    } = customOptions;

    return animate(
      targets,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration, delay, ease },
      st,
    );
  };

  const scaleIn = (
    targets: gsap.TweenTarget,
    customOptions: {
      scale?: number;
      duration?: number;
      delay?: number;
      ease?: string;
      scrollTrigger?: string | Element;
    } = {},
  ) => {
    const config = getResponsiveConfig();
    const {
      scale = 1.05,
      duration = config.duration.slow,
      delay = 0,
      ease = ANIMATION_CONFIG.ease.smooth,
      scrollTrigger: st,
    } = customOptions;

    return animate(
      targets,
      { opacity: 0, scale },
      { opacity: 1, scale: 1, duration, delay, ease },
      st,
    );
  };

  const staggerFadeUp = (
    targets: gsap.TweenTarget,
    customOptions: {
      y?: number;
      duration?: number;
      stagger?: number;
      delay?: number;
      ease?: string;
      scrollTrigger?: string | Element;
    } = {},
  ) => {
    const config = getResponsiveConfig();
    const {
      y = config.distance.large,
      duration = config.duration.normal,
      stagger = config.stagger.normal,
      delay = 0,
      ease = ANIMATION_CONFIG.ease.default,
      scrollTrigger: st,
    } = customOptions;

    if (disabled || prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return null;
    }

    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y },
      { opacity: 1, y: 0, duration, stagger, delay, ease },
    );

    if (st || trigger) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: st || trigger,
        start,
        end,
        toggleActions,
        animation: tween,
        once,
      });
      triggersRef.current.push(scrollTrigger);
    }

    return tween;
  };

  const timeline = (scrollTriggerElement?: string | Element) => {
    if (disabled || prefersReducedMotion()) {
      return gsap.timeline();
    }

    const tl = gsap.timeline();

    if (scrollTriggerElement || trigger) {
      const st = ScrollTrigger.create({
        trigger: scrollTriggerElement || trigger,
        start,
        end,
        toggleActions,
        animation: tl,
        once,
      });
      triggersRef.current.push(st);
    }

    return tl;
  };

  return {
    animate,
    fadeUp,
    scaleIn,
    staggerFadeUp,
    timeline,
    gsap,
    ScrollTrigger,
  };
}

export function useGSAPContext() {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    contextRef.current = gsap.context(() => {});
    return () => contextRef.current?.revert();
  }, []);

  return contextRef;
}
