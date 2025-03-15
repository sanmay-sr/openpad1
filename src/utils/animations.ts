
import { cn } from "@/lib/utils";

export type AnimationProps = {
  delay?: number;
  duration?: number;
};

/**
 * Animation utilities for consistent animations across the app
 */
export const animations = {
  /**
   * Applies a fade-in animation
   */
  fadeIn: ({ delay = 0, duration = 0.3 }: AnimationProps = {}) => 
    cn(
      "animate-fade-in opacity-0",
      delay && `[animation-delay:${delay}s]`, 
      duration && `[animation-duration:${duration}s]`
    ),
  
  /**
   * Applies a slide-up animation (elements enter by moving up)
   */
  slideUp: ({ delay = 0, duration = 0.4 }: AnimationProps = {}) => 
    cn(
      "animate-slide-up opacity-0",
      delay && `[animation-delay:${delay}s]`, 
      duration && `[animation-duration:${duration}s]`
    ),
  
  /**
   * Applies a slide-down animation (elements enter by moving down)
   */
  slideDown: ({ delay = 0, duration = 0.4 }: AnimationProps = {}) => 
    cn(
      "animate-slide-down opacity-0",
      delay && `[animation-delay:${delay}s]`, 
      duration && `[animation-duration:${duration}s]`
    ),
  
  /**
   * Applies a scale-in animation
   */
  scaleIn: ({ delay = 0, duration = 0.2 }: AnimationProps = {}) => 
    cn(
      "animate-scale-in opacity-0",
      delay && `[animation-delay:${delay}s]`, 
      duration && `[animation-duration:${duration}s]`
    ),
  
  /**
   * Applies a subtle floating animation (for decorative elements)
   */
  float: () => cn("animate-float"),
  
  /**
   * Applies a subtle pulse animation
   */
  pulse: () => cn("animate-pulse-light"),
  
  /**
   * Staggers animations for list items
   * @param index The index of the item in the list
   * @param baseDelay The base delay before starting the staggered animations
   * @param staggerDelay The delay between each item
   */
  stagger: (index: number, baseDelay = 0, staggerDelay = 0.05) => ({
    delay: baseDelay + index * staggerDelay
  })
};
