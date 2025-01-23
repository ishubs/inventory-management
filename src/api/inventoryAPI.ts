// Define the cache structure
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface Product {
  id: string;
  name: string;
  price: string;
  quantity: number;
  category: string;
  value: string;
  disabled?: boolean;
}


const CACHE_TTL = 60000; // Cache valid for 60 seconds
let inventoryCache: CacheEntry<Product[]> | null = null;

// Fetch inventory with cache handling
export const fetchInventory = async (): Promise<Product[]> => {
  const now = Date.now();

  // Check if cache exists and is still valid
  if (inventoryCache && now - inventoryCache.timestamp < CACHE_TTL) {
    console.log('Returning cached inventory data');
    return inventoryCache.data;
  }

  // Fetch fresh inventory data
  const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
  if (!response.ok) {
    throw new Error('Failed to fetch inventory data');
  }

  const data: Product[] = await response.json();

  // Update the cache
  inventoryCache = { data, timestamp: now };
  console.log('Fetched fresh inventory data');

  return data;
};
