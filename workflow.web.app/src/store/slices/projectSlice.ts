import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IProjectState {
    selectedProjectId: number | null;
}

const initialState: IProjectState = {
    selectedProjectId: null,
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        selectProject(state, action: PayloadAction<number | null>) {
            state.selectedProjectId = action.payload;
        },
    }
});

export const {selectProject} = projectSlice.actions;
export default projectSlice.reducer;