import { configureStore } from '@reduxjs/toolkit';
import creatorReducers from '../features/creator/CreatorSlice';

export const store = configureStore({
  reducer: {
     creator: creatorReducers,
  },
  devTools: true
});
