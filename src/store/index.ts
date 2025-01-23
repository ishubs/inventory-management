import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../module/inventory/slice';
import userSlice from '../module/user/slice'
// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;

// Configure the Redux store
export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    user: userSlice
  },
});

export default store;
