import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../app/axios'

export const signupVendor = createAsyncThunk(
  'vendor/sign-up',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post('/vendor/sign-up', formData);
      return { email: formData.email };
    } catch (err) {
    
      return rejectWithValue(
        err.response?.data?.message || 'Signup failed'
      );
    }
  }
);




const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    signupEmail: null,
    isLoading: false,
    error: null,
    otpSent: false,
  },
  reducers: {
    resetSignup: (state) => {
      state.error = null
      state.otpSent = false
      state.signupEmail = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupVendor.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signupVendor.fulfilled, (state, action) => {
        state.isLoading = false
        state.otpSent = true
        state.signupEmail = action.payload.email
      })
      .addCase(signupVendor.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { resetSignup } = vendorSlice.actions
export default vendorSlice.reducer