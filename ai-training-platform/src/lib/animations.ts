// Modern scale-only animations for professional appearance
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, ease: "easeOut" as const }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" as const }
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" as const }
};

// Stagger animations for lists
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" as const }
};

// Professional hover effects - scale only
export const hoverScale = {
  whileHover: { scale: 1.02 },
  transition: { duration: 0.2, ease: "easeOut" as const }
};

export const hoverScaleSubtle = {
  whileHover: { scale: 1.01 },
  transition: { duration: 0.2, ease: "easeOut" as const }
};

// Button interactions - scale only
export const buttonPress = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.1, ease: "easeOut" as const }
};

export const buttonHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: "easeOut" as const }
};

// Page transitions - scale and fade only
export const pageTransition = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: 0.3, ease: "easeOut" as const }
};

// Card animations
export const cardHover = {
  whileHover: { scale: 1.01 },
  transition: { duration: 0.2, ease: "easeOut" as const }
};

// Loading animations
export const loadingPulse = {
  animate: { scale: [1, 1.05, 1] },
  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }
};

// Smooth spring animations
export const springSmooth = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25
  }
};

// Icon animations
export const iconHover = {
  whileHover: { scale: 1.1 },
  transition: { duration: 0.2, ease: "easeOut" as const }
};

// Text animations
export const textFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

// Container animations
export const containerFadeIn = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" as const }
};