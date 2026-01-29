const API_URL =
  process.env.REACT_APP_API_URL || "https://bidpulse-backend-i0ho.onrender.com";

export const fetchItems = async () => {
  const res = await fetch(`${API_URL}/items`);
  return res.json();
};
