import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  Target, 
  Award, 
  ArrowRight, 
  Megaphone, 
  ArrowRightLeft, 
  Send, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ExternalLink,
  Trophy,
  Timer,
  Clock,
  Star,
  Heart,
  Share2,
  BadgeDollarSign,
  CalendarClock,
  Gift,
  Clock3,
  Circle,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useIsMobile, useScreenWidth, useIsBreakpoint, Breakpoint, useResponsivePadding } from "@/hooks/use-mobile";
import WelcomeMessageModal from "./WelcomeMessageModal";
import ThanksMessageModal from "./ThanksMessageModal";
import JoinChallengeModal, { Challenge } from "./JoinChallengeModal";
import { useToast } from "@/hooks/use-toast";

interface CommunityTabProps {
  onSwitchToDonateTab: () => void; // Make this required, not optional
}

// Sample data for the top donors leaderboard
const TOP_DONORS = [
  { 
    id: '1', 
    name: 'Alex Johnson', 
    ens: 'alex.eth', 
    avatarUrl: '/lovable-uploads/626b1e7c-b8d4-44de-8562-dfe51d48d007.png', 
    totalDonated: 2500, 
    tier: 'platinum' 
  },
  { 
    id: '2', 
    name: 'Maria Rodriguez', 
    ens: 'maria.eth', 
    avatarUrl: '/lovable-uploads/f78bcef6-f92f-4076-9fc6-d323611c46b2.png', 
    totalDonated: 1200, 
    tier: 'gold' 
  },
  { 
    id: '3', 
    name: 'James Smith', 
    ens: 'jsmith.eth', 
    avatarUrl: '/lovable-uploads/d7d25a2a-6e15-4fa5-bc93-32cd62937878.png', 
    totalDonated: 750, 
    tier: 'silver' 
  },
  { 
    id: '4', 
    name: 'Michael Brown', 
    ens: 'mbrown.eth', 
    totalDonated: 600, 
    tier: 'silver' 
  },
  { 
    id: '5', 
    name: 'Sarah Williams', 
    totalDonated: 350, 
    tier: 'bronze' 
  },
];

// Sample data for active challenges
const ACTIVE_CHALLENGES: Challenge[] = [
  { 
    id: '1', 
    name: 'Summer School Drive', 
    goal: 10000, 
    current: 6500, 
    participants: 48,
    daysLeft: 14,
    description: "Help us provide essential school supplies and support for summer education programs for children in need."
  },
  { 
    id: '2', 
    name: 'Teacher Support Fund', 
    goal: 5000, 
    current: 2200, 
    participants: 25,
    daysLeft: 7,
    description: "Support our dedicated teachers with resources and tools they need for effective classroom education."
  },
  { 
    id: '3', 
    name: 'Classroom Technology', 
    goal: 12000, 
    current: 3600, 
    participants: 32,
    daysLeft: 21,
    description: "Help equip classrooms with modern technology to enhance learning experiences for students."
  },
];

