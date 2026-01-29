const AUCTION_DURATION = 5 * 60 * 1000; // 5 minutes

function createAuction(id, title, price) {
  return {
    id,
    title,
    startingPrice: price,
    currentBid: price,
    highestBidder: null,
    endsAt: Date.now() + AUCTION_DURATION,
  };
}

let auctions = [
  createAuction(1, "MacBook Pro", 500),
  createAuction(2, "Gaming Laptop", 800),
  createAuction(3, "Designer Handbag", 400),
  createAuction(4, "Smart Watch Pro", 300),
  createAuction(5, "Professional Camera", 1200),
];

function getItems() {
  return auctions;
}

async function placeBid(itemId, amount, userId) {
  const item = auctions.find((a) => a.id === itemId);

  if (!item) throw new Error("Item not found");

  if (Date.now() > item.endsAt) {
    throw new Error("Auction ended");
  }

  if (amount <= item.currentBid) {
    throw new Error("Outbid");
  }

  item.currentBid = amount;
  item.highestBidder = userId;

  return item;
}

module.exports = { getItems, placeBid };
