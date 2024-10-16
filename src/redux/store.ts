import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { counterReducer, themeReducer, authReducer } from './slices';
import { apiPostListing, apiSlice, uploadApi } from './apiServices';

import { AuthState } from '@/app/utils/types';

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

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
  counter: ReturnType<typeof counterReducer>;
  theme: ReturnType<typeof themeReducer>;
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
}
