import React from 'react';
import DonationWidget from '../components/DonationWidget/DonationWidget';
import { ThemeProvider } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeUtils } from '@/hooks/use-mobile';

const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useThemeUtils();
  
  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 left-4 z-10 rounded-full w-10 h-10 p-2 shadow-md transition-all duration-300 
        bg-white hover:bg-gray-50
        dark:bg-donation-dark-card dark:text-donation-dark-text dark:border-donation-dark-border dark:hover:bg-donation-dark-card-hover"
    >
      {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#111520] dark:to-[#171923] p-2 sm:p-4 transition-colors duration-300">
        <ThemeSwitcher />
        <div className="w-full max-w-[496px] animate-fade-in">
          <DonationWidget 
            organizationName="Hope Foundation"
            missionStatement="Empowering communities through education"
            logoUrl="/placeholder.svg"
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
