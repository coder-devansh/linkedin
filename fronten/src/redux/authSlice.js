import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    // other initial state properties
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload; // Assuming you want to set loading to true/false
    },
    // other reducers
  },
});

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;
