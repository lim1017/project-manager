import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./persist-store";
export interface SettingState {
  sortBy: string;
}

export enum SortBy {
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

const createInitalSettings = () => {
  const initialState: SettingState = {
    sortBy: SortBy.ASCENDING,
  };

  const settingsState = loadState()?.settings;
  if (settingsState) {
    return settingsState;
  } else return initialState;
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: createInitalSettings(),
  reducers: {
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = settingsSlice.actions;
export default settingsSlice.reducer;
