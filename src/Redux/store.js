import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import UserReducer from "./user"
import samplingReducer from "./sampling_data";

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer = combineReducers({
  user: UserReducer,
  sampling: samplingReducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer
});

export default store;