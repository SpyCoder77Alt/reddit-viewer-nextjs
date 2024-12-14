import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      className={`prose prose-sm max-w-none dark:prose-invert ${className}`}
      remarkPlugins={[remarkGfm]}
      components={{
        // Style links
        a: ({ node, ...props }) => (
          <a {...props} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer" />
        ),
        // Style code blocks
        code: ({ node, inline, ...props }) => (
          <code {...props} className={`${inline ? 'bg-gray-100 rounded px-1' : 'block bg-gray-100 p-2 rounded'}`} />
        ),
        // Style blockquotes
        blockquote: ({ node, ...props }) => (
          <blockquote {...props} className="border-l-4 border-gray-200 pl-4 italic" />
        ),
        // Style tables
        table: ({ node, ...props }) => (
          <table {...props} className="border-collapse border border-gray-300" />
        ),
        th: ({ node, ...props }) => (
          <th {...props} className="border border-gray-300 px-4 py-2 bg-gray-100" />
        ),
        td: ({ node, ...props }) => (
          <td {...props} className="border border-gray-300 px-4 py-2" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}