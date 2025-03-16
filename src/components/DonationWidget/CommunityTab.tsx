import React, { useState } from 'react';
import { Users, Activity, Target, Award, ArrowRight, Megaphone, ArrowRightLeft, Send, ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

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
const ACTIVE_CHALLENGES = [
  { 
    id: '1', 
    name: 'Summer School Drive', 
    goal: 10000, 
    current: 6500, 
    participants: 48,
    daysLeft: 14
  },
  { 
    id: '2', 
    name: 'Teacher Support Fund', 
    goal: 5000, 
    current: 2200, 
    participants: 25,
    daysLeft: 7
  },
  { 
    id: '3', 
    name: 'Classroom Technology', 
    goal: 12000, 
    current: 3600, 
    participants: 32,
    daysLeft: 21
  },
];

// Sample data for community stats
const COMMUNITY_STATS = [
  { name: 'Total Donors', value: 523, icon: <Users className="h-5 w-5 text-purple-600" /> },
  { name: 'This Month', value: 82, icon: <Activity className="h-5 w-5 text-purple-600" /> },
  { name: 'Challenge Participants', value: 137, icon: <Target className="h-5 w-5 text-purple-600" /> },
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

// Helper function to generate tier badges
const getTierBadge = (tier: string) => {
  const tiers: Record<string, { color: string, label: string }> = {
    bronze: { color: 'bg-amber-700 text-amber-100', label: 'Bronze' },
    silver: { color: 'bg-gray-400 text-gray-800', label: 'Silver' },
    gold: { color: 'bg-yellow-400 text-yellow-800', label: 'Gold' },
    platinum: { color: 'bg-purple-600 text-purple-100', label: 'Platinum' },
  };
  
  return (
    <Badge className={`ml-2 px-2 py-0.5 rounded-full text-xs ${tiers[tier].color}`}>
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
      return <ArrowRightLeft className="h-5 w-5 text-green-600" />;
    case 'send':
      return <ArrowUpRight className="h-5 w-5 text-blue-600" />;
    case 'receive':
      return <ArrowDownLeft className="h-5 w-5 text-purple-600" />;
    default:
      return <Megaphone className="h-5 w-5 text-purple-600" />;
  }
};

// Helper function to get transaction label
const getTransactionLabel = (type: string) => {
  const labels: Record<string, { color: string, label: string }> = {
    swap: { color: 'bg-purple-100 text-purple-800', label: 'swap' },
    send: { color: 'bg-blue-100 text-blue-800', label: 'send' },
    receive: { color: 'bg-green-100 text-green-800', label: 'receive' },
    announcement: { color: 'bg-amber-100 text-amber-800', label: 'announcement' },
  };
  
  return (
    <Badge className={`px-2 py-0.5 rounded-full text-xs ${labels[type].color}`}>
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
          className="text-purple-600 underline inline-flex items-center"
        >
          {part} <ExternalLink className="h-3 w-3 ml-0.5" />
        </a>
      );
    }
    return part;
  });
};

// Main Community Tab component
const CommunityTab: React.FC = () => {
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  const toggleExpandMessage = (id: string) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  return (
    <div className="space-y-6 py-2">
      {/* Community Stats Section */}
      <div className="grid grid-cols-3 gap-3">
        {COMMUNITY_STATS.map((stat, index) => (
          <Card key={index} className="shadow-sm border-gray-100">
            <CardContent className="p-3 flex flex-col items-center justify-center text-center">
              <div className="mb-1">{stat.icon}</div>
              <span className="text-lg font-bold text-purple-800">{stat.value}</span>
              <span className="text-xs text-gray-600">{stat.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Donors Section */}
      <Card className="shadow-sm border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-600" />
            Top Donors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {TOP_DONORS.map((donor, index) => (
              <div 
                key={donor.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-2"
              >
                <div className="text-lg font-semibold text-gray-500 w-6 text-center">
                  {index + 1}
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9 mr-3">
                    {donor.avatarUrl ? (
                      <AvatarImage src={donor.avatarUrl} alt={donor.name} />
                    ) : (
                      <AvatarFallback className="bg-purple-100 text-purple-800">
                        {donor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900 flex items-center text-sm">
                      {donor.name}
                      {getTierBadge(donor.tier)}
                    </div>
                    {donor.ens && (
                      <div className="text-xs text-gray-500">{donor.ens}</div>
                    )}
                  </div>
                </div>
                <div className="text-right font-bold">${donor.totalDonated}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Messages Section */}
      <Card className="shadow-sm border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-purple-600" />
            Community Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {COMMUNITY_MESSAGES.slice(0, 3).map((message) => (
              <div 
                key={message.id} 
                onClick={() => toggleExpandMessage(message.id)}
                className={`p-3 rounded-lg shadow-sm border border-gray-100 
                  ${message.isPromo ? 'bg-purple-50/50' : 'bg-gray-50/80'} 
                  cursor-pointer hover:shadow-md transition-shadow`}
              >
                {/* Transaction header */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-md bg-green-100 flex items-center justify-center">
                      {getTransactionIcon(message.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-gray-700">
                          To: {truncateAddress(message.toAddress)}
                        </span>
                        {getTransactionLabel(message.type)}
                      </div>
                      <div className="text-xs text-gray-500">{message.timestamp}</div>
                    </div>
                  </div>
                  <div className="text-right font-semibold">${message.amount.toFixed(2)}</div>
                </div>
                
                <Separator className="my-2 bg-gray-200" />
                
                {/* Transaction message */}
                <div className="mt-2 text-gray-800">
                  {message.memo.length > 70 && expandedMessage !== message.id ? (
                    <div>
                      <div className="text-sm">
                        {formatMemoText(message.memo.substring(0, 70) + '...', message.hasUrl)}
                      </div>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-purple-600 p-0 h-auto mt-1 font-normal"
                      >
                        Read more
                      </Button>
                    </div>
                  ) : (
                    <div className="text-sm">
                      {formatMemoText(message.memo, message.hasUrl)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <div className="pt-1 text-right">
              <Button variant="link" className="text-purple-600 text-sm p-0 h-auto">
                View More <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges Section */}
      <Card className="shadow-sm border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Target className="h-4 w-4 text-purple-600" />
            Active Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ACTIVE_CHALLENGES.map((challenge) => (
              <div key={challenge.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-gray-900">{challenge.name}</div>
                  <Badge className="bg-purple-100 text-purple-800 font-normal">
                    {challenge.daysLeft} days left
                  </Badge>
                </div>
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{challenge.participants} participants</span>
                    <span>${challenge.current} of ${challenge.goal}</span>
                  </div>
                  <Progress 
                    value={(challenge.current / challenge.goal) * 100} 
                    className="h-2 bg-gray-200" 
                  />
                </div>
                <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                  Join Challenge
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-gray-500 pt-1 pb-2">
        Join the Hope Foundation community and make a difference
      </div>
    </div>
  );
};

export default CommunityTab;
