# 💬 Chat Application  

A **real-time chat application** built as a **monorepo**. The project allows users to connect, send friend requests, accept them, and chat in real time using WebSockets.  

✅ Fully responsive – works seamlessly on **all screen sizes** (mobile, tablet, and desktop).  

---

## 🚀 Getting Started  

### Clone the Repository

git clone <repo-link>

Install Dependencies-

Navigate to the project root and install required packages:

npm install

Run the Project-

Start all apps together:-

npm run dev

⚠️ Ensure ports 3000, 4000, and 4001 are available.
🌐 Database is hosted on cloud – no local setup required.





📂 Monorepo Structure--

The project is organized into three apps:

apps/
 ├── frontend   # Next.js (UI)
 ├── backend    # Node.js + Express + Prisma (REST APIs)
 └── ws         # Node.js + Socket.IO (WebSocket server)




▶️ Run Specific Apps----

To run apps individually:

npm run dev:backend   # Start backend server  
npm run dev:frontend  # Start frontend application  
npm run dev:ws        # Start WebSocket server  



🛠️ Tech Stack-----

Frontend-
Next.js
Tailwind CSS
ShadCN UI
Redux Toolkit + RTK Query
FontAwesome

Backend--
Node.js
Express.js
Prisma ORM
JWT Authentication

WebSocket--
Node.js
Express.js
Socket.IO

Database--
PostgreSQL (Cloud-hosted)



📖 Usage Instructions--

1.Sign Up with email, phone number, and password.
2.Login using the registered credentials.
3.For testing, create two unique users (email and phone must be unique).
4.From the Add Friend section, send a friend request.
5.Accept the request in the Friend Requests section.
6.After acceptance, friends appear in the Chats list.
7.Click a friend’s name to start chatting.

⚠️ Note: Friends must be online to exchange messages.


📌 About the Project--

This project demonstrates a scalable, real-time chat platform with modern technologies.

🔐 Secure Authentication – JWT-based login & signup

🗄️ Persistent Data Storage – PostgreSQL (cloud-hosted)

⚡ Real-time Messaging – Socket.IO WebSocket server

🎨 Modern Responsive UI – Next.js + Tailwind + ShadCN

🧩 State Management – Redux Toolkit with RTK Query


project develop by kartik sharma-
linkedin - https://www.linkedin.com/in/kartik-sh17/
portfolio - https://personal-portfolio-prod-gamma.vercel.app/
email - contactkartikforwork@gmail.com