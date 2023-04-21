// import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./projectSlice";
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

import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
