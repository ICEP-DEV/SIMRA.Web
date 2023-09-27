import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./user"
import samplingReducer from "./sampling_data";

const store = configureStore({
  reducer: {
    user: UserReducer,
    sampling:samplingReducer
  },
});

export default store;