import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import DonationAmount from './DonationAmount';
import CustomAmount from './CustomAmount';
import CommunityTab from './CommunityTab';
import HistoryTab from './HistoryTab';
import { useIsMobile, useScreenWidth } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";
import { HandHeart, Target, Users, History, BookOpen, Calendar, BarChart3, PieChart, Award, Image } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, PieChart as RechartsPieChart, Pie, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import AdminControls from '../admin/AdminControls';
import WalletConnect from '../admin/WalletConnect';
import { openYodlCheckout } from '../../utils/yodl';

interface DonationWidgetProps {
  organizationName: string;
  missionStatement: string;
  logoUrl: string;
}

const PREDEFINED_AMOUNTS = [5, 10, 25, 50];
const IMPACT_STATEMENTS = {
  5: "Equips a student with essential school supplies",
  10: "Funds a full day of quality education",
  25: "Supports a week of comprehensive learning materials",
  50: "Sponsors a student's education for an entire month"
};

const SPECIAL_ITEMS = {
  5: "Includes: Digital thank you card with student artwork",
  10: "Includes: Digital impact certificate + quarterly newsletter",
  25: "Includes: \"Supporter\" digital badge + thank you video",
  50: "Includes: Personalized impact report + leadership recognition"
};

const POPULAR_TIER = 25;

