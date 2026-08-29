"use client"

import { Button } from "@/components/ui/button"

import { StarIcon, StarOffIcon } from "lucide-react"
import type React from "react"
import { useState, useEffect, forwardRef } from "react"
import { toast } from "sonner"
import { toggleStarMarked } from "../action"

interface MarkedToggleButtonProps extends React.ComponentPropsWithoutRef<"div"> {
  markedForRevision: boolean
  id: string
}

export const MarkedToggleButton = forwardRef<HTMLDivElement, MarkedToggleButtonProps>(
  ({ markedForRevision, id, onClick, className, children, ...props }, ref) => {
    const [isMarked, setIsMarked] = useState(markedForRevision)

    useEffect(() => {
      setIsMarked(markedForRevision)
    }, [markedForRevision])

    const handleToggle = async (event: React.MouseEvent<HTMLDivElement>) => {
      // Call the original onClick if provided by the parent (DropdownMenuItem)
      onClick?.(event)

      const newMarkedState = !isMarked
      setIsMarked(newMarkedState)

      try {
        const res = await toggleStarMarked(id, newMarkedState)
        const { success, error, isMarked } = res;

        //    if ismarked true then show marked successfully otherwise show start over
        if (isMarked && !error && success) {
          toast.success("Added to Favorites successfully")
        } else {
          toast.success("Removed from Favorites successfully")
        }



      } catch (error) {
        console.error("Failed to toggle mark for revision:", error)
        setIsMarked(!newMarkedState) // Revert state if the update fails
        // You might want to add a toast notification here for the user
      }
    }

    return (
      <div
        ref={ref}
        className={`flex items-center justify-start w-full cursor-pointer ${className || ""}`}
        onClick={handleToggle}
        {...props}
      >
        {isMarked ? (
          <StarIcon size={16} className="text-red-500 mr-2" />
        ) : (
          <StarOffIcon size={16} className="text-gray-500 mr-2" />
        )}
        {children || (isMarked ? "Remove Favorite" : "Add to Favorite")}
      </div>
    )
  },
)

MarkedToggleButton.displayName = "MarkedToggleButton"
