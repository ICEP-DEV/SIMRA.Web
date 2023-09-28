const { createSlice } = require("@reduxjs/toolkit");
var initialState = {}
export const userSlice = createSlice({
  name: "userInfo",
  initialState: {value:{}},
  reducers: {
    user_details: (state, action)=> {
      state.value = action.payload
    }
  }
})

export const { user_details } = userSlice.actions;
export default userSlice.reducer