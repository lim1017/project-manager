import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SettingState {
  sortBy: string;
}

export enum SortBy {
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

const initialState: SettingState = {
  sortBy: SortBy.ASCENDING,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = settingsSlice.actions;
export default settingsSlice.reducer;
