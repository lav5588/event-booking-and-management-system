import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    basicInfo:false,
    inviteeInfo:false,
}


export const CreateEventPageStateSlice = createSlice({
    name: "createEventPageState",
    initialState,
    reducers: {
        setBasicInfo: (state, action) => {
            state.basicInfo = action.payload;
        },
        setInviteeInfo: (state, action) => {
            state.inviteeInfo = action.payload;
        },
    }
})

export const { setBasicInfo, setInviteeInfo }=CreateEventPageStateSlice.actions;
export default CreateEventPageStateSlice.reducer;