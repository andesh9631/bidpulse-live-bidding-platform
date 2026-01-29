

function createAuctions() {
  const now = Date.now();

  return [
    {
      id: 1,
      title: "MacBook Pro",
      startingPrice: 500,
      currentBid: 500,
      highestBidder: null,
      endsAt: now + 10 * 60 * 1000, // 🔥 10 minutes
    },
    {
      id: 2,
      title: "Gaming Laptop",
      startingPrice: 800,
      currentBid: 800,
      highestBidder: null,
      endsAt: now + 12 * 60 * 1000,
    },
    {
      id: 3,
      title: "Designer Handbag",
      startingPrice: 400,
      currentBid: 400,
      highestBidder: null,
      endsAt: now + 8 * 60 * 1000,
    },
    {
      id: 4,
      title: "Smart Watch Pro",
      startingPrice: 300,
      currentBid: 300,
      highestBidder: null,
      endsAt: now + 6 * 60 * 1000,
    },
    {
      id: 5,
      title: "Professional Camera",
      startingPrice: 1200,
      currentBid: 1200,
      highestBidder: null,
      endsAt: now + 15 * 60 * 1000,
    },
  ];
}

let items = createAuctions();

module.exports = {
  getItems: () => items,
};
