import { createSlice } from "@reduxjs/toolkit";

const initialState={
    
    fullName:"",
    email:"",
    password:"",
    dob:"",
    gendre:"",
    relationshipStatus:"",
    haveAnyKids:"",
    currentHealthRate:"",
    haveAnyDisability:"",
    location:"",
    hobbies:[],
}


export const signUpPageStateSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        setSignUpData: (state, action) => {
            state.fullName = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        setSignUpExtraData: (state, action) => {
            state.dob = action.payload.dob;
            state.gendre = action.payload.gendre;
            state.relationshipStatus = action.payload.relationshipStatus;
            state.haveAnyKids = action.payload.haveAnyKids;
        },
        setSignUpNextExtraData: (state, action) => {
            state.currentHealthRate = action.payload.currentHealthRate;
            state.haveAnyDisability = action.payload.haveAnyDisability; 
        },
        setSignUpFinalData: (state, action) => {
            state.location = action.payload.location;
            state.hobbies = action.payload.hobbies;
        },
        setAccessAndRefresh: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
    }
})

export const { setSignUpData,
    setSignUpExtraData, 
    setSignUpNextExtraData, 
    setSignUpFinalData ,
    setAccessAndRefresh
}=signUpPageStateSlice.actions;

export default signUpPageStateSlice.reducer;
