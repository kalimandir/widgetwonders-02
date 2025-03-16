
import React, { useState, useEffect } from 'react';
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

interface AllocationItem {
  name: string;
  value: number;
  color: string;
}

interface UpdateAllocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAllocation: AllocationItem[];
  onUpdateAllocation: (allocation: AllocationItem[]) => void;
}

const UpdateAllocationModal: React.FC<UpdateAllocationModalProps> = ({
  open,
  onOpenChange,
  currentAllocation,
  onUpdateAllocation
}) => {
  const [allocation, setAllocation] = useState<AllocationItem[]>(currentAllocation);
  const [total, setTotal] = useState<number>(100);
  const { isLoading, updateAllocation } = useAdmin();
  const { toast } = useToast();

  useEffect(() => {
    // Recalculate total whenever allocation changes
    const newTotal = allocation.reduce((sum, item) => sum + item.value, 0);
    setTotal(newTotal);
  }, [allocation]);

  const handleChange = (index: number, value: number) => {
    const updatedAllocation = [...allocation];
    updatedAllocation[index] = {
      ...updatedAllocation[index],
      value: value
    };
    setAllocation(updatedAllocation);
  };

  const handleSubmit = async () => {
    if (total !== 100) {
      toast({
        title: "Invalid allocation",
        description: "The total allocation must equal 100%.",
        variant: "destructive"
      });
      return;
    }

    const success = await updateAllocation(allocation);
    if (success) {
      onUpdateAllocation(allocation);
      toast({
        title: "Allocation updated",
        description: "Fund allocation has been successfully updated.",
      });
      onOpenChange(false);
    } else {
      toast({
        title: "Update failed",
        description: "There was a problem updating the allocation. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Fund Allocation</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {allocation.map((item, index) => (
            <div key={item.name} className="grid grid-cols-6 items-center gap-4">
              <div 
                className="w-4 h-4 rounded-full col-span-1"
                style={{ backgroundColor: item.color }}
              ></div>
              <Label htmlFor={`allocation-${index}`} className="col-span-3">
                {item.name}
              </Label>
              <div className="col-span-2 flex items-center">
                <Input
                  id={`allocation-${index}`}
                  type="number"
                  value={item.value}
                  onChange={(e) => handleChange(index, parseInt(e.target.value) || 0)}
                  min={0}
                  max={100}
                  className="w-full"
                />
                <span className="ml-2">%</span>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="font-medium">Total:</span>
            <span className={`font-bold ${total === 100 ? 'text-green-600' : 'text-red-600'}`}>
              {total}%
            </span>
          </div>
          {total !== 100 && (
            <p className="text-red-600 text-sm">
              Total allocation must equal 100%. Current total: {total}%
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || total !== 100}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAllocationModal;
