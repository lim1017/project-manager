import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectType } from "../types/types";

const initialState = {
  projects: [],
  string: "",
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectType[]>) => {
      state.projects = [...action.payload];
    },
    setText: (state, action: PayloadAction<string>) => {
      state.string = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    getProjects: (state, action) => {
      return state;
    },
  },
});

export const { addProject, getProjects, setProjects, setText } =
  projectSlice.actions;
export default projectSlice.reducer;
