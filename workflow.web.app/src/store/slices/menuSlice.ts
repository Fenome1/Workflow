import {TeamMenuItem} from "../../common/TeamMenuItem.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

interface IMenuState {
    selectedMenuItem: TeamMenuItem;
}

const initialState: IMenuState = {
    selectedMenuItem: TeamMenuItem.Projects,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        selectMenuItem(state, action: PayloadAction<TeamMenuItem>) {
            state.selectedMenuItem = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {selectMenuItem} = menuSlice.actions;
export default menuSlice.reducer;