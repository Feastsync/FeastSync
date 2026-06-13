import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../app/axios'

export const createBooking = createAsyncThunk(
  'booking/create',
  async ({ pricingId, vendorId, bookingDate, bookingTitle, eventType, eventLocation }, { rejectWithValue }) => {
    try {
      const res = await api.post('/bookings/bookings', {
        pricingId,
        vendorId,
        bookingDate,
        bookingTitle,
        eventType,
        eventLocation,
      })
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Booking failed')
    }
  }
)

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    booking: null,
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetBooking: (state) => {
      state.booking = null
      state.isLoading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = false
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.success = true
        state.booking = action.payload
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { resetBooking } = bookingSlice.actions
export default bookingSlice.reducer