
import * as React from "react"
import { useTheme } from "next-themes"

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

// Enhanced responsive spacing and alignment hook with theme awareness
export function useResponsivePadding() {
  const screenWidth = useScreenWidth()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  // Extra small screens (under 340px)
  if (screenWidth < Breakpoint.XS) return {
    cardSpacing: 'space-y-6',      // 24px vertical gap between cards
    cardPadding: 'p-3',            // 12px internal padding
    avatarSize: 'h-8 w-8',         // smaller avatar
    sectionSpacing: 'space-y-2',
    textSpacing: 'space-y-1.5',
    elementSpacing: 'space-y-3',
    buttonSpacing: 'mt-3',
    isDark
  }
  
  // Small screens (340px to 640px)
  if (screenWidth < Breakpoint.SM) return {
    cardSpacing: 'space-y-6',      // 24px vertical gap between cards
    cardPadding: 'p-4',            // 16px internal padding
    avatarSize: 'h-9 w-9',         // medium avatar
    sectionSpacing: 'space-y-3',
    textSpacing: 'space-y-1.5',
    elementSpacing: 'space-y-4',
    buttonSpacing: 'mt-4',
    isDark
  }
  
  // Default (larger screens)
  return {
    cardSpacing: 'space-y-6',      // 24px vertical gap between cards
    cardPadding: 'p-5',            // 20px internal padding
    avatarSize: 'h-10 w-10',       // larger avatar
    sectionSpacing: 'space-y-4',
    textSpacing: 'space-y-2',
    elementSpacing: 'space-y-4',
    buttonSpacing: 'mt-5',
    isDark
  }
}

// Responsive chart dimensions hook
export function useResponsiveChartDimensions() {
  const screenWidth = useScreenWidth()
  const isMobile = screenWidth < MOBILE_BREAKPOINT
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  return {
    pieChart: {
      outerRadius: isMobile ? 80 : 100,
      width: '100%',
      height: isMobile ? 250 : 300,
      centerOffset: isMobile ? { x: 0, y: 0 } : { x: 0, y: 0 },
      legendLayout: isMobile ? 'horizontal' : 'vertical',
      isDark
    }
  }
}

// New hook for theme-related utilities
export function useThemeUtils() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }
  
  return {
    isDark,
    toggleTheme,
    currentTheme: theme
  }
}
