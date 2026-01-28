# BidPulse 
### Real-Time Live Bidding Platform

BidPulse is a real-time auction platform where multiple users can bid on items simultaneously in the final seconds.  
It is built with **React**, **Node.js**, and **Socket.io**, and focuses on **real-time updates, race-condition handling, and server-authoritative synchronization**.


## Features

### Core Functionality
- 📦 Multiple auction items displayed in a responsive grid
- ⏱ Live countdown timer synced with server time
- 💸 Incremental bidding (`Bid +10`)
- 🔄 Real-time bid updates using Socket.io

### ⚡ Real-Time Experience
- 🟢 **Green flash animation** when a new bid arrives (from anyone)
- 🏆 **Winning badge** when you are the highest bidder
- ❌ **Red “Outbid” state** when another user bids higher
- 🔔 Real-time toast notifications:
  - ✅ Bid successful
  - 🔵 New bid from another user
  - ⚠️ Outbid / invalid bid

### 🔒 Concurrency & Safety
- Race-condition safe bidding using a **mutex (lock)**
- If two users bid at the same millisecond:
  - Only the **first bid is accepted**
  - The second user receives an **“Outbid” error instantly**
- Server-authoritative auction state (client cannot cheat)

### 🎨 UI & UX
- Clean, modern card-based UI
- Responsive layout (desktop, tablet, mobile)
- Hover effects & smooth animations




## 🏗 Tech Stack

### Frontend
- React
- Socket.io Client
- CSS (modular, component-based)

### Backend
- Node.js
- Express
- Socket.io
- In-memory data store (easily replaceable with DB/Redis)

---

## 📁 Project Structure

Live-Bidding-platform/
├── backend/
│ ├── server.js # HTTP + WebSocket server
│ ├── auctions.js # Auction business logic
│ └── mutex.js # Concurrency control (race condition handling)
│
├── frontend/
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── hooks/ # Custom hooks (countdown, theme)
│ │ ├── styles/ # Modular CSS files
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── README.md

## Start the backend server
-node src/server.js

## Start the React app
- npm start

