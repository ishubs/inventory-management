import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the user state
interface UserState {
  isAdmin: boolean;
}

// Initial state
const initialState: UserState = {
  isAdmin: true,
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to toggle admin status
    toggleAdmin(state) {
      state.isAdmin = !state.isAdmin;
    },
    // Action to set admin status explicitly
    setAdminStatus(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
  },
});

// Export actions and reducer
export const { toggleAdmin, setAdminStatus } = userSlice.actions;
export default userSlice.reducer;
