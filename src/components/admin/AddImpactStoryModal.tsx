
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface StoryData {
  name: string;
  content: string;
  date: string;
  imageSrc?: string;
}

interface AddImpactStoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddStory: (story: StoryData) => void;
}

const AddImpactStoryModal: React.FC<AddImpactStoryModalProps> = ({
  open,
  onOpenChange,
  onAddStory
}) => {
  const [storyData, setStoryData] = useState<StoryData>({
    name: '',
    content: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  });
  const [image, setImage] = useState<File | null>(null);
  const { isLoading, addImpactStory } = useAdmin();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!storyData.name || !storyData.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would upload the image and get a URL
    const newStory = {
      ...storyData,
      imageSrc: image ? URL.createObjectURL(image) : undefined
    };

    const success = await addImpactStory(newStory);
    if (success) {
      onAddStory(newStory);
      toast({
        title: "Story added",
        description: "Impact story has been successfully added.",
      });
      onOpenChange(false);
      setStoryData({
        name: '',
        content: '',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
      });
      setImage(null);
    } else {
      toast({
        title: "Failed to add story",
        description: "There was a problem adding the story. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Impact Story</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name/Grade <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Maria, 9th Grade"
              className="col-span-3"
              value={storyData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right pt-2">
              Story <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write the beneficiary's story here..."
              className="col-span-3 min-h-[100px]"
              value={storyData.content}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              name="date"
              type="text"
              className="col-span-3"
              value={storyData.date}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <div className="col-span-3">
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: Add an image to accompany this story.
              </p>
            </div>
          </div>
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
            {isLoading ? "Adding..." : "Add Story"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddImpactStoryModal;