const DonationWidget: React.FC<DonationWidgetProps> = ({
  organizationName,
  missionStatement,
  logoUrl
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustomActive, setIsCustomActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [activeTab, setActiveTab] = useState("donate");
  const [ALLOCATION_DATA, setAllocationData] = useState([
    { name: 'School Supplies', value: 40, color: '#4016ad' },
    { name: 'Teaching Programs', value: 30, color: '#7c54e1' },
    { name: 'Infrastructure', value: 20, color: '#9d7eeb' },
    { name: 'Admin & Operations', value: 10, color: '#bea9f3' },
  ]);
  const [IMPACT_METRICS, setImpactMetrics] = useState([
    { name: 'Students Supported', count: 156, icon: <Users className="h-5 w-5 text-purple-600" /> },
    { name: 'Classrooms Equipped', count: 42, icon: <Award className="h-5 w-5 text-purple-600" /> },
    { name: 'Books Provided', count: 1208, icon: <BookOpen className="h-5 w-5 text-purple-600" /> },
  ]);
  const [GOAL_PROGRESS] = useState([
    { name: 'Laptops', current: 28, goal: 50 },
    { name: 'Teacher Training', current: 15, goal: 20 },
    { name: 'School Meals', current: 8500, goal: 10000 },
  ]);
  const [BENEFICIARY_STORIES, setBeneficiaryStories] = useState([
    {
      name: "Maria, 9th Grade",
      content: "With the new laptops and textbooks, I can now do research for my projects efficiently. I hope to become a doctor someday.",
      date: "January 2025"
    },
    {
      name: "James, 7th Grade",
      content: "The after-school program has helped me improve my math skills. I used to struggle, but now I'm at the top of my class!",
      date: "February 2025"
    },
    {
      name: "Sarah, Teacher",
      content: "The teaching resources have transformed how I engage students. They're more enthusiastic and invested in learning.",
      date: "March 2025"
    }
  ]);

  const IMPACT_IMAGES = [
    {
      src: "/lovable-uploads/626b1e7c-b8d4-44de-8562-dfe51d48d007.png",
      alt: "Students collaborating on schoolwork",
      caption: "Students working together on an assignment in rural community school"
    },
    {
      src: "/lovable-uploads/f78bcef6-f92f-4076-9fc6-d323611c46b2.png",
      alt: "Students in classroom with masks",
      caption: "Safe learning environment with proper health protocols in place"
    },
    {
      src: "/lovable-uploads/d7d25a2a-6e15-4fa5-bc93-32cd62937878.png",
      alt: "Boys studying with textbooks",
      caption: "Young students using new learning materials provided by donors"
    }
  ];

  const handleUpdateMetrics = (updatedMetrics: any[]) => {
    setImpactMetrics(updatedMetrics);
  };

  const handleUpdateAllocation = (updatedAllocation: any[]) => {
    setAllocationData(updatedAllocation);
  };

  const handleAddStory = (newStory: any) => {
    setBeneficiaryStories(prev => [newStory, ...prev]);
  };

  const isMobile = useIsMobile();
  const screenWidth = useScreenWidth();

  useEffect(() => {
    setAnimateIn(true);
    
    const timer = setTimeout(() => {
      const animateProgress = () => {
        setProgressValue(prev => {
          const next = prev + 1;
          return next <= 65 ? next : 65;
        });
      };
      
      const progressInterval = setInterval(animateProgress, 15);
      return () => clearInterval(progressInterval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setIsCustomActive(false);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(null);
      setIsCustomActive(true);
    }
  };

  const handleCustomFocus = () => {
    setIsCustomActive(true);
    setSelectedAmount(null);
  };

  const getDonationAmount = (): number => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseFloat(customAmount);
    return 0;
  };

  const handleDonate = () => {
    const amount = getDonationAmount();
    if (amount <= 0) return;

    setIsSubmitting(true);
    
    try {
      openYodlCheckout({ 
        amount,
        organizationName 
      });
      
      console.log(`Redirecting to Yodl checkout for $${amount} donation to ${organizationName}`);
      
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Error opening Yodl checkout:', error);
      setIsSubmitting(false);
    }
  };

  const getImpactSummary = () => {
    const amount = getDonationAmount();
    if (amount <= 0) return "";
    
    if (selectedAmount === 25 || (isCustomActive && amount === 25)) {
      return `Your $25 donation supports learning materials for 5 students`;
    }
    
    if (amount <= 5) return `Your $${amount} donation equips a student with school supplies`;
    if (amount <= 10) return `Your $${amount} donation funds ${Math.floor(amount/10)} day${amount >= 20 ? 's' : ''} of education`;
    if (amount <= 25) return `Your $${amount} donation supports learning materials for ${Math.ceil(amount/5)} students`;
    return `Your $${amount} donation sponsors ${Math.floor(amount/50)} student${amount >= 100 ? 's' : ''} for a month`;
  };

  const isValidAmount = getDonationAmount() > 0;

  const handleTabChange = (value: string) => {
    console.log("Switching to tab:", value);
    setActiveTab(value);
  };

  return (
    <div className={cn(
      "w-full bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 relative",
      "border border-gray-100",
      animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <WalletConnect />
      
      <div className="p-6 flex flex-col items-center">
        <div className={cn(
          "w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center mb-4 transition-all",
          "bg-purple-100 duration-700 delay-100",
          animateIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <HandHeart className="w-8 h-8 text-purple-600" />
        </div>

        <div className={cn(
          "text-center mb-5 transition-all duration-700 delay-200",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{organizationName}</h2>
          <p className="text-sm text-gray-600">{missionStatement}</p>
        </div>

        <div className={cn(
          "w-full mb-4 transition-all duration-700 delay-250",
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-700 font-medium">
              $3,250 raised
            </span>
            <span className="text-sm text-gray-600">
              $5,000 goal
            </span>
          </div>
          <Progress 
            value={progressValue} 
            className="h-2.5 bg-gray-100 rounded-full" 
          />
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="donate" className="flex items-center justify-center gap-1.5">
              <HandHeart className="h-5 w-5" />
              {!isMobile && <span>Donate</span>}
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center justify-center gap-1.5">
              <Target className="h-5 w-5" />
              {!isMobile && <span>Impact</span>}
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center justify-center gap-1.5">
              <Users className="h-5 w-5" />
              {!isMobile && <span>Community</span>}
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center justify-center gap-1.5">
              <History className="h-5 w-5" />
              {!isMobile && <span>History</span>}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="donate" className="space-y-4">
            <div className={cn(
              "w-full flex flex-col gap-3 mb-4 transition-all duration-700 delay-300",
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              {PREDEFINED_AMOUNTS.map((amount, index) => (
                <DonationAmount
                  key={amount}
                  value={amount}
                  selected={selectedAmount === amount}
                  onClick={handleAmountSelect}
                  impactStatement={IMPACT_STATEMENTS[amount as keyof typeof IMPACT_STATEMENTS]}
                  specialItem={SPECIAL_ITEMS[amount as keyof typeof SPECIAL_ITEMS]}
                  isPopular={amount === POPULAR_TIER}
                  boxSize={index + 1}
                  iconType={
                    amount === 5 ? 'supplies' :
                    amount === 10 ? 'day' :
                    amount === 25 ? 'week' :
                    'month'
                  }
                />
              ))}
            </div>

            <div className={cn(
              "w-full mb-4 transition-all duration-700 delay-400",
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <CustomAmount
                active={isCustomActive}
                value={customAmount}
                onChange={handleCustomAmountChange}
                onFocus={handleCustomFocus}
              />
            </div>

            {isValidAmount && (
              <div className={cn(
                "w-full mb-4 p-3 bg-purple-50 border border-purple-100 rounded-xl text-sm text-purple-800",
                "transition-all duration-300"
              )}>
                {getImpactSummary()}
              </div>
            )}
            
            <div className={cn(
              "w-full transition-all duration-700 delay-500",
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <button
                className="w-full py-3 px-4 bg-donation-purple text-white rounded-xl
                         text-base font-semibold tracking-wide transition-all duration-300
                         hover:bg-[#7C3AED] active:scale-[0.98] shadow-md
                         hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-donation-purple
                         focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isValidAmount || isSubmitting}
                onClick={handleDonate}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span>Donate ${getDonationAmount()} with Yodl</span>
                )}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="impact">
            <div className="space-y-5 relative">
              <AdminControls 
                impactMetrics={IMPACT_METRICS}
                onUpdateMetrics={handleUpdateMetrics}
                fundAllocation={ALLOCATION_DATA}
                onUpdateAllocation={handleUpdateAllocation}
                onAddStory={handleAddStory}
              />
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {IMPACT_METRICS.map((metric) => (
                  <Card key={metric.name} className="shadow-sm border-purple-100">
                    <CardContent className="p-3 flex flex-col items-center justify-center text-center">
                      <div className="mb-1">{metric.icon}</div>
                      <span className="text-lg font-bold text-purple-800">{metric.count}</span>
                      <span className="text-xs text-gray-600">{metric.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-3 text-gray-800 flex items-center gap-1.5">
                  <PieChart className="h-4 w-4 text-purple-600" />
                  Fund Allocation
                </h3>
                <div className="flex flex-col items-center">
                  <div className="h-64 w-full mb-4">
                    <ChartContainer config={ALLOCATION_DATA.reduce((acc, curr) => ({ ...acc, [curr.name]: { color: curr.color } }), {})} className="h-full">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                          data={ALLOCATION_DATA}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {ALLOCATION_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </RechartsPieChart>
                    </ChartContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full max-w-xs">
                    {ALLOCATION_DATA.map((item) => (
                      <div key={item.name} className="flex items-center gap-1.5 text-xs">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-700">{item.name}</span>
                        <span className="font-medium ml-auto">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-3 text-gray-800 flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                  Progress Toward Goals
                </h3>
                <div className="space-y-3">
                  {GOAL_PROGRESS.map((goal) => (
                    <div key={goal.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-700">{goal.name}</span>
                        <span className="font-medium text-gray-800">
                          {goal.current}/{goal.goal}
                        </span>
                      </div>
                      <Progress value={(goal.current / goal.goal) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-800 flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-purple-600" />
                  Stories of Impact
                </h3>
                <div className="space-y-3">
                  {BENEFICIARY_STORIES.map((story, index) => (
                    <Card key={index} className="shadow-sm border-purple-100">
                      <CardContent className="p-3.5">
                        <div className="flex flex-col sm:flex-row gap-2">
                          {index < IMPACT_IMAGES.length && (
                            <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                              <img 
                                src={IMPACT_IMAGES[index].src} 
                                alt={IMPACT_IMAGES[index].alt} 
                                className="w-full h-auto object-cover rounded-md aspect-[4/3]"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-purple-800 mb-1">{story.name}</h4>
                            <p className="text-xs text-gray-600 mb-2">{story.content}</p>
                            <span className="text-[10px] text-gray-400 block text-right">{story.date}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <CommunityTab onSwitchToDonateTab={() => handleTabChange("donate")} />
          </TabsContent>

          <TabsContent value="history">
            <HistoryTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DonationWidget;
