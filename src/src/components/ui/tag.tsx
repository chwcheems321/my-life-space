import * as React from "react"
import { cn } from "@/lib/utils"

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary'
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
          {
            'bg-secondary text-foreground': variant === 'default',
            'bg-primary/10 text-primary': variant === 'primary',
            'bg-accent/10 text-accent': variant === 'secondary',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Tag.displayName = "Tag"

export { Tag }
