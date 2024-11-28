import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { themeReducer, authReducer } from './slices';
import { apiPostListing, apiSlice, uploadApi } from './apiServices';

import { AuthState } from '@/app/utils/types';

export const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer({
  key: 'root',
  storage,
}, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      apiSlice.middleware,
      apiPostListing.middleware,
      uploadApi.middleware
    ),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export interface RootState {
  auth: AuthState;
  theme: ReturnType<typeof themeReducer>;
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
}
