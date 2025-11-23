import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled disabled:border-disabled relative group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[var(--color-oxford-blue)] to-[var(--color-ultramarine)] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-magenta-500)] font-semibold",
        destructive: "bg-error text-error border-error shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--color-error-text)]",
        outline: "border-2 border-border-primary bg-transparent text-content-primary hover:bg-button hover:border-button hover:text-button shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-magenta-500)] font-semibold",
        secondary: "bg-button text-button border-button hover:bg-button hover:border-button shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--color-gray-500)]",
        ghost: "text-content-primary hover:bg-surface-secondary hover:text-content-primary focus-visible:ring-[var(--accent-magenta-500)]",
        link: "text-content-primary underline-offset-4 hover:underline focus-visible:ring-[var(--accent-magenta-500)]",
        accent: "bg-gradient-to-r from-[var(--accent-magenta-500)] to-[var(--accent-sage-500)] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-magenta-500)]",
        success: "bg-gradient-to-r from-[var(--accent-sage-500)] to-[var(--accent-sage-600)] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-sage-500)]",
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
