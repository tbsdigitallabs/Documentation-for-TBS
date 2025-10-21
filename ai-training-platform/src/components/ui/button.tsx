import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group max-w-fit",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[var(--color-oxford-blue)] to-[var(--color-ultramarine)] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-magenta-500)]",
        destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-red-500",
        outline: "border-2 border-[var(--color-oxford-blue)] bg-transparent text-[var(--color-oxford-blue)] hover:bg-[var(--color-oxford-blue)] hover:text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-magenta-500)]",
        secondary: "bg-[var(--color-gray-100)] text-[var(--color-gray-900)] border border-[var(--color-gray-300)] hover:bg-[var(--color-gray-200)] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--color-gray-500)]",
        ghost: "text-[var(--color-oxford-blue)] hover:bg-[var(--color-gray-100)] hover:text-[var(--color-oxford-blue)] focus-visible:ring-[var(--accent-magenta-500)]",
        link: "text-[var(--color-oxford-blue)] underline-offset-4 hover:underline focus-visible:ring-[var(--accent-magenta-500)]",
        accent: "bg-gradient-to-r from-[var(--accent-magenta-500)] to-[var(--accent-sage-500)] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-magenta-500)]",
        success: "bg-gradient-to-r from-[var(--accent-sage-500)] to-[var(--accent-sage-600)] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--accent-sage-500)]",
      },
      size: {
        default: "h-10 px-6 py-2 min-w-[120px]",
        sm: "h-8 px-4 py-1.5 text-sm min-w-[100px]",
        lg: "h-12 px-8 py-3 text-base min-w-[140px]",
        icon: "h-10 w-10",
        xs: "h-7 px-3 py-1 text-xs min-w-[80px]",
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
