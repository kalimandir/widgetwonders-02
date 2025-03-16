
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

interface MetricItem {
  name: string;
  count: number;
  icon: React.ReactNode;
}

interface UpdateMetricsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentMetrics: MetricItem[];
  onUpdateMetrics: (metrics: MetricItem[]) => void;
}

const UpdateMetricsModal: React.FC<UpdateMetricsModalProps> = ({
  open,
  onOpenChange,
  currentMetrics,
  onUpdateMetrics
}) => {
  const [metrics, setMetrics] = useState<MetricItem[]>(currentMetrics);
  const { isLoading, updateMetrics } = useAdmin();
  const { toast } = useToast();

  const handleChange = (index: number, count: number) => {
    const updatedMetrics = [...metrics];
    updatedMetrics[index] = {
      ...updatedMetrics[index],
      count: count
    };
    setMetrics(updatedMetrics);
  };

  const handleSubmit = async () => {
    const success = await updateMetrics(metrics);
    if (success) {
      onUpdateMetrics(metrics);
      toast({
        title: "Metrics updated",
        description: "Impact metrics have been successfully updated.",
      });
      onOpenChange(false);
    } else {
      toast({
        title: "Update failed",
        description: "There was a problem updating the metrics. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Impact Metrics</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {metrics.map((metric, index) => (
            <div key={metric.name} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={`metric-${index}`} className="text-right col-span-2">
                {metric.name}
              </Label>
              <div className="col-span-2">
                <Input
                  id={`metric-${index}`}
                  type="number"
                  value={metric.count}
                  onChange={(e) => handleChange(index, parseInt(e.target.value) || 0)}
                  min={0}
                />
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMetricsModal;
