import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import travelSlice from './slices/travelSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    travel: travelSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;