import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../configStore';

// Define the initial state using that type
export const initialState = {
  data: [],
};

// Reducer
export const usersSlice = createSlice({
  name: 'usersSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUsers = (state: RootState) => state.user;

export default usersSlice.reducer;
