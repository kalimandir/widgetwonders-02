
import { ArrowUp, ArrowDown, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type Post } from "./mockData";

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Card className="bg-[#1a1a1a] border-gray-800 hover:border-gray-700 transition-all mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded bg-indigo-900/50 text-indigo-200 flex items-center justify-center font-semibold">
              {post.author.initials}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="text-gray-300 text-sm">{post.author.ens}</div>
              <div className="text-gray-400 text-sm">{post.timestamp}</div>
            </div>
            
            <h3 className="text-white font-medium mt-1 mb-1">{post.title}</h3>
            <p className="text-gray-300 text-sm mb-3">{post.content}</p>
            
            {post.tags.length > 0 && (
              <div className="mb-3">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="bg-green-900/30 text-green-300 border-green-800 mr-2">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-green-400 hover:text-green-300">
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <span className="text-green-400">{post.upvotes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-red-400 hover:text-red-300">
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <span className="text-red-400">{post.downvotes}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-indigo-300 hover:text-indigo-200 px-0">
                <MessageCircle className="h-4 w-4 mr-1" />
                Show Comments ({post.commentsCount})
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostItem;
