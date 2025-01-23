interface Product {
  id: string;
  name: string;
  price: string;
  quantity: number;
  category: string;
  value: string;
  disabled?: boolean;
}



export const fetchInventory = async (): Promise<Product[]> => {

  const response = await fetch(import.meta.env.VITE_INVENTORY_API);
  if (!response.ok) {
    throw new Error('Failed to fetch inventory data');
  }

  const data: Product[] = await response.json();


  return data;
};
