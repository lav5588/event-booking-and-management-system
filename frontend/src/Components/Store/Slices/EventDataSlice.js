import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventData: null,
};

export const eventDataSlice=createSlice({
    name: 'eventData',
    initialState,
    reducers: {
      setEventData: (state, action) => {
        state.eventData = action.payload;
      },
      setLike:(state, action) => {
        const data=JSON.parse(JSON.stringify(state.eventData)).map((item) => {
              if (item._id===action.payload){
                return {...item,isLike:!item.isLike}
              }
              return item;
        });
        state.eventData=data;
      },
    }
});

export const { setEventData,setLike }=eventDataSlice.actions;

export default eventDataSlice.reducer;
