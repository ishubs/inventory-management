import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
// Define the product type
export interface Product {
  id: string;
  name: string;
  price: string;
  quantity: number;
  category: string;
  value: string;
  disabled?: boolean;
}

// Define the inventory state
interface InventoryState {
  products: Product[];
  totalProducts: number;
  totalValue: number;
  outOfStockCount: number;
  totalCategories: number;
  categories: Set<string>;
}

// Initial state
const initialState: InventoryState = {
  products: [],
  totalProducts: 0,
  totalValue: 0,
  outOfStockCount: 0,
  totalCategories: 0,
  categories: new Set(),
};


const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
        console.log(action.payload)
      const products = action.payload.map((product) => ({
        ...product,
        id: product.id ? `${product.id}-${uuidv4()}` : uuidv4(),
      }));

      state.products = products;

      const enabledProducts = products.filter((p) => !p.disabled);

      state.totalProducts = enabledProducts.length;
      state.totalValue = enabledProducts.reduce((sum, p) => sum + Number(p.value.slice(1)), 0);
      state.categories = new Set(enabledProducts.map((p) => p.category));
      state.totalCategories = state.categories.size;
      state.outOfStockCount = enabledProducts.filter((p) => p.quantity === 0).length;
    },
    editProduct(state, action: PayloadAction<{ id: string; updates: Partial<Product> }>) {
      const { id, updates } = action.payload;
      const product = state.products.find((p) => p.id === id);

      if (product) {
        Object.assign(product, updates);

        const enabledProducts = state.products.filter((p) => !p.disabled);

        state.totalProducts = enabledProducts.length;
        state.totalValue = enabledProducts.reduce((sum, p) => sum + Number(p.value.slice(1)), 0);
        state.categories = new Set(enabledProducts.map((p) => p.category));
        state.totalCategories = state.categories.size;
        state.outOfStockCount = enabledProducts.filter((p) => p.quantity === 0).length;
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.products = state.products.filter((p) => p.id !== id);

      const enabledProducts = state.products.filter((p) => !p.disabled);

      state.totalProducts = enabledProducts.length;
      state.totalValue = enabledProducts.reduce((sum, p) => sum + Number(p.value.slice(1)), 0);
      state.categories = new Set(enabledProducts.map((p) => p.category));
      state.totalCategories = state.categories.size;
      state.outOfStockCount = enabledProducts.filter((p) => p.quantity === 0).length;
    },
    disableProduct(state, action: PayloadAction<string>) {
      const id = action.payload;
      const product = state.products.find((p) => p.id === id);

      if (product) {
        product.disabled = !product.disabled;

        const enabledProducts = state.products.filter((p) => !p.disabled);

        state.totalProducts = enabledProducts.length;
        state.totalValue = enabledProducts.reduce((sum, p) => sum + Number(p.value.slice(1)), 0);
        state.categories = new Set(enabledProducts.map((p) => p.category));
        state.totalCategories = state.categories.size;
        state.outOfStockCount = enabledProducts.filter((p) => p.quantity === 0).length;
      }
    },
  },
});


// Export actions and reducer
export const { setProducts, editProduct, deleteProduct, disableProduct } = inventorySlice.actions;
export default inventorySlice.reducer;
