import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    }
});

export const {selectAgency} = agencySlice.actions;
export default agencySlice.reducer;