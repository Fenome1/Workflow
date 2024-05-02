import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

interface IBoardState {
    selectedBoardId: number | null;
}

const initialState: IBoardState = {
    selectedBoardId: null,
}

const boardSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        selectBoard(state, action: PayloadAction<number | null>) {
            state.selectedBoardId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {selectBoard} = boardSlice.actions;
export default boardSlice.reducer;