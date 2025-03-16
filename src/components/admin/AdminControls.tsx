
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { Shield, BarChart3, BookOpen, PieChart, Settings } from 'lucide-react';
import UpdateMetricsModal from './UpdateMetricsModal';
import AddImpactStoryModal from './AddImpactStoryModal';
import UpdateAllocationModal from './UpdateAllocationModal';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';

interface AdminControlsProps {
  impactMetrics: any[];
  onUpdateMetrics: (metrics: any[]) => void;
  fundAllocation: any[];
  onUpdateAllocation: (allocation: any[]) => void;
  onAddStory: (story: any) => void;
}

const AdminControls: React.FC<AdminControlsProps> = ({
  impactMetrics,
  onUpdateMetrics,
  fundAllocation,
  onUpdateAllocation,
  onAddStory
}) => {
  const { isAdmin, address } = useAdmin();
  const [metricsModalOpen, setMetricsModalOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [allocationModalOpen, setAllocationModalOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-2 right-2 bg-white/90 border border-purple-200 text-purple-800 hover:bg-purple-50"
            >
              <Shield className="h-4 w-4 text-purple-800" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="end">
            <div className="space-y-1">
              <div className="px-2 py-1.5 text-xs font-medium text-gray-500">
                Admin Mode Active
              </div>
              <div className="text-xs px-2 py-1 text-gray-600 truncate">
                {address}
              </div>
              <div className="h-px bg-gray-100 my-1"></div>
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start text-xs"
                onClick={() => setMetricsModalOpen(true)}
              >
                <BarChart3 className="h-3.5 w-3.5 mr-2" />
                Update Impact Metrics
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start text-xs"
                onClick={() => setStoryModalOpen(true)}
              >
                <BookOpen className="h-3.5 w-3.5 mr-2" />
                Add Impact Story
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start text-xs"
                onClick={() => setAllocationModalOpen(true)}
              >
                <PieChart className="h-3.5 w-3.5 mr-2" />
                Update Fund Allocation
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <UpdateMetricsModal
        open={metricsModalOpen}
        onOpenChange={setMetricsModalOpen}
        currentMetrics={impactMetrics}
        onUpdateMetrics={onUpdateMetrics}
      />

      <AddImpactStoryModal
        open={storyModalOpen}
        onOpenChange={setStoryModalOpen}
        onAddStory={onAddStory}
      />

      <UpdateAllocationModal
        open={allocationModalOpen}
        onOpenChange={setAllocationModalOpen}
        currentAllocation={fundAllocation}
        onUpdateAllocation={onUpdateAllocation}
      />
    </>
  );
};

export default AdminControls;
