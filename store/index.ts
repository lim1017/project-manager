import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import searchReducer from "./searchSlice";
import projectReducer from "./projectSlice";
import settingsReducer from "./settingsSlice";
import { saveState } from "./persist-store";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    project: projectReducer,
    settings: settingsReducer,
  },
  middleware: [...getDefaultMiddleware()],
});

store.subscribe(() => saveState(store));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
