import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Product {
  id: string;
  name: string;
  price: string;
  quantity: number;
  category: string;
  value: string;
  disabled?: boolean;
}

interface InventoryState {
  products: Product[];
  totalProducts: number;
  totalValue: number;
  outOfStockCount: number;
  totalCategories: number;
  categories: Set<string>;
}

const initialState: InventoryState = {
  products: [],
  totalProducts: 0,
  totalValue: 0,
  outOfStockCount: 0,
  totalCategories: 0,
  categories: new Set(),
};

const calculateTotals = (products: Product[]) => {
  const enabledProducts = products.filter((p) => !p.disabled);
  const totalProducts = enabledProducts.length;
  const totalValue = enabledProducts.reduce((sum, p) => sum + Number(p.value.slice(1)), 0);
  const categories = new Set(enabledProducts.map((p) => p.category));
  const totalCategories = categories.size;
  const outOfStockCount = enabledProducts.filter((p) => p.quantity === 0).length;

  return { totalProducts, totalValue, totalCategories, outOfStockCount, categories };
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      const products = action.payload.map((product) => ({
        ...product,
        id: product.id || uuidv4(),
      }));

      state.products = products;
      const totals = calculateTotals(products);
      Object.assign(state, totals);
    },
    editProduct(state, action: PayloadAction<{ id: string; updates: Partial<Product> }>) {
      const { id, updates } = action.payload;
      const product = state.products.find((p) => p.id === id);

      if (product) {
        Object.assign(product, updates);
        const totals = calculateTotals(state.products);
        Object.assign(state, totals);
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.products = state.products.filter((p) => p.id !== id);
      const totals = calculateTotals(state.products);
      Object.assign(state, totals);
    },
    disableProduct(state, action: PayloadAction<string>) {
      const id = action.payload;
      const product = state.products.find((p) => p.id === id);

      if (product) {
        product.disabled = !product.disabled;
        const totals = calculateTotals(state.products);
        Object.assign(state, totals);
      }
    },
  },
});

export const { setProducts, editProduct, deleteProduct, disableProduct } = inventorySlice.actions;
export default inventorySlice.reducer;