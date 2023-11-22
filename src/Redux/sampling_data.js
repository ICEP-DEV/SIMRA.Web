const { createSlice } = require("@reduxjs/toolkit");
var initialState = {}

export const samplingSlice = createSlice({
    name: "samplingInfo",
    initialState: {value:{}},
    reducers: {
      sampling_details: (state, action)=> {
        state.value = action.payload
      },
      remove_sample_details:() => initialState
    }
  })
  
  export const { sampling_details, remove_sample_details } = samplingSlice.actions;
  export default samplingSlice.reducer