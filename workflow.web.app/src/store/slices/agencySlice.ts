import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

interface IAgencyState {
    selectedAgencyId: number | undefined;
}

const initialState: IAgencyState = {
    selectedAgencyId: undefined,
}

const agencySlice = createSlice({
    name: 'agency',
    initialState,
    reducers: {
        selectAgency(state, action: PayloadAction<number | undefined>) {
            state.selectedAgencyId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {selectAgency} = agencySlice.actions;
export default agencySlice.reducer;