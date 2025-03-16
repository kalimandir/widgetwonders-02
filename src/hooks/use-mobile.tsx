
import * as React from "react"

// Breakpoints for different screen sizes
export enum Breakpoint {
  XS = 340,
  SM = 640,
  MD = 768,
  LG = 1024,
  XL = 1280,
  XXL = 1536
}

const MOBILE_BREAKPOINT = Breakpoint.MD

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Function to check and update screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check on mount
    checkScreenSize()
    
    // Set up event listener for window resize
    window.addEventListener("resize", checkScreenSize)
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return isMobile
}

export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = React.useState<number>(0)
  
  React.useEffect(() => {
    // Set initial width after component mounts to avoid SSR mismatch
    setScreenWidth(window.innerWidth)
    
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  
  return screenWidth
}

// Hook to check if screen width is below a specific breakpoint
export function useIsBreakpoint(breakpoint: Breakpoint) {
  const screenWidth = useScreenWidth()
  return screenWidth < breakpoint
}

// Hook to determine which breakpoint the current screen width falls into
export function useActiveBreakpoint() {
  const screenWidth = useScreenWidth()
  
  if (screenWidth < Breakpoint.XS) return 'xs'
  if (screenWidth < Breakpoint.SM) return 'sm'
  if (screenWidth < Breakpoint.MD) return 'md'
  if (screenWidth < Breakpoint.LG) return 'lg'
  if (screenWidth < Breakpoint.XL) return 'xl'
  return 'xxl'
}

// Enhanced responsive padding hook with more options
export function useResponsivePadding() {
  const screenWidth = useScreenWidth()
  
  // Card spacing (gap between cards)
  if (screenWidth < Breakpoint.XS) return {
    cardSpacing: 'space-y-4', // 16px vertical gap between cards
    cardPadding: 'p-4',       // 16px internal padding
    sectionSpacing: 'space-y-2',
    textSpacing: 'space-y-2',
    elementSpacing: 'space-y-3',
    buttonSpacing: 'mt-4'
  }
  
  if (screenWidth < Breakpoint.SM) return {
    cardSpacing: 'space-y-4',
    cardPadding: 'p-4',
    sectionSpacing: 'space-y-3',
    textSpacing: 'space-y-2',
    elementSpacing: 'space-y-4',
    buttonSpacing: 'mt-4'
  }
  
  return {
    cardSpacing: 'space-y-5', // 20px vertical gap between cards
    cardPadding: 'p-5',       // 20px internal padding
    sectionSpacing: 'space-y-4',
    textSpacing: 'space-y-2',
    elementSpacing: 'space-y-4',
    buttonSpacing: 'mt-5'
  }
}
