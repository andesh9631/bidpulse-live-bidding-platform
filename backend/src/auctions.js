// auctions.js

const createAuction = (id, title, price, durationMinutes = 60) => ({
  id,
  title,
  startingPrice: price,
  currentBid: price,
  highestBidder: null,
  endsAt: Date.now() + durationMinutes * 60 * 1000,
});

let auctions = [];

function resetAuctions() {
  console.log("🔄 Resetting auctions...");

  auctions = [
    createAuction(1, "MacBook Pro", 500),
    createAuction(2, "Gaming Laptop", 800),
    createAuction(3, "Designer Handbag", 400),
    createAuction(4, "Smart Watch Pro", 300),
    createAuction(5, "Professional Camera", 1200),
  ];
}

// Initialize first time
resetAuctions();

// ✅ AUTO RESET LOGIC
setInterval(() => {
  const allEnded = auctions.every((item) => Date.now() > item.endsAt);

  if (allEnded) {
    resetAuctions();
  }
}, 30000); // check every 30 seconds

// ------------------------

function getItems() {
  return auctions;
}

// 🔐 Race-condition safe bid
const locks = new Map();

async function placeBid(itemId, amount, userId) {
  if (locks.get(itemId)) {
    throw new Error("Another bid is processing. Try again.");
  }

  locks.set(itemId, true);

  try {
    const item = auctions.find((i) => i.id === itemId);

    if (!item) throw new Error("Item not found");

    if (Date.now() > item.endsAt) {
      throw new Error("Auction ended");
    }

    if (amount <= item.currentBid) {
      throw new Error("Outbid! Place a higher bid.");
    }

    item.currentBid = amount;
    item.highestBidder = userId;

    return item;
  } finally {
    locks.delete(itemId);
  }
}

module.exports = {
  getItems,
  placeBid,
};
