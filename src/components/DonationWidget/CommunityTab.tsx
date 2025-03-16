import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Award, Activity, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Donor {
  id: string;
  name: string;
  ens?: string;
  avatarUrl?: string;
  totalDonated: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

// Sample data for the leaderboard
const SAMPLE_DONORS: Donor[] = [
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

// Component that displays buttons for navigation between different community views
const CommunityNav: React.FC<{
  activeView: string;
  setActiveView: (view: string) => void;
}> = ({ activeView, setActiveView }) => {
  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      <Button 
        variant={activeView === 'leaderboard' ? 'default' : 'outline'} 
        onClick={() => setActiveView('leaderboard')}
        className="flex flex-col items-center justify-center gap-1 py-2 px-1"
      >
        <Award className="h-5 w-5" />
        <span className="text-xs">Leaderboard</span>
      </Button>
      <Button 
        variant={activeView === 'activity' ? 'default' : 'outline'} 
        onClick={() => setActiveView('activity')}
        className="flex flex-col items-center justify-center gap-1 py-2 px-1"
      >
        <Activity className="h-5 w-5" />
        <span className="text-xs">Activity</span>
      </Button>
      <Button 
        variant={activeView === 'challenges' ? 'default' : 'outline'} 
        onClick={() => setActiveView('challenges')}
        className="flex flex-col items-center justify-center gap-1 py-2 px-1"
      >
        <Target className="h-5 w-5" />
        <span className="text-xs">Challenges</span>
      </Button>
      <Button 
        variant={activeView === 'social' ? 'default' : 'outline'} 
        onClick={() => setActiveView('social')}
        className="flex flex-col items-center justify-center gap-1 py-2 px-1"
      >
        <Users className="h-5 w-5" />
        <span className="text-xs">Social</span>
      </Button>
    </div>
  );
};

// Component that displays leaderboard filters
const LeaderboardFilters: React.FC<{
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  viewType: string;
  setViewType: (type: string) => void;
}> = ({ timeFilter, setTimeFilter, viewType, setViewType }) => {
  return (
    <div className="space-y-2 mb-4">
      <div className="flex space-x-2">
        <Button 
          variant={timeFilter === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setTimeFilter('all')}
          className={cn(
            "rounded-full px-4 py-1 h-auto text-sm",
            timeFilter === 'all' ? "bg-purple-700 hover:bg-purple-800" : ""
          )}
        >
          All Time
        </Button>
        <Button 
          variant={timeFilter === 'month' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setTimeFilter('month')}
          className={cn(
            "rounded-full px-4 py-1 h-auto text-sm",
            timeFilter === 'month' ? "bg-purple-700 hover:bg-purple-800" : ""
          )}
        >
          This Month
        </Button>
        <Button 
          variant={timeFilter === 'week' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setTimeFilter('week')}
          className={cn(
            "rounded-full px-4 py-1 h-auto text-sm",
            timeFilter === 'week' ? "bg-purple-700 hover:bg-purple-800" : ""
          )}
        >
          This Week
        </Button>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant={viewType === 'individual' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setViewType('individual')}
          className={cn(
            "rounded-full px-4 py-1 h-auto text-sm",
            viewType === 'individual' ? "bg-purple-700 hover:bg-purple-800" : ""
          )}
        >
          <Users className="h-3.5 w-3.5 mr-1.5" />
          Individual
        </Button>
        <Button 
          variant={viewType === 'group' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setViewType('group')}
          className={cn(
            "rounded-full px-4 py-1 h-auto text-sm",
            viewType === 'group' ? "bg-purple-700 hover:bg-purple-800" : ""
          )}
        >
          <Users className="h-3.5 w-3.5 mr-1.5" />
          Groups
        </Button>
      </div>
    </div>
  );
};

// Helper function to generate tier badges
const getTierBadge = (tier: Donor['tier']) => {
  const tiers = {
    bronze: { color: 'bg-amber-700 text-amber-100', label: 'Bronze' },
    silver: { color: 'bg-gray-400 text-gray-800', label: 'Silver' },
    gold: { color: 'bg-yellow-400 text-yellow-800', label: 'Gold' },
    platinum: { color: 'bg-purple-600 text-purple-100', label: 'Platinum' },
  };
  
  return (
    <Badge className={cn("ml-2 px-3 py-1 rounded-full", tiers[tier].color)}>
      {tiers[tier].label}
    </Badge>
  );
};

// Main Community Tab component
const CommunityTab: React.FC = () => {
  const [activeView, setActiveView] = useState('leaderboard');
  const [timeFilter, setTimeFilter] = useState('all');
  const [viewType, setViewType] = useState('individual');
  
  // Filter and sort donors for the leaderboard
  const filteredDonors = SAMPLE_DONORS.sort((a, b) => b.totalDonated - a.totalDonated);

  // Only render the leaderboard view for now
  return (
    <div className="space-y-4">
      <CommunityNav 
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {activeView === 'leaderboard' && (
        <>
          <LeaderboardFilters
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            viewType={viewType}
            setViewType={setViewType}
          />
          
          <div className="mt-6">
            {/* Table header */}
            <div className="grid grid-cols-3 mb-2 px-4 text-sm text-gray-500 font-medium">
              <div>Rank</div>
              <div>Donor</div>
              <div className="text-right">Amount</div>
            </div>
            
            {/* Donor rows */}
            <div className="space-y-4">
              {filteredDonors.map((donor, index) => (
                <div 
                  key={donor.id}
                  className="grid grid-cols-3 items-center py-3 px-4 border-b border-gray-100"
                >
                  <div className="text-lg font-semibold text-gray-700">
                    {index + 1}
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      {donor.avatarUrl ? (
                        <AvatarImage src={donor.avatarUrl} alt={donor.name} />
                      ) : (
                        <AvatarFallback className="bg-purple-100 text-purple-800">
                          {donor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 flex items-center">
                        {donor.name}
                        {getTierBadge(donor.tier)}
                      </div>
                      {donor.ens && (
                        <div className="text-sm text-gray-500">{donor.ens}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-right font-bold text-xl">${donor.totalDonated}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Other views would be implemented here */}
      {activeView === 'activity' && (
        <div className="py-8 text-center text-gray-500">
          Activity feed would be displayed here
        </div>
      )}
      
      {activeView === 'challenges' && (
        <div className="py-8 text-center text-gray-500">
          Community challenges would be displayed here
        </div>
      )}
      
      {activeView === 'social' && (
        <div className="py-8 text-center text-gray-500">
          Social connections would be displayed here
        </div>
      )}

      <div className="text-center text-sm text-gray-500 pt-2">
        Connect with the Hope Foundation community
      </div>
    </div>
  );
};

export default CommunityTab;
