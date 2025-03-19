import DonationWidget from "../components/DonationWidget/DonationWidget";
import { ThemeProvider } from "next-themes";


const Index = () => {
  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#111520] dark:to-[#171923] p-2 sm:p-4 transition-colors duration-300'>
        {/* <ThemeSwitcher /> */}
        <div className='w-full max-w-[496px] animate-fade-in'>
          <DonationWidget organizationName='Hope Foundation' missionStatement='Empowering communities through education' logoUrl='/placeholder.svg' />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
