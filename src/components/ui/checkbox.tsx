import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-sm border border-gray-300",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600",
          className
        )}
        ref={ref}
        {...props}
      />
      <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white opacity-0 peer-data-[state=checked]:opacity-100 pointer-events-none" />
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
