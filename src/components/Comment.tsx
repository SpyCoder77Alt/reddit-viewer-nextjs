import React from 'react';
import { MessageSquare, ArrowBigUp, ArrowBigDown } from 'lucide-react';
import type { RedditComment } from '../types/reddit';
import { formatTimestamp } from '../utils/reddit';
import { MarkdownContent } from './MarkdownContent';

interface CommentProps {
  comment: RedditComment;
  depth?: number;
}

export function Comment({ comment, depth = 0 }: CommentProps) {
  const hasReplies = comment.replies?.data?.children.length > 0;

  return (
    <div
      className={`pl-4 ${depth > 0 ? 'border-l border-gray-200 ml-4' : ''}`}
    >
      <div className="bg-white rounded-lg p-4 mb-2 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="font-medium">{comment.author}</span>
          <span>•</span>
          <span>{formatTimestamp(comment.created_utc)}</span>
        </div>
        
        <div className="mb-2">
          <MarkdownContent content={comment.body} />
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <ArrowBigUp className="w-4 h-4" />
            <span>{comment.score}</span>
            <ArrowBigDown className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>Reply</span>
          </div>
        </div>
      </div>

      {hasReplies && (
        <div className="mt-2">
          {comment.replies.data.children.map((reply) => (
            <Comment
              key={reply.data.id}
              comment={reply.data}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}