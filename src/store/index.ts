import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../module/inventory/slice';
import userSlice from '../module/user/slice'

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    user: userSlice
  },
});

export default store;
