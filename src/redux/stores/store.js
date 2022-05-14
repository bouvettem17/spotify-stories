import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice'
import trackDataReducer from "../slices/trackDataSlice";


export default configureStore({
  reducer: {
    user: userReducer,
    trackData: trackDataReducer
  }
})