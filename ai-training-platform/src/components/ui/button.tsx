import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 relative group",
  {
    variants: {
      variant: {
        default: "btn-primary shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-magenta-500)] font-semibold",
        destructive: "bg-red-600 text-white border-red-700 shadow-lg hover:bg-red-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-red-500",
        outline: "border-2 border-[var(--btn-secondary-border)] bg-transparent text-[var(--btn-secondary-text)] hover:bg-[var(--btn-secondary-hover)] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-magenta-500)] font-semibold",
        secondary: "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)] hover:bg-[var(--btn-secondary-hover)] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--color-gray-500)]",
        ghost: "bg-[var(--btn-ghost-bg)] text-[var(--btn-ghost-text)] hover:bg-[var(--btn-ghost-hover)] focus-visible:ring-[var(--accent-magenta-500)]",
        link: "text-content-primary underline-offset-4 hover:underline focus-visible:ring-[var(--accent-magenta-500)]",
        accent: "btn-accent font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-magenta-500)]",
        success: "bg-gradient-to-r from-[var(--accent-sage-500)] to-[var(--accent-sage-700)] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-sage-500)]",
        nav: "bg-[var(--btn-nav-bg)] text-[var(--btn-nav-text)] hover:bg-[var(--btn-nav-hover)] hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 py-1.5 text-sm",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10",
        xs: "h-7 px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
