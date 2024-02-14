import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    eventName: "",
    isOpen:"Open",
    isFree:"Priced",
    price:0,
    date:"",
    location: "",
    startTime: "",
    endTime: "",
    category: "",
    format: "",
    description:"",
    hashTags:[],
    files:[],
    inviteeViaMail:[],
    inviteeViaNumber:[],
};

export const createEventDataStateSlice = createSlice({
    name: "createEventDataState",
    initialState,
    reducers: {
        setEventName:(state,action)=>{
                state.eventName = action.payload;         
        },
        setIsOpen:(state,action)=>{
            state.isOpen = action.payload;
        },
        setIsFree:(state,action)=>{
            state.isFree = action.payload;
        },
        setPrice:(state,action)=>{
            state.price = action.payload;
        },
        setDate:(state,action)=>{
            state.date = action.payload;
        },
        setLocation:(state,action)=>{
            state.location = action.payload;
        },
        setStartTime:(state,action)=>{
            state.startTime = action.payload;
        },
        setEndTime:(state,action)=>{
            state.endTime = action.payload;
        },
        setCategory:(state,action)=>{
            state.category = action.payload;
        },
        setFormat:(state,action)=>{
            state.format = action.payload;
        },
        setDescription:(state,action)=>{
            state.description=action.payload;
        },
        setHashTags:(state,action)=>{
            state.hashTags.push('#'+action.payload);
        },
        removeHashTags:(state,action)=>{
            state.hashTags = state.hashTags.filter((item) => item!== action.payload);
        },
        setFiles:(state,action)=>{
            // [...action.payload].forEach((file)=>{
            //     state.files.push(file);
            // })
            state.files=[...state.files,...action.payload];
            
        },
        removeFiles:(state,action)=>{
            state.files = state.files.filter((item) => item!== action.payload);
        },
        setInviteeViaMail:(state, action) => {
            state.inviteeViaMail.push(action.payload);
        },
        removeInviteeViaMail:(state, action) => {
            state.inviteeViaMail = state.inviteeViaMail.filter((item) => item!== action.payload);
        },
        setInviteeViaNumber:(state, action) => {
            state.inviteeViaNumber.push(action.payload);
        },
        removeInviteeViaNumber:(state, action) => {
            state.inviteeViaNumber = state.inviteeViaNumber.filter((item) => item!== action.payload);
        }
    }
});


export const {
    setEventName,
  setIsOpen,
  setIsFree,
  setPrice,
  setDate,
  setLocation,
  setStartTime,
  setEndTime,
  setCategory,
  setFormat,
  setDescription,
  setHashTags,
  removeHashTags,
  setFiles,
  removeFiles,
  setInviteeViaMail,
  removeInviteeViaMail,
  setInviteeViaNumber,
  removeInviteeViaNumber
}=createEventDataStateSlice.actions;

export default createEventDataStateSlice.reducer