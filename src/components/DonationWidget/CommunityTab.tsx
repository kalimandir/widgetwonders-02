
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Award, Calendar, Filter, History, MessageSquare, Target, Users, UserPlus, Flag, User, Link, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface Donor {
  id: string;
  name: string;
  ens?: string;
  avatarUrl?: string;
  totalDonated: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  isFollowing?: boolean;
}

interface DonationActivity {
  id: string;
  donorId: string;
  donorName: string;
  donorEns?: string;
  donorAvatarUrl?: string;
  amount: number;
  message?: string;
  timestamp: Date;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  deadline: Date;
  teamMembers: string[];
  createdBy: string;
}

// Sample data
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
    name: 'Sarah Williams', 
    totalDonated: 350, 
    tier: 'bronze' 
  },
  { 
    id: '5', 
    name: 'Michael Brown', 
    ens: 'mbrown.eth', 
    totalDonated: 600, 
    tier: 'silver' 
  },
];

const SAMPLE_ACTIVITIES: DonationActivity[] = [
  {
    id: '1',
    donorId: '1',
    donorName: 'Alex Johnson',
    donorEns: 'alex.eth',
    donorAvatarUrl: '/lovable-uploads/626b1e7c-b8d4-44de-8562-dfe51d48d007.png',
    amount: 100,
    message: 'For the children\'s education program',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
  },
  {
    id: '2',
    donorId: '2',
    donorName: 'Maria Rodriguez',
    donorEns: 'maria.eth',
    donorAvatarUrl: '/lovable-uploads/f78bcef6-f92f-4076-9fc6-d323611c46b2.png',
    amount: 75,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '3',
    donorId: '3',
    donorName: 'James Smith',
    donorEns: 'jsmith.eth',
    donorAvatarUrl: '/lovable-uploads/d7d25a2a-6e15-4fa5-bc93-32cd62937878.png',
    amount: 50,
    message: 'Happy to support this cause!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
  },
  {
    id: '4',
    donorId: '4',
    donorName: 'Sarah Williams',
    amount: 25,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
  {
    id: '5',
    donorId: '5',
    donorName: 'Michael Brown',
    donorEns: 'mbrown.eth',
    amount: 200,
    message: 'Keep up the amazing work!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

const SAMPLE_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'School Supplies Drive',
    description: 'Help us provide school supplies to 100 children in need',
    goalAmount: 2000,
    currentAmount: 1450,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
    teamMembers: ['Alex Johnson', 'Maria Rodriguez', 'James Smith'],
    createdBy: 'Alex Johnson',
  },
  {
    id: '2',
    title: 'Teacher Training Program',
    description: 'Fund training for 20 teachers in rural communities',
    goalAmount: 5000,
    currentAmount: 1800,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 2 weeks from now
    teamMembers: ['Michael Brown', 'Sarah Williams'],
    createdBy: 'Michael Brown',
  },
];

const getTierBadge = (tier: Donor['tier']) => {
  const tiers = {
    bronze: { color: 'bg-amber-700', text: 'text-amber-100' },
    silver: { color: 'bg-gray-400', text: 'text-gray-800' },
    gold: { color: 'bg-yellow-400', text: 'text-yellow-800' },
    platinum: { color: 'bg-purple-600', text: 'text-purple-100' },
  };
  
  return (
    <Badge className={cn("ml-2", tiers[tier].color, tiers[tier].text)}>
      {tier.charAt(0).toUpperCase() + tier.slice(1)}
    </Badge>
  );
};

const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  
  return Math.floor(seconds) + " seconds ago";
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const CommunityTab: React.FC = () => {
  const [leaderboardFilter, setLeaderboardFilter] = useState<'all' | 'month' | 'week'>('all');
  const [viewType, setViewType] = useState<'individual' | 'group'>('individual');
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  
  const filteredDonors = SAMPLE_DONORS.sort((a, b) => b.totalDonated - a.totalDonated);
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="leaderboard" className="flex flex-col items-center justify-center gap-1.5 py-2 px-1 h-full">
            <Award className="h-5 w-5" />
            <span className="text-xs font-medium">Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex flex-col items-center justify-center gap-1.5 py-2 px-1 h-full">
            <History className="h-5 w-5" />
            <span className="text-xs font-medium">Activity</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex flex-col items-center justify-center gap-1.5 py-2 px-1 h-full">
            <Target className="h-5 w-5" />
            <span className="text-xs font-medium">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex flex-col items-center justify-center gap-1.5 py-2 px-1 h-full">
            <Users className="h-5 w-5" />
            <span className="text-xs font-medium">Social</span>
          </TabsTrigger>
        </TabsList>

        {/* Leaderboard Content */}
        <TabsContent value="leaderboard" className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-2">
              <Button 
                variant={leaderboardFilter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setLeaderboardFilter('all')}
                className="text-xs h-8"
              >
                All Time
              </Button>
              <Button 
                variant={leaderboardFilter === 'month' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setLeaderboardFilter('month')}
                className="text-xs h-8"
              >
                This Month
              </Button>
              <Button 
                variant={leaderboardFilter === 'week' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setLeaderboardFilter('week')}
                className="text-xs h-8"
              >
                This Week
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={viewType === 'individual' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewType('individual')}
                className="text-xs h-8"
              >
                <User className="h-3 w-3 mr-1" />
                Individual
              </Button>
              <Button 
                variant={viewType === 'group' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewType('group')}
                className="text-xs h-8"
              >
                <Users className="h-3 w-3 mr-1" />
                Groups
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonors.map((donor, index) => (
                <TableRow key={donor.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        {donor.avatarUrl ? (
                          <AvatarImage src={donor.avatarUrl} alt={donor.name} />
                        ) : (
                          <AvatarFallback className="bg-purple-100 text-purple-800">
                            {donor.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center">
                          {donor.name}
                          {getTierBadge(donor.tier)}
                        </div>
                        {donor.ens && (
                          <div className="text-xs text-muted-foreground">{donor.ens}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">${donor.totalDonated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Activity Feed Content */}
        <TabsContent value="activity" className="space-y-4">
          <div className="space-y-3">
            {SAMPLE_ACTIVITIES.map((activity) => (
              <Card key={activity.id} className="shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      {activity.donorAvatarUrl ? (
                        <AvatarImage src={activity.donorAvatarUrl} alt={activity.donorName} />
                      ) : (
                        <AvatarFallback className="bg-purple-100 text-purple-800">
                          {activity.donorName.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium">{activity.donorName}</span>
                          {activity.donorEns && (
                            <span className="text-xs text-muted-foreground ml-1">
                              ({activity.donorEns})
                            </span>
                          )}
                          <span className="text-sm"> donated </span>
                          <span className="font-semibold text-purple-700">${activity.amount}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                      {activity.message && (
                        <div className="mt-1.5 p-2 bg-purple-50 rounded-md text-sm text-gray-700">
                          <MessageSquare className="inline-block h-3.5 w-3.5 mr-1.5 text-purple-600" />
                          "{activity.message}"
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full text-sm" size="sm">
              Load More
            </Button>
          </div>
        </TabsContent>

        {/* Challenges Content */}
        <TabsContent value="challenges" className="space-y-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Active Challenges</h3>
            <Button size="sm" className="h-8">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Create Challenge
            </Button>
          </div>

          <div className="space-y-4">
            {SAMPLE_CHALLENGES.map((challenge) => (
              <Card 
                key={challenge.id} 
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  selectedChallenge === challenge.id ? "ring-2 ring-purple-500" : ""
                )}
                onClick={() => setSelectedChallenge(
                  selectedChallenge === challenge.id ? null : challenge.id
                )}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base flex items-center">
                        <Flag className="h-4 w-4 mr-2 text-purple-600" />
                        {challenge.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {challenge.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {Math.ceil((challenge.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>${challenge.currentAmount} raised</span>
                      <span className="font-medium">${challenge.goalAmount} goal</span>
                    </div>
                    <Progress 
                      value={(challenge.currentAmount / challenge.goalAmount) * 100} 
                      className="h-2 bg-gray-100" 
                    />
                    
                    {selectedChallenge === challenge.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center">
                            <Users className="h-3.5 w-3.5 mr-1.5 text-purple-600" />
                            Team Members ({challenge.teamMembers.length})
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {challenge.teamMembers.map((member, i) => (
                              <div key={i} className="flex items-center bg-purple-50 px-2 py-1 rounded-full text-xs">
                                <span>{member}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1.5" />
                          Deadline: {formatDate(challenge.deadline)}
                        </div>
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm" className="text-xs h-8">
                            <Link className="h-3.5 w-3.5 mr-1.5" />
                            Share
                          </Button>
                          <Button size="sm" className="text-xs h-8">
                            <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                            Join Challenge
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Social Content */}
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <Users className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <h3 className="font-semibold text-lg">Community Stats</h3>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-800">156</div>
                    <div className="text-sm text-gray-600">Total Donors</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-800">42</div>
                    <div className="text-sm text-gray-600">Recurring Donors</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h3 className="text-sm font-medium mt-4 mb-2">Donors You Might Know</h3>
          <div className="grid grid-cols-1 gap-3">
            {SAMPLE_DONORS.slice(0, 3).map((donor) => (
              <Card key={donor.id} className="shadow-sm">
                <CardContent className="p-3 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      {donor.avatarUrl ? (
                        <AvatarImage src={donor.avatarUrl} alt={donor.name} />
                      ) : (
                        <AvatarFallback className="bg-purple-100 text-purple-800">
                          {donor.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center">
                        {donor.name}
                        {getTierBadge(donor.tier)}
                      </div>
                      {donor.ens && (
                        <div className="text-xs text-muted-foreground">{donor.ens}</div>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant={donor.isFollowing ? "outline" : "default"} 
                    size="sm"
                    className="text-xs h-8"
                  >
                    <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                    {donor.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center pt-2">
            <Button variant="outline" className="text-sm w-full" size="sm">
              View All Community Members
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-center text-muted-foreground">
        <p>Connect with the Hope Foundation community</p>
      </div>
    </div>
  );
};

export default CommunityTab;
