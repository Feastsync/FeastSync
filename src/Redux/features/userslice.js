import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../app/axios'

export const signupUser = createAsyncThunk(
  'user/signup',
  async (formData, { rejectWithValue }) => {
    try {
      await api.post('/user/register', formData)
      return { email: formData.email }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Signup failed')
    }
  }
)

export const resendOTP = createAsyncThunk(
  'user/resendOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/resend-otp', { email })
      return { email, message: response.data?.message }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Resend failed')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    signupEmail: null,
    isLoading: false,
    error: null,
    otpSent: false,
    resendLoading: false,
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
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.otpSent = true
        state.signupEmail = action.payload.email
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { resetSignup } = userSlice.actions
export default userSlice.reducer