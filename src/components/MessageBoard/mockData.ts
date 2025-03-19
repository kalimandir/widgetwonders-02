
export interface Post {
  id: string;
  author: {
    name: string;
    ens: string;
    initials: string;
  };
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  tags: string[];
  timestamp: string;
  commentsCount: number;
}

export const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Vitalik",
      ens: "vitalik.eth",
      initials: "VI",
    },
    title: "From prod dapp",
    content: "First!",
    upvotes: 1,
    downvotes: 0,
    tags: ["first-post"],
    timestamp: "1 day ago",
    commentsCount: 1,
  },
  {
    id: "2",
    author: {
      name: "Andy",
      ens: "andyoee.yodl.me",
      initials: "AN",
    },
    title: "Ens test",
    content: "This should show ENS according to token!",
    upvotes: 0,
    downvotes: 1,
    tags: ["announcement"],
    timestamp: "2 days ago",
    commentsCount: 0,
  },
  {
    id: "3",
    author: {
      name: "King of Cool",
      ens: "kingofcool.eth",
      initials: "KI",
    },
    title: "Foo",
    content: "Bar",
    upvotes: 1,
    downvotes: 0,
    tags: [],
    timestamp: "2 days ago",
    commentsCount: 0,
  },
  {
    id: "4",
    author: {
      name: "King of Cool",
      ens: "kingofcool.eth", 
      initials: "KI",
    },
    title: "Hello world",
    content: "Testing this new message board app!",
    upvotes: 0,
    downvotes: 0,
    tags: [],
    timestamp: "4 days ago",
    commentsCount: 0,
  },
];
