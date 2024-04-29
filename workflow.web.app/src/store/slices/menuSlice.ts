import {TeamMenuItem} from "../../common/TeamMenuItem.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IMenuState {
    selectedMenuItem: TeamMenuItem | null;
}

const initialState: IMenuState = {
    selectedMenuItem: null,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        selectMenuItem(state, action: PayloadAction<TeamMenuItem | null>) {
            state.selectedMenuItem = action.payload;
        },
    }
});

export const {selectMenuItem} = menuSlice.actions;
export default menuSlice.reducer;