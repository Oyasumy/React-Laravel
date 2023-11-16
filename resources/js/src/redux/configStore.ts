import { Action, applyMiddleware, compose, configureStore, Middleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducer';
// import logger from "redux-logger";

// Root State
export type RootState = ReturnType<typeof rootReducer>;

const enhancers = [
  applyMiddleware(),
  // thunkMiddleware,
  // createLogger({
  //   collapsed: true,
  //   predicate: () => __DEV__,
  // }),
];

const enhancer = compose(...enhancers);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

// Persisted Reducer to Save Storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store redux
export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  // enhancers: enhancer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .prepend
      // correctly typed middlewares can just be used
      // additionalMiddleware,
      // you can also type middlewares manually
      // untypedMiddleware as Middleware<(action: Action<"specialAction">) => number, RootState>
      ()
      // prepend and concat calls can be chained
      .concat(),
});

export const persistor = persistStore(store);

// Type App Dispatch
export type AppDispatch = typeof store.dispatch;
