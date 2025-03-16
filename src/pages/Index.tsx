
import React from 'react';
import DonationWidget from '../components/DonationWidget/DonationWidget';
import { AdminProvider } from '../contexts/AdminContext';
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
      className="fixed top-4 right-4 z-50 rounded-full w-10 h-10 p-2 shadow-md transition-all duration-300 dark:bg-donation-dark-card dark:border-donation-dark-border dark:text-donation-dark-text dark:hover:bg-donation-dark-card-hover"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-donation-dark-background dark:to-[#111520] p-2 sm:p-4 transition-colors duration-300">
        <AdminProvider>
          <ThemeSwitcher />
          <div className="w-full max-w-[496px] animate-fade-in">
            <DonationWidget 
              organizationName="Hope Foundation"
              missionStatement="Empowering communities through education"
              logoUrl="/placeholder.svg"
            />
          </div>
        </AdminProvider>
      </div>
    </ThemeProvider>
  );
};

export default Index;
