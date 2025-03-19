import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeUtils } from "@/hooks/use-mobile";

export const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useThemeUtils();

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={toggleTheme}
      // fixed top-4 left-4 z-10
      className=' rounded-full p-2 shadow-md transition-all duration-300 
          bg-white hover:bg-gray-50
          dark:bg-donation-dark-card dark:text-donation-dark-text dark:border-donation-dark-border dark:hover:bg-donation-dark-card-hover'>
      {isDark ? <Sun className='h-5 w-5 text-yellow-500' /> : <Moon className='h-5 w-5' />}
    </Button>
  );
};
