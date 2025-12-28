import React, { useState, useEffect } from 'react';

interface Post {
  id: string;
  content: string;
  mood: string;
  moodColor: string;
  sessionId: string;
  createdAt: string;
  expiresAt: Date;
}

const MOODS = [
  { emoji: '💖', name: 'Romance',  color: '#b76e79' },
  { emoji: '🌑', name: 'Deep',     color: '#111827' },
  { emoji: '✨', name: 'Grateful', color: '#c9a24d' },
  { emoji: '🌀', name: 'Chaos',    color: '#6b7280' },
  { emoji: '🫂', name: 'Comfort',  color: '#a47551' }
];

export default function App() {
  const [selectedMood, setSelectedMood] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const mood = MOODS[selectedMood];

  // Fetch posts
  const fetchPosts = async (): Promise<void> => {
    try {
      const res = await fetch('http://localhost:5000/api/posts');
      const data: Post[] = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Posts fetch error:', error);
    }
  };

  // UPDATED: createPost with sessionId
  const createPost = async (): Promise<void> => {
    if (!newPost.trim()) return;
    setLoading(true);
    try {
      const userSession: string = (localStorage.getItem('userSession') as string) || `user_${Date.now()}`;
      localStorage.setItem('userSession', userSession);
      
      await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newPost,
          mood: mood.name,
          moodColor: mood.color,
          sessionId: userSession
        })
      });
      setNewPost('');
      fetchPosts();
    } catch (error) {
      console.error('Post error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        backgroundImage: `radial-gradient(700px circle at top, ${mood.color}22, transparent 65%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: '#e5e7eb',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        transition: 'background-image 0.6s ease'
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(18px)',
          padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)',
          borderRadius: '2.5rem',
          maxWidth: '560px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.45)'
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: 'clamp(2.6rem, 6vw, 4rem)',
            fontWeight: 300,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}
        >
          Unsaid
        </h1>

        {/* TAGLINE */}
        <p
          style={{
            fontSize: '1.1rem',
            marginBottom: '2.0rem',
            opacity: 0.7,
            fontWeight: 400,
            fontStyle: 'italic'
          }}
        >
          Because not everything needs a response.
        </p>

        {/* Mood Label */}
        <p
          style={{
            fontSize: '1.3rem',
            marginBottom: '2.2rem',
            fontWeight: 600,
            color: '#e5e7eb'
          }}
        >
          Mood:{' '}
          <span
            style={{
              color: mood.name === 'Deep' ? '#60a5fa' : mood.color,
              fontWeight: 700
            }}
          >
            {mood.name}
          </span>
        </p>

        {/* Mood buttons grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
            gap: '1.2rem',
            marginBottom: '2.5rem',
            paddingInline: '0.25rem'
          }}
        >
          {MOODS.map((m, i) => {
            const active = i === selectedMood;
            return (
              <button
                key={m.name}
                onClick={() => setSelectedMood(i)}
                style={{
                  width: '100%',
                  padding: '1.7rem 0.6rem',
                  borderRadius: '1.4rem',
                  background: active
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.14)',
                  color: active ? '#0f172a' : '#f9fafb',
                  border: active
                    ? `2px solid ${m.color}`
                    : '1px solid rgba(255,255,255,0.25)',
                  cursor: 'pointer',
                  fontSize: '2.0rem',
                  transition: 'all 0.35s ease',
                  boxShadow: active
                    ? `0 15px 30px ${m.color}55`
                    : '0 10px 25px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100px',
                  overflow: 'hidden'
                }}
              >
                <div>{m.emoji}</div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    marginTop: '0.4rem',
                    fontWeight: 500,
                    opacity: 0.9
                  }}
                >
                  {m.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* POSTING */}
        <div style={{ marginBottom: '2.5rem' }}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's echoing in your void today? 🌙"
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '1.2rem',
              borderRadius: '1.2rem',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.08)',
              color: '#f9fafb',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
              backdropFilter: 'blur(10px)',
              outline: 'none'
            }}
            maxLength={500}
          />

          <button
            onClick={createPost}
            disabled={loading || !newPost.trim()}
            style={{
              width: '100%',
              padding: '1.1rem',
              marginTop: '1rem',
              background: `${mood.color}CC`,
              color: 'white',
              border: 'none',
              borderRadius: '1.2rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor:
                loading || !newPost.trim() ? 'not-allowed' : 'pointer',
              opacity: loading || !newPost.trim() ? 0.7 : 1
            }}
          >
            {loading ? '🌙 Echoing...' : `Let it go 🌙 ${mood.emoji}`}
          </button>
        </div>

        {/* Posts Feed with Delete Buttons */}
        {posts.length > 0 && (
          <div style={{ textAlign: 'left' }}>
            <h3
              style={{
                marginBottom: '1.5rem',
                fontWeight: 600,
                color: '#e5e7eb'
              }}
            >
              Recent Echoes ({posts.length})
            </h3>

            {posts.map((post) => {
              const isOwner = localStorage.getItem('userSession') === post.sessionId;
              
              return (
                <div
                  key={post.id}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    marginBottom: '1rem',
                    borderLeft: `4px solid ${post.moodColor}`,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div
                    style={{
                      color: post.moodColor,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem'
                    }}
                  >
                    {post.mood}
                  </div>
                  <p style={{ margin: 0, lineHeight: '1.6', opacity: 0.95 }}>
                    {post.content}
                  </p>
                  <small
                    style={{
                      opacity: 0.7,
                      marginTop: '0.8rem',
                      display: 'block',
                      fontSize: '0.85rem'
                    }}
                  >
                    {new Date(post.createdAt).toLocaleString('en-IN')}
                  </small>
                  
                  {/* DELETE BUTTON */}
                  {(isOwner || true) && (
                    <button
                      onClick={() => {
  if (window.confirm('Delete this post?')) {
    fetch(`http://localhost:5000/api/posts/${post.id}`, {
      method: 'DELETE',
      headers: { 
        'x-session-id': post.sessionId,
        'x-admin-key': 'mySecretAdminKey123'
      }
    }).then(() => fetchPosts());
  }
}}

                      style={{
                        width: '100%',
                        marginTop: '1rem',
                        padding: '0.7rem',
                        background: isOwner ? '#3b82f6' : '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.8rem',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      {isOwner ? '✏️ My Post - Delete' : '🗑️ Admin Delete'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div
          style={{
            padding: '1.1rem 2rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '1.4rem',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
            Every story fades away after 24 hours 🌙
          </p>
        </div>
      </div>
    </div>
  );
}
