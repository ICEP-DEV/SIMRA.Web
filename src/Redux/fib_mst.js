const { createSlice } = require("@reduxjs/toolkit");
// var initialState = {}

export const fib_mstSlice = createSlice({
    name: "fib_mstInfo",
    initialState: {value:{}},
    reducers: {
      fib_mst_details: (state, action)=> {
        state.value = action.payload
      }
    }
  })
  
  export const { fib_mst_details } = fib_mstSlice.actions;
  export default fib_mstSlice.reducer