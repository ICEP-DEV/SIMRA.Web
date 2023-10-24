const { createSlice } = require("@reduxjs/toolkit");
var initialState = {}

export const fibSlice = createSlice({
    name: "fibInfo",
    initialState: {value:{}},
    reducers: {
      fib_details: (state, action)=> {
        state.value = action.payload
      }
    }
  })
  
  export const { fib_details } = fibSlice.actions;
  export default fibSlice.reducer