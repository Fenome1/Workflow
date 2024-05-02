import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

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
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {selectProject} = projectSlice.actions;
export default projectSlice.reducer;