// Sample data for community stats
const COMMUNITY_STATS = [
  { name: 'Total Donors', value: 523, icon: <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" /> },
  { name: 'This Month', value: 82, icon: <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" /> },
  { name: 'Challenge Participants', value: 137, icon: <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" /> },
];

// Sample data for community messages with transaction memos
const COMMUNITY_MESSAGES = [
  { 
    id: '1', 
    fromAddress: '0x3a42bd7309f75c8ca2c5c0d2f4383a1b209c8f7e', 
    toAddress: '0xf081fcda3db1f9b2667b6e454bcd27d9c338f2667', 
    amount: 1.00, 
    type: 'swap',
    timestamp: '4:37 PM', 
    memo: '📢 Join us at HotDesk today',
    isPromo: true,
    hasUrl: true
  },
  { 
    id: '2', 
    fromAddress: '0x7812fcbd9b958f3a61ef01233a9414cdc764f8ba', 
    toAddress: '0x6291f9ac3625e1a824ad4c5d6b77726d5f809713', 
    amount: 5.50, 
    type: 'send',
    timestamp: '2 hours ago', 
    memo: 'Donation for the classroom supplies. Hope this helps the kids! Let me know if you need anything else.',
    isPromo: false,
    hasUrl: false
  },
  { 
    id: '3', 
    fromAddress: '0x9e24cdb58547cb5f8fa78741d01748fabb763353', 
    toAddress: '0xa1b292a8e14340d8324ea05fddac8d3bec46f269', 
    amount: 25.00, 
    type: 'receive',
    timestamp: '1 day ago', 
    memo: '❤️ Monthly contribution to the scholarship fund. Keep up the amazing work! Visit schoolfund.org for more info',
    isPromo: true,
    hasUrl: true
  },
  { 
    id: '4', 
    fromAddress: '0xb08ed45cf5c8be23b55cf92fa96208058b72fc1d', 
    toAddress: '0xd4e254bc372a72caed91f1bf307f539dd622a112', 
    amount: 10.25, 
    type: 'swap',
    timestamp: '3 days ago', 
    memo: 'Supporting the summer program 🌞 Looking forward to seeing the results!',
    isPromo: false,
    hasUrl: false
  },
  { 
    id: '5', 
    fromAddress: '0x2a9e7bbe5d823d781a8f3ebf341abbbd4d91a46c', 
    toAddress: '0x8f72d3b45c5478d7615b86957b4d3f95202c1b85', 
    amount: 2.75, 
    type: 'send',
    timestamp: '1 week ago', 
    memo: 'Teacher appreciation fund contribution 🍎👩‍🏫👨‍🏫',
    isPromo: false,
    hasUrl: false
  },
];

// Sample data for milestone cards
const MILESTONE_CARDS = [
  {
    id: 'm1',
    title: "We've reached 65% of our goal!",
    currentAmount: 6500,
    goalAmount: 10000,
    dateReached: "February 15, 2025",
    icon: <Trophy className="h-6 w-6 text-yellow-400" />
  },
  {
    id: 'm2',
    title: "500 Donors Milestone!",
    subtitle: "Our community keeps growing stronger",
    dateReached: "January 28, 2025",
    icon: <Star className="h-6 w-6 text-yellow-400" />
  }
];

// Sample data for matching period cards
const MATCHING_CARDS = [
  {
    id: 'mp1',
    matchRatio: "2X MATCH",
    sponsor: "The Smith Foundation",
    endDate: "March 15, 2025",
    timeRemaining: "2 days, 4 hours",
    remainingFunds: 25000,
    state: "active" // active, ending-soon, completed
  }
];

// Sample data for new donor welcome cards
const WELCOME_CARDS = [
  {
    id: 'w1',
    name: "Emily Parker",
    ens: "emily.eth",
    avatarUrl: null,
    initialDonation: 50,
    joinDate: "March 1, 2025"
  },
  {
    id: 'w2',
    name: "David Wilson",
    ens: "davidw.eth",
    avatarUrl: null,
    initialDonation: 25,
    joinDate: "March 3, 2025"
  }
];

// Sample data for donor appreciation cards
const APPRECIATION_CARDS = [
  {
    id: 'a1',
    name: "Sarah Williams",
    avatarUrl: null,
    milestone: "10th donation",
    streak: 10,
    totalContribution: 750
  }
];

// Helper function to generate tier badges
const getTierBadge = (tier: string) => {
  const tiers: Record<string, { color: string, darkColor: string, label: string }> = {
    bronze: { 
      color: 'bg-amber-700 text-amber-100', 
      darkColor: 'bg-amber-700 text-amber-100',
      label: 'Bronze' 
    },
    silver: { 
      color: 'bg-gray-400 text-gray-800', 
      darkColor: 'bg-gray-400 text-gray-800',
      label: 'Silver' 
    },
    gold: { 
      color: 'bg-yellow-400 text-yellow-800', 
      darkColor: 'bg-yellow-400 text-yellow-800',
      label: 'Gold' 
    },
    platinum: { 
      color: 'bg-purple-600 text-purple-100', 
      darkColor: 'bg-purple-500 text-purple-100',
      label: 'Platinum' 
    },
  };
  
  return (
    <Badge className={`ml-2 px-2 py-0.5 rounded-full text-xs ${tiers[tier].color} dark:${tiers[tier].darkColor}`}>
      {tiers[tier].label}
    </Badge>
  );
};

// Helper function to truncate address
const truncateAddress = (address: string) => {
  return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
};

// Helper function to get transaction icon
const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'swap':
      return <ArrowRightLeft className="h-5 w-5 text-green-600 dark:text-green-400" />;
    case 'send':
      return <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    case 'receive':
      return <ArrowDownLeft className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
    default:
      return <Megaphone className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
  }
};

// Helper function to get transaction label
const getTransactionLabel = (type: string) => {
  const labels: Record<string, { color: string, darkColor: string, label: string }> = {
    swap: { 
      color: 'bg-purple-100 text-purple-800', 
      darkColor: 'bg-purple-900/30 text-purple-300',
      label: 'swap' 
    },
    send: { 
      color: 'bg-blue-100 text-blue-800', 
      darkColor: 'bg-blue-900/30 text-blue-300',
      label: 'send' 
    },
    receive: { 
      color: 'bg-green-100 text-green-800', 
      darkColor: 'bg-green-900/30 text-green-300',
      label: 'receive' 
    },
    announcement: { 
      color: 'bg-amber-100 text-amber-800', 
      darkColor: 'bg-amber-900/30 text-amber-300',
      label: 'announcement' 
    },
  };
  
  return (
    <Badge className={`px-2 py-0.5 rounded-full text-xs ${labels[type].color} dark:${labels[type].darkColor}`}>
      {labels[type].label}
    </Badge>
  );
};

// Helper function to format memo text with clickable links
const formatMemoText = (memo: string, hasUrl: boolean) => {
  if (!hasUrl) return memo;

  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+|\w+\.[a-z]{2,}(?:\.[a-z]{2,})?(?:\/[^\s]*)?)/gi;
  
  return memo.split(urlPattern).map((part, index) => {
    if (part.match(urlPattern)) {
      const url = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a 
          key={index} 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-600 dark:text-purple-400 underline inline-flex items-center"
        >
          {part} <ExternalLink className="h-3 w-3 ml-0.5" />
        </a>
      );
    }
    return part;
  });
};

