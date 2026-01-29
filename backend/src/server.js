const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { getItems, placeBid } = require("./auctions");

const app = express();

/* =====================================================
   ✅ CORS CONFIG (Production Safe)
   ===================================================== */

const allowedOrigins = [
  "http://localhost:3000", // local
  "https://mern-frontend.vercel.app", // ⚠️ CHANGE if your Vercel domain is different
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS not allowed"));
      }

      return callback(null, true);
    },
    credentials: true,
  }),
);

app.use(express.json());

/* =====================================================
   ✅ REST API
   ===================================================== */

app.get("/", (req, res) => {
  res.send("🚀 BidPulse Backend Running...");
});

app.get("/items", (req, res) => {
  try {
    res.json({
      serverTime: Date.now(),
      items: getItems(),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

/* =====================================================
   ✅ SOCKET SERVER
   ===================================================== */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"], // ⭐ prevents polling issues on Render
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  /* ================= BID EVENT ================= */

  socket.on("BID_PLACED", async ({ itemId, amount, userId }) => {
    try {
      const updatedItem = await placeBid(itemId, amount, userId);

      // Notify bidder
      socket.emit("BID_SUCCESS", {
        item: updatedItem.title,
        amount: updatedItem.currentBid,
      });

      // Notify other users
      socket.broadcast.emit("NEW_BID", {
        item: updatedItem.title,
        amount: updatedItem.currentBid,
        bidder: userId,
      });

      // Sync everyone
      io.emit("UPDATE_BID", updatedItem);
    } catch (err) {
      socket.emit("BID_ERROR", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

/* =====================================================
   ✅ START SERVER (Render Compatible)
   ===================================================== */

const PORT = process.env.PORT || 4000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
