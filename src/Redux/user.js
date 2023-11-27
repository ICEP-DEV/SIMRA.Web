const { createSlice } = require("@reduxjs/toolkit");
var initialState = {}
export const userSlice = createSlice({
  name: "userInfo",
  initialState: {value:{}},
  reducers: {
    user_details: (state, action)=> {
      state.value = action.payload
    },
    remove_details:() => initialState
  }
})

export const { user_details, remove_details } = userSlice.actions;
export default userSlice.reducer