// Helper function to get state badge for matching period cards
const getMatchingStateBadge = (state: string) => {
  const states: Record<string, { color: string, darkColor: string, label: string }> = {
    'active': { 
      color: 'bg-green-100 text-green-800 border border-green-500', 
      darkColor: 'bg-green-900/30 text-green-200 border border-green-600/70',
      label: 'Active' 
    },
    'ending-soon': { 
      color: 'bg-amber-100 text-amber-800 border border-amber-500', 
      darkColor: 'bg-amber-900/30 text-amber-200 border border-amber-600/70',
      label: 'Ending Soon' 
    },
    'completed': { 
      color: 'bg-gray-100 text-gray-800 border border-gray-400', 
      darkColor: 'bg-gray-700/50 text-gray-200 border border-gray-500/70',
      label: 'Completed' 
    },
  };
  
  return (
    <Badge className={`px-2 py-0.5 rounded-full text-xs ${states[state].color} dark:${states[state].darkColor} font-medium`}>
      {states[state].label}
    </Badge>
  );
};

// Main Community Tab component
const CommunityTab: React.FC<CommunityTabProps> = ({ onSwitchToDonateTab }) => {
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [selectedDonor, setSelectedDonor] = useState<any | null>(null);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [thanksModalOpen, setThanksModalOpen] = useState(false);
  const [selectedAppreciationDonor, setSelectedAppreciationDonor] = useState<any | null>(null);
  const [joinChallengeModalOpen, setJoinChallengeModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const isMobile = useIsMobile();
  const screenWidth = useScreenWidth();
  const isXSmallScreen = useIsBreakpoint(Breakpoint.XS);
  const isSmallScreen = useIsBreakpoint(Breakpoint.SM);
  const { cardSpacing, cardPadding, avatarSize, sectionSpacing, textSpacing, elementSpacing, buttonSpacing } = useResponsivePadding();
  const { toast } = useToast();

  const toggleExpandMessage = (id: string) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  const handleOpenWelcomeModal = (donor: any) => {
    setSelectedDonor(donor);
    setWelcomeModalOpen(true);
  };

  const handleOpenThanksModal = (donor: any) => {
    setSelectedAppreciationDonor({
      ...donor,
      donationDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    });
    setThanksModalOpen(true);
  };

  const handleOpenJoinChallengeModal = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setJoinChallengeModalOpen(true);
  };

  const handleJoinChallenge = async (challengeId: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Joined challenge: ${challengeId}`);
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="space-y-6 py-2">
      {/* Welcome Message Modal */}
      {selectedDonor && (
        <WelcomeMessageModal
          open={welcomeModalOpen}
          onOpenChange={setWelcomeModalOpen}
          donor={selectedDonor}
        />
      )}

      {/* Thanks Message Modal */}
      {selectedAppreciationDonor && (
        <ThanksMessageModal
          open={thanksModalOpen}
          onOpenChange={setThanksModalOpen}
          donor={selectedAppreciationDonor}
        />
      )}

      {/* Join Challenge Modal */}
      {selectedChallenge && (
        <JoinChallengeModal
          open={joinChallengeModalOpen}
          onOpenChange={setJoinChallengeModalOpen}
          challenge={selectedChallenge}
          onJoinChallenge={handleJoinChallenge}
        />
      )}

      {/* Matching Period Card - Pinned at top when active */}
      {MATCHING_CARDS.length > 0 && MATCHING_CARDS[0].state !== 'completed' && (
        <Card className="border-2 border-purple-300 dark:border-purple-500/50 bg-purple-50/60 dark:bg-purple-900/20 shadow-sm overflow-hidden">
          <CardContent className={`p-4 ${isMobile ? 'pb-5' : ''}`}>
            <div className={`flex ${isMobile ? 'flex-col' : 'items-start'} gap-4`}>
              <div className={`${isMobile ? 'mx-auto mb-2' : ''} h-14 w-14 rounded-full bg-purple-100 dark:bg-purple-800/50 flex items-center justify-center`}>
                <BadgeDollarSign className="h-8 w-8 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="flex-1">
                <div className={`flex ${isMobile ? 'flex-col items-center' : 'items-start justify-between'} ${isMobile ? 'text-center' : ''}`}>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300">{MATCHING_CARDS[0].matchRatio}</h3>
                    <p className="text-gray-700 dark:text-donation-dark-text-secondary">Sponsored by {MATCHING_CARDS[0].sponsor}</p>
                  </div>
                  {isMobile ? (
                    <div className="mt-2 mb-3">
                      {getMatchingStateBadge(MATCHING_CARDS[0].state)}
                    </div>
                  ) : (
                    getMatchingStateBadge(MATCHING_CARDS[0].state)
                  )}
                </div>
                <div className={`mt-3 flex items-center text-sm text-gray-600 dark:text-donation-dark-text-secondary ${isMobile ? 'justify-center' : ''}`}>
                  <Clock className="h-4 w-4 mr-1 text-purple-600 dark:text-purple-400" />
                  <span>Ends: {MATCHING_CARDS[0].endDate} ({MATCHING_CARDS[0].timeRemaining} remaining)</span>
                </div>
                <div className={`mt-1 text-sm text-gray-600 dark:text-donation-dark-text-secondary ${isMobile ? 'text-center' : ''}`}>
                  <span>${MATCHING_CARDS[0].remainingFunds.toLocaleString()} matching funds available</span>
                </div>
                <Button 
                  className="mt-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 dark:text-white w-full"
                  onClick={() => {
                    if (onSwitchToDonateTab) {
                      onSwitchToDonateTab();
                    }
                  }}
                >
                  Donate Now - Get {MATCHING_CARDS[0].matchRatio.split(' ')[0]} Your Impact
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestone Card - High priority */}
      {MILESTONE_CARDS.length > 0 && (
        <Card className="border-none shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-700 dark:to-purple-900 text-white p-4 relative">
            <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start`}>
              <div className={`flex-1 ${isMobile ? 'mb-4 w-full text-center' : ''}`}>
                <div className={`flex items-center ${isMobile ? 'justify-center' : ''} space-x-2`}>
                  {MILESTONE_CARDS[0].icon}
                  <h3 className="text-xl font-bold">{MILESTONE_CARDS[0].title}</h3>
                </div>
                <p className={`mt-2 ${isMobile ? 'text-center' : ''}`}>
                  ${MILESTONE_CARDS[0].currentAmount?.toLocaleString()} of ${MILESTONE_CARDS[0].goalAmount?.toLocaleString()} goal reached
                </p>
                <p className={`text-sm mt-1 text-purple-100 ${isMobile ? 'text-center' : ''}`}>
                  Achieved on {MILESTONE_CARDS[0].dateReached}
                </p>
              </div>
              {isMobile ? (
                <div className="w-full flex justify-center">
                  <Button variant="secondary" size="sm" className="bg-white text-purple-800 hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200">
                    <Share2 className="mr-1 h-4 w-4" /> Share
                  </Button>
                </div>
              ) : (
                <Button variant="secondary" size="sm" className="bg-white text-purple-800 hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200">
                  <Share2 className="mr-1 h-4 w-4" /> Share
                </Button>
              )}
            </div>
            <div className={`absolute ${isMobile ? '-bottom-2 -right-2' : '-bottom-6 -right-6'}`}>
              <Star className={`${isMobile ? 'h-16 w-16' : 'h-24 w-24'} text-purple-300/30 dark:text-purple-400/20`} />
            </div>
          </div>
        </Card>
      )}

      {/* Community Stats Section */}
      <div className={`grid ${screenWidth < 380 ? 'grid-cols-1 gap-2' : 'grid-cols-3 gap-3'}`}>
        {COMMUNITY_STATS.map((stat, index) => (
          <Card key={index} className="shadow-sm border-gray-100 dark:border-donation-dark-border dark:bg-donation-dark-card">
            <CardContent className={`p-3 flex ${screenWidth < 380 ? 'flex-row justify-between items-center' : 'flex-col items-center justify-center text-center'}`}>
              <div className={`${screenWidth < 380 ? 'mr-3' : 'mb-1'}`}>{stat.icon}</div>
              <div className={`${screenWidth < 380 ? 'flex flex-row items-center' : 'text-center'}`}>
                <span className="text-lg font-bold text-purple-800 dark:text-purple-300">{stat.value}</span>
                <span className={`text-xs text-gray-600 dark:text-donation-dark-text-secondary ${screenWidth < 380 ? 'ml-2' : 'block'}`}>{stat.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Donors Section */}
      <Card className="shadow-sm border-gray-100 dark:border-donation-dark-border dark:bg-donation-dark-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2 dark:text-donation-dark-text">
            <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            Top Donors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {TOP_DONORS.map((donor, index) => {
              const isSmallScreen = screenWidth < 340;
              
              return (
                <div 
                  key={donor.id}
                  className={`flex items-center gap-2 py-2 ${isSmallScreen ? 'flex-wrap' : ''}`}
                >
                  <div className="text-lg font-semibold text-gray-500 dark:text-donation-dark-gray-light w-6 text-center shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex items-center flex-1 min-w-0">
                    <Avatar className="h-9 w-9 mr-3 shrink-0">
                      {donor.avatarUrl ? (
                        <AvatarImage src={donor.avatarUrl} alt={donor.name} />
                      ) : (
                        <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
                          {donor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className={`font-medium text-gray-900 dark:text-donation-dark-text flex ${isSmallScreen ? 'flex-col items-start' : 'items-center'} text-sm`}>
                        <span className="truncate">{donor.name}</span>
                        {!isSmallScreen && getTierBadge(donor.tier)}
                      </div>
                      {donor.ens && (
                        <div className="text-xs text-gray-500 dark:text-donation-dark-text-secondary truncate">
                          {donor.ens}
                        </div>
                      )}
                      {isSmallScreen && (
                        <div className="mt-1">
                          {getTierBadge(donor.tier)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`text-right font-bold text-gray-900 dark:text-donation-dark-text ${isSmallScreen ? 'w-full justify-end flex pr-2' : ''}`}>
                    ${donor.totalDonated}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* New Donor Welcome Cards - Minimalist layout */}
      {WELCOME_CARDS.length > 0 && (
        <Card className="shadow-sm border-gray-100 dark:border-donation-dark-border bg-gradient-to-br from-blue-50 to-purple-50 dark:bg-none dark:bg-donation-dark-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2 dark:text-donation-dark-text">
              <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Welcome New Donors
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className={cardSpacing}>
              {WELCOME_CARDS.map(donor => (
                <div key={donor.id} className="bg-white dark:bg-donation-dark-gray rounded-lg shadow-sm">
                  <div className={cardPadding}>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <Avatar className={`${avatarSize} shrink-0`}>
                          {donor.avatarUrl ? (
                            <AvatarImage src={donor.avatarUrl} alt={donor.name} />
                          ) : (
                            <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                              {donor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="text-gray-900 dark:text-donation-dark-text font-medium">
                            {donor.name}
                          </div>
                          {donor.ens && (
                            <div className="text-sm text-gray-500/80 dark:text-donation-dark-text-secondary truncate">
                              {donor.ens}
                            </div>
                          )}
                          <div className="text-xs text-gray-500/70 dark:text-donation-dark-gray-light mt-1 flex items-center">
                            <Clock3 className="h-3 w-3 mr-1 text-gray-400/80 dark:text-gray-500" />
                            {donor.joinDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium text-lg text-purple-700 dark:text-purple-300">
                          ${donor.initialDonation}
                        </span>
                      </div>
                    </div>
                    <div className={buttonSpacing}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-center h-10 px-4 border-purple-200 dark:border-purple-500/30 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/30 dark:text-donation-dark-text dark:hover:text-purple-300"
                        onClick={() => handleOpenWelcomeModal(donor)}
                      >
                        <Send className="h-4 w-4 mr-2" /> Send Welcome
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Donor Appreciation Cards - Minimalist layout */}
      {APPRECIATION_CARDS.length > 0 && (
        <Card className="shadow-sm border-gray-100 dark:border-donation-dark-border bg-gradient-to-r from-amber-50 to-yellow-50 dark:bg-none dark:bg-donation-dark-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2 dark:text-donation-dark-text">
              <Star className="h-4 w-4 text-amber-500 dark:text-amber-400" />
              Donor Appreciation
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className={cardSpacing}>
              {APPRECIATION_CARDS.map(donor => (
                <div key={donor.id} className="bg-white dark:bg-donation-dark-gray rounded-lg shadow-sm">
                  <div className={cardPadding}>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="relative shrink-0">
                          <Avatar className={avatarSize}>
                            {donor.avatarUrl ? (
                              <AvatarImage src={donor.avatarUrl} alt={donor.name} />
                            ) : (
                              <AvatarFallback className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                                {donor.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 bg-amber-400 dark:bg-amber-500 rounded-full p-0.5">
                            <Gift className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-gray-900 dark:text-donation-dark-text font-medium">
                            {donor.name}
                          </div>
                          <div className="text-sm text-amber-600 dark:text-amber-300 font-medium">
                            {donor.milestone}
                          </div>
                          <div className="text-xs text-gray-500/70 dark:text-donation-dark-text-secondary mt-1">
                            Total: ${donor.totalContribution}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center bg-amber-50 dark:bg-amber-900/30 px-3 py-1 rounded-lg">
                        <span className="text-lg font-bold text-amber-500 dark:text-amber-300 leading-none">
                          {donor.streak}
                        </span>
                        <span className="text-2xs text-amber-600/70 dark:text-amber-400/70">streak</span>
                      </div>
                    </div>
                    <div className={buttonSpacing}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-center h-10 px-4 border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50"
                        onClick={() => handleOpenThanksModal(donor)}
                      >
                        <Heart className="h-4 w-4 mr-2 text-red-500 dark:text-red-400" /> Send Thanks
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Challenges Section */}
      <Card className="shadow-sm border-gray-100 dark:border-donation-dark-border dark:bg-donation-dark-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2 dark:text-donation-dark-text">
            <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            Active Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ACTIVE_CHALLENGES.map((challenge) => (
              <div key={challenge.id} className="bg-gray-50 dark:bg-donation-dark-gray rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-gray-900 dark:text-donation-dark-text">{challenge.name}</div>
                  <Badge variant="timeIndicator" className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                    {challenge.daysLeft} days left
                  </Badge>
                </div>
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-donation-dark-text-secondary">
                    <span>{challenge.participants} participants</span>
                    <span>${challenge.current} of ${challenge.goal}</span>
                  </div>
                  <Progress 
                    value={(challenge.current / challenge.goal) * 100} 
                    className="h-2 bg-gray-200 dark:bg-donation-dark-gray-medium" 
                  />
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 dark:text-white"
                  onClick={() => handleOpenJoinChallengeModal(challenge)}
                >
                  Join Challenge
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-gray-500 dark:text-donation-dark-gray-light pt-1 pb-2">
        Join the Hope Foundation community and make a difference
      </div>
    </div>
  );
};

export default CommunityTab;
