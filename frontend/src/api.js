const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const fetchItems = async () => {
  const res = await fetch(`${API_URL}/items`);
  return res.json();
};
