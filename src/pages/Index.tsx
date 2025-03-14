
import React from 'react';
import DonationWidget from '../components/DonationWidget/DonationWidget';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-2 sm:p-4">
      <div className="w-full max-w-xs sm:max-w-xl animate-fade-in">
        <DonationWidget 
          organizationName="Hope Foundation"
          missionStatement="Empowering communities through education"
          logoUrl="/placeholder.svg"
        />
      </div>
    </div>
  );
};

export default Index;
