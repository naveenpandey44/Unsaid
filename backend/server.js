require('dotenv').config();               // .env load

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// CREATE POST (Session ID added)
app.post('/api/posts', async (req, res) => {
  try {
    const { content, mood, moodColor, sessionId } = req.body;
    const post = await prisma.post.create({
      data: {
        content,
        mood,
        moodColor,
        sessionId: sessionId || `anon_${Date.now()}`,  // 👈 NEW: Session support
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    });
    res.json(post);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// GET POSTS (only non-expired)
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// 👇 NEW: Owner + Admin Delete (PERFECT!)
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({ where: { id: req.params.id } });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const sessionId = req.headers['x-session-id'];
    const adminKey = req.headers['x-admin-key'];

    // ✅ Owner (same session) YA Admin only
    if (sessionId !== post.sessionId && adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await prisma.post.delete({
      where: { id: req.params.id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: 'Failed to delete post' });
  }
});

// PORT from .env (fallback 5000)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
