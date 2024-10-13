import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { counterReducer, themeReducer, authReducer } from './slices';
import { apiPostListing, apiSlice, uploadApi } from './apiServices';

const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
  theme: themeReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [PER.FLUSH, PER.REHYDRATE, PER.PAUSE, PER.PERSIST, PER.PURGE, PER.REGISTER],
      // },
    }).concat(
      apiSlice.middleware,
      apiPostListing.middleware,
      uploadApi.middleware
    ),
});

// Create a persistor
export const persistor = persistStore(store);

// Export types for RootState and AppDispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
