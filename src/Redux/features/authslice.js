import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from "../app/axios"

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, accountType }, { rejectWithValue }) => {
    try {
      const endpoint = accountType === 'user'? '/user/login' : '/vendor/login'
      const res = await api.post(endpoint, { email, password })
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        
      }
      return {...res.data, accountType }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed')
    }
  }
)

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ email, otp, accountType }, { rejectWithValue }) => {
    try {
      const endpoint = accountType === 'user'? '/user/verify' : '/vendor/verify' 
      const res = await api.post(endpoint, { email, otp })
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
      }
      return {...res.data, accountType }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'OTP verification failed')
    }
  }
)

  export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async ({ email, accountType }, { rejectWithValue }) => {
    try {
      const endpoint =
        accountType === "user"
          ? "/user/resend-otp"
          : "/vendor/resend-otp";

      const res = await api.post(endpoint, { email });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Resend OTP failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post('/user/forgot-password', { email })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to send OTP')
    }
  }
)

export const verifyResetPasswordOTP = createAsyncThunk(
  'auth/verifyResetPasswordOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post('/forgot-password/verify-otp', { email, otp })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Reset OTP failed')
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, otp, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await api.post('/user/reset-password', { 
        email, 
        otp, 
        password,
        confirmPassword  
      })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Password reset failed')
    }
  }
)
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accountType } = getState().auth
      const endpoint = accountType === 'user' ? '/user/logout' : '/vendor/logout'
      await api.post(endpoint)
    } catch (err) {
      return rejectWithValue(err.response?.data?.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    vendorInfo: null,
    token: localStorage.getItem('token') || null,
    accountType: null,
    isLoggedIn:!!localStorage.getItem('token'),
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.userInfo = null
      state.vendorInfo = null
      state.token = null
      state.accountType = null 
      state.isLoggedIn = false
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
    .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = true
        state.token = action.payload.token
        state.accountType = action.payload.accountType
        if (action.payload.accountType === 'user') {
          state.userInfo = action.payload.user
        } else {
          state.vendorInfo = action.payload.vendor
        }
      })
    .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

    .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
    .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = true
        state.token = action.payload.token
        state.accountType = action.payload.accountType
        if (action.payload.accountType === 'user') {
          state.userInfo = action.payload.user
        } else {
          state.vendorInfo = action.payload.vendor
        }
      })
    .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

    .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
    .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false
      })
    .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

    .addCase(verifyResetPasswordOTP.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
    .addCase(verifyResetPasswordOTP.fulfilled, (state) => {
        state.isLoading = false
      })
    .addCase(verifyResetPasswordOTP.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

    .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
    .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false
      })
    .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
 .addCase(logoutUser.fulfilled, (state) => {
  localStorage.removeItem('token')
  state.userInfo = null
  state.vendorInfo = null
  state.token = null
  state.accountType = null
  state.isLoggedIn = false
})  
.addCase(logoutUser.rejected, (state) => {
  localStorage.removeItem('token')
  state.userInfo = null
  state.vendorInfo = null
  state.token = null
  state.accountType = null
  state.isLoggedIn = false
})
  }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer