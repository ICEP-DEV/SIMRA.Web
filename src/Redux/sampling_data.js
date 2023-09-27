const { createSlice } = require("@reduxjs/toolkit");
var initialState = {}

export const samplingSlice = createSlice({
    name: "samplingInfo",
    initialState: {value:{
        type: "",
        waterAccessability: "",
        weatherCondition: "",
        muni_id: "",
        user_id:0,
    }},
    reducers: {
      sampling_details: (state, action)=> {
        state.value = action.payload
      }
    }
  })
  
  export const { sampling_details } = samplingSlice.actions;
  export default samplingSlice.reducer