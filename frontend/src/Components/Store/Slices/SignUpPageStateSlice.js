import { createSlice } from "@reduxjs/toolkit";

const initialState={
    signUp: false,
    signUpExtra: false,
    signUpNextExtra: false,
    signUpFinal: false,
};

export const signUpPageStateSlice = createSlice({
    name: "signUpPageState",
    initialState,
    reducers: {
        setSignUp: (state, action) => {
            state.signUp = action.payload;
        },
        setSignUpExtra: (state, action) => {
            state.signUpExtra = action.payload;
        },
        setSignUpNextExtra: (state, action) => {
            state.signUpNextExtra = action.payload;
        },
        setSignUpFinal: (state, action) => {
            state.signUpFinal = action.payload;
        }
    }
})

export const { setSignUp ,setSignUpExtra, setSignUpNextExtra, setSignUpFinal }=signUpPageStateSlice.actions;

export default signUpPageStateSlice.reducer;