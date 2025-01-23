import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAdmin: boolean;
}

const initialState: UserState = {
  isAdmin: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    toggleAdmin(state) {
      state.isAdmin = !state.isAdmin;
    },

    setAdminStatus(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
  },
});

export const { toggleAdmin, setAdminStatus } = userSlice.actions;
export default userSlice.reducer;
