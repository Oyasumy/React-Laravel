import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../configStore';

// Define the initial state using that type
export const initialState = {
  name: '',
  role: '',
  isValidity: false,
};

// Reducer
export const userSlice = createSlice({
  name: 'userSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    setValidity: (state, action) => {
      state.isValidity = !!action.payload;
    },
  },
});

export const { setUser, setValidity } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
