const API_URL = process.env.REACT_APP_API_URL;

export const fetchItems = async () => {
  const res = await fetch(`${API_URL}/items`);

  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }

  return res.json();
};
