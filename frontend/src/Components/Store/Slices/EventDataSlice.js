import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // selectedEvent:null,
  eventData: null,
};

export const eventDataSlice=createSlice({
    name: 'eventData',
    initialState,
    reducers: {
      setEventData: (state, action) => {
        state.eventData = action.payload;
      },
      // setSelectedEvent: (state, action) => {
      //   state.selectedEvent = action.payload;
      // },
    }
});

export const { setEventData,setSelectedEvent }=eventDataSlice.actions;

export default eventDataSlice.reducer;