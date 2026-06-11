import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authslice'
import userReducer from '../features/userslice'
import vendorReducer from '../features/vendorslice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    vendor: vendorReducer,
  },
});
