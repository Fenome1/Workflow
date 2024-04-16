import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    }
});

export const {selectBoard} = boardSlice.actions;
export default boardSlice.reducer;