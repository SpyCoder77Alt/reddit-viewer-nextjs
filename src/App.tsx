import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Post } from './components/Post';
import { Comment } from './components/Comment';
import { parseRedditUrl, fetchRedditThread } from './utils/reddit';
import type { RedditPost, RedditComment } from './types/reddit';

function App() {
  const [url, setUrl] = useState('');
  const [post, setPost] = useState<RedditPost | null>(null);
  const [comments, setComments] = useState<RedditComment[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const urlInfo = parseRedditUrl(url);
    if (!urlInfo) {
      setError('Invalid Reddit URL. Please enter a valid Reddit post URL.');
      setLoading(false);
      return;
    }

    try {
      const { post, comments } = await fetchRedditThread(urlInfo.subreddit, urlInfo.postId);
      setPost(post);
      setComments(comments);
    } catch (err) {
      setError('Failed to fetch the Reddit thread. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter Reddit post URL..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Loading...' : 'View Thread'}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-red-500 text-sm">{error}</p>
          )}
        </form>

        {post && (
          <div>
            <Post post={post} />
            <div className="space-y-4">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;