// import { configureStore } from "@reduxjs/toolkit";

// import searchReducer from "./searchSlice";

// export const store = configureStore({
//   reducer: {
//     project: projectReducer,
//     search: searchReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import searchReducer from "./searchSlice";
import projectReducer from "./projectSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    project: projectReducer,
    settings: settingsReducer,
  },
  middleware: [...getDefaultMiddleware()],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
