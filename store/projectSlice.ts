import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectType } from "../types/types";

// interface ProjectState {
//   projects: ProjectType[];
// }

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectType[]>) => {
      console.log(action.payload, "actionnnnnnnnnnn payyyyyyloaddddd");
      state.projects = [...action.payload];
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    getProjects: (state, action) => {
      return state;
    },
  },
});

export const { addProject, getProjects, setProjects } = projectSlice.actions;
export default projectSlice.reducer;
