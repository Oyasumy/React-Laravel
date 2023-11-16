import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../configStore';

// Define the initial state using that type
export const initialState = {
  isLoading: false,

  // false is Show
  isShowMenu: true,
  token: {
    accessToken: JSON.parse(localStorage.getItem('user') || 'null'),
  },
};

// Reducer
export const appSlice = createSlice({
  name: 'appSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setShowMenu: (state, action) => {
      state.isShowMenu = action.payload;
    },
    setACcessToken: (state, action) => {
      // Set to Local Storage
      localStorage.setItem('user', JSON.stringify(action.payload));

      state.token.accessToken = action.payload;
    },
    clearSession: (state) => {
      localStorage.clear();
      // init State
      return {
        ...state,
        token: {
          accessToken: '',
        },
      };
    },
  },
});

export const { setLoading, setShowMenu, setACcessToken, clearSession } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoading = (state: RootState) => state.app.isLoading;
export const selectIsShowMenu = (state: RootState) => state.app.isShowMenu;
export const selectAccessToken = (state: RootState) => state.app.token.accessToken;

export default appSlice.reducer;
