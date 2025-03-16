
import * as React from "react"

const MOBILE_BREAKPOINT = 768

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
