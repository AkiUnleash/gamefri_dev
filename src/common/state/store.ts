import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;