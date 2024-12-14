export function parseRedditUrl(url: string): { postId: string; subreddit: string } | null {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/');
    const commentIndex = parts.indexOf('comments');
    
    if (commentIndex === -1) return null;
    
    return {
      subreddit: parts[2],
      postId: parts[commentIndex + 1]
    };
  } catch {
    return null;
  }
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    -Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)),
    'day'
  );
}

export async function fetchRedditThread(subreddit: string, postId: string) {
  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`
  );
  const [postData, commentsData] = await response.json();
  return {
    post: postData.data.children[0].data,
    comments: commentsData.data.children.map((child: any) => child.data)
  };
}