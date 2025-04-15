import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
        className
      )}
      ref={ref}
      {...props}
    />
    <Check className="ml-2 h-4 w-4" />
  </div>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
