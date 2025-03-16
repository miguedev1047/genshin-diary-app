"use client"

import { useState, useEffect, useCallback, type RefObject } from "react"

interface UseScrollToTopOptions {
  /**
   * The threshold at which the button becomes visible (0-1)
   * 0 means as soon as even one pixel is visible, 1 means the entire element must be visible
   */
  threshold?: number
  /**
   * The element to observe. If not provided, a default element at the top of the page will be used
   */
  targetRef?: RefObject<HTMLElement>
  /**
   * The behavior of the scroll animation
   */
  behavior?: ScrollBehavior
}

/**
 * A hook that provides scroll-to-top functionality with Intersection Observer
 */
export function useScrollToTop({ threshold = 0, targetRef, behavior = "smooth" }: UseScrollToTopOptions = {}) {
  const [showButton, setShowButton] = useState(false)

  // Function to scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior,
    })
  }, [behavior])

  useEffect(() => {
    // Create a default target element if none is provided
    let target: HTMLElement | null = null
    let defaultTarget: HTMLElement | null = null

    if (!targetRef?.current) {
      // Create a sentinel element at the top of the page
      defaultTarget = document.createElement("div")
      defaultTarget.style.position = "absolute"
      defaultTarget.style.top = "0"
      defaultTarget.style.height = "1px"
      defaultTarget.style.width = "1px"
      defaultTarget.style.pointerEvents = "none"
      document.body.prepend(defaultTarget)
      target = defaultTarget
    } else {
      target = targetRef.current
    }

    // Create the observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the target is not intersecting (out of view), show the button
        setShowButton(!entry.isIntersecting)
      },
      {
        threshold,
        rootMargin: "0px",
      },
    )

    if (target) {
      observer.observe(target)
    }

    // Cleanup
    return () => {
      if (target) {
        observer.unobserve(target)
      }
      if (defaultTarget) {
        defaultTarget.remove()
      }
    }
  }, [targetRef, threshold])

  return { showButton, scrollToTop }
}

