import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

interface IAgencyState {
    selectedAgencyId: number | null;
}

const initialState: IAgencyState = {
    selectedAgencyId: null,
}

const agencySlice = createSlice({
    name: 'agency',
    initialState,
    reducers: {
        selectAgency(state, action: PayloadAction<number | null>) {
            state.selectedAgencyId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {selectAgency} = agencySlice.actions;
export default agencySlice.reducer;