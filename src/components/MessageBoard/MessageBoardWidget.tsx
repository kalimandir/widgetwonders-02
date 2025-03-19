
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Heart } from "lucide-react";
import { mockPosts } from "./mockData";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MessageBoardWidget = () => {
  const [posts] = useState(mockPosts);

  return (
    <Card className="border-none shadow-md bg-white dark:bg-[#1A1F2C] overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Recent Posts</h2>
          <Link to="/">
            <Button variant="outline" size="sm" className="rounded-full">
              <Heart className="h-4 w-4 mr-1 text-pink-500" />
              <span>Donate</span>
            </Button>
          </Link>
        </div>
        <Alert variant="destructive" className="mt-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Token not found or not valid. Please connect through the Yodl app to create posts and comments.
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent className="pt-6 pb-3 space-y-4">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </CardContent>
    </Card>
  );
};

export default MessageBoardWidget;
