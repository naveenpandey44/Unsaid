🧠 Unsaid — Anonymous Mood Journal...

Unsaid is an anonymous, mood-based journaling web application built to help users express emotions freely without judgement, social pressure, or identity exposure. The platform focuses on emotional catharsis rather than engagement metrics like likes or comments.

🌙 About the Project....

Many thoughts are felt deeply but never spoken aloud. Unsaid provides a quiet digital space where users can write what they feel, choose a mood that represents their emotion, and let the post fade away over time. The app is intentionally minimal, private, and temporary.

✨ Features...

Anonymous posting (no login, no username)

Mood-based journaling (5 predefined moods)

Real-time post updates using polling

Session-based owner delete system

Admin-level moderation delete

Frontend-level 24-hour post expiry

Glassmorphism dark UI

Fully responsive design (mobile & desktop)

🎨 Frontend Stack.....

React 18 for UI and component-based architecture

TypeScript for type safety

Tailwind CSS for glassmorphism UI and responsive styling

Vite for fast development server and HMR

Axios for API communication

React Hooks (useState, useEffect) for state and lifecycle management

🧠 Backend Stack....

Node.js for server-side runtime

Express.js for REST API development

Prisma ORM for type-safe database queries

SQLite as a lightweight database

JWT for anonymous session-based ownership validation

CORS for secure frontend–backend communication

🗄️ Database Schema (Simplified)...

Post

id

content

mood

moodColor

createdAt

sessionId

🗑️ Delete System....

Owner Delete: A user can delete their own post if the session token matches.

Admin Delete: Admin can delete any post using a secure admin key stored in environment variables, primarily for moderation purposes.

⏰ Post Expiry Logic...

Posts are filtered on the frontend using their creation timestamp (createdAt). Any post older than 24 hours is automatically hidden from the UI, reinforcing the idea of impermanence.

🔐 Security & Privacy....

No authentication system

No user profiles or usernames

Fully anonymous posting

Session-based ownership verification

Admin key managed via environment variables

CORS enabled for controlled access

🚀 Getting Started....

Backend 
cd backend
npm install
npm run dev


Backend runs on:....

http://localhost:5000

Frontend .....
cd frontend
npm install
npm start 


Frontend runs on:...

http://localhost:3000

🎤 Project Summary.....

Unsaid is an anonymous mood-based journaling application built using React 18 with Vite and Tailwind CSS on the frontend, and Node.js with Express, Prisma ORM, and SQLite on the backend. The app enables users to share emotions anonymously, supports session-based ownership and admin moderation, provides real-time updates via polling, and enforces frontend-level post expiry after 24 hours. The project prioritizes privacy, simplicity, and emotional expression over social engagement.

📌 Author....

Naveen Kumar
B.Tech (CSE – AI & ML)
Full-Stack Developer