
import React from 'react';
import { Users, Activity, Target, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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

// Sample data for recent activity
const RECENT_ACTIVITY = [
  { id: '1', name: 'Jordan Lee', ens: 'jlee.eth', amount: 120, timestamp: '10 minutes ago' },
  { id: '2', name: 'Emma Chang', amount: 75, timestamp: '2 hours ago' },
  { id: '3', name: 'Daniel Kim', ens: 'dkim.eth', amount: 500, timestamp: '5 hours ago' },
  { id: '4', name: 'Olivia Park', amount: 25, timestamp: '1 day ago' },
  { id: '5', name: 'Liam Johnson', ens: 'ljohnson.eth', amount: 150, timestamp: '2 days ago' },
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

// Main Community Tab component
const CommunityTab: React.FC = () => {
  return (
    <div className="space-y-6 py-2">
      {/* Community Stats Section - MOVED ABOVE Leaderboard as requested */}
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

      {/* Recent Activity Section */}
      <Card className="shadow-sm border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-purple-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex justify-between items-center py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-purple-100 text-purple-800 text-xs">
                      {activity.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{activity.name}</div>
                    {activity.ens && <div className="text-xs text-gray-500">{activity.ens}</div>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">${activity.amount}</div>
                  <div className="text-xs text-gray-500">{activity.timestamp}</div>
                </div>
              </div>
            ))}
            <div className="pt-2 text-right">
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
