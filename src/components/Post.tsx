import React from 'react';
import { MessageSquare, ArrowBigUp, ArrowBigDown } from 'lucide-react';
import type { RedditPost } from '../types/reddit';
import { formatTimestamp } from '../utils/reddit';
import { MarkdownContent } from './MarkdownContent';

interface PostProps {
  post: RedditPost;
}

export function Post({ post }: PostProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span className="font-medium">{post.author}</span>
        <span>•</span>
        <span>{formatTimestamp(post.created_utc)}</span>
      </div>
      
      {post.selftext && (
        <div className="mb-4">
          <MarkdownContent content={post.selftext} />
        </div>
      )}
      
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <ArrowBigUp className="w-5 h-5" />
          <span className="font-medium">{post.score}</span>
          <ArrowBigDown className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="w-5 h-5" />
          <span>{post.num_comments} comments</span>
        </div>
      </div>
    </div>
  );
}