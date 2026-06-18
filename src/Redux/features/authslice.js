import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../app/axios";
import { persistor } from "../app/store";

const STEP_MAP = {
  1: 'category',
  2: 'bank',
  3: 'media',
  4: 'pricing',
  5: 'docs',
  6: 'calendar',
  7: 'completed'
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, accountType }, { rejectWithValue }) => {
    try {
      const endpoint = accountType === "user" ? "/user/login" : "/vendor/login";
      const res = await api.post(endpoint, { email, password });

      const responseData = res.data?.data || res.data;
      const token = responseData?.token || res.data?.token;

      if (!token) {
        return rejectWithValue("No token received from server");
      }

      localStorage.setItem("token", token);

      const payload = {
        token,
        accountType,
        user: responseData?.user || null,
        vendor: responseData?.vendor || responseData || null,
      };

      return payload;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        err.message ||
        "Login failed";
      return rejectWithValue(errorMsg);
    }
  },
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp, accountType }, { rejectWithValue }) => {
    try {
      const endpoint =
        accountType === "user" ? "/user/verify" : "/vendor/verify";
      const res = await api.post(endpoint, { email, otp });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      return { ...res.data, accountType };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async ({ email, accountType }, { rejectWithValue }) => {
    try {
      const endpoint =
        accountType === "user" ? "/user/resend-otp" : "/vendor/resend-otp";

      const res = await api.post(endpoint, { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Resend OTP failed",
      );
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email, accountType }, { rejectWithValue }) => {
    try {
      const endpoint =
        accountType === "user"
          ? "/user/forgot-password"
          : "/vendor/forgot-password";

      const res = await api.post(endpoint, { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to send OTP",
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, password, confirmPassword, accountType }, { rejectWithValue }) => {
    try {
      const endpoint =
        accountType === "user"
          ? "/user/reset-password"
          : "/vendor/reset-password";

      const body =
        accountType === "vendor"
          ? { email, password, confirmPassword }
          : { email, otp, password, confirmPassword };

      const res = await api.post(endpoint, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password reset failed",
      );
    }
  },
);

export const createPricing = createAsyncThunk(
  "auth/createPricing",
  async (
    { packagePrice, packageDescription, packageName },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/pricing", {
        packagePrice,
        packageDescription,
        packageName,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to create pricing package"
      );
    }
  }
);

export const getAllPricing = createAsyncThunk(
  "pricing/getAllPricing",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/all-pricing");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch pricing",
      );
    }
  },
);

export const updatePricing = createAsyncThunk(
  "auth/updatePricing",
  async (
    { pricingId, packagePrice, packageDescription, packageName },
    { rejectWithValue },
  ) => {
    try {
      const res = await api.put(`/new-pricing/${pricingId}`, {
        packagePrice,
        packageDescription,
        packageName,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message,
      );
    }
  },
);

export const updateVendorProfile = createAsyncThunk(
  "vendor/updateProfile",
  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/vendor/update-profile/${id}`, profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

export const replaceVendorMedia = createAsyncThunk(
  "vendor/replaceMedia",
  async ({ vendorId, file, mediaId, mediaType }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("mediaId", mediaId); 
      formData.append("mediaType", mediaType);

      const res = await api.put(
        `/vendor/replace-media/${vendorId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Media update failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accountType } = getState().auth;
      const endpoint =
        accountType === "user" ? "/user/logout" : "/vendor/logout";
      await api.post(endpoint);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const uploadKyc = createAsyncThunk(
  "vendor/uploadKyc",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const res = await api.post('/kyc/upload-kyc', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "KYC upload failed");
    }
  }
);

export const getNotifications = createAsyncThunk(
  "auth/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/notification");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch notifications"
      );
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "auth/markNotificationRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const res = await api.put(`/notification/read-notification/${notificationId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to mark as read"
      );
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  "auth/markAllNotificationsRead",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.put("/notification/mark-all-read");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to mark all as read"
      );
    }
  }
);


export const acceptBooking = createAsyncThunk(
  "auth/acceptBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await api.put(`/bookings/accept/${bookingId}`);
      return { bookingId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const rejectBooking = createAsyncThunk(
  "auth/rejectBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await api.put(`/bookings/reject/${bookingId}`);
      return { bookingId, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getVendorById = createAsyncThunk(
  "vendor/getById",
  async (vendorSlug, { rejectWithValue }) => {
    try {
      console.log("Fetching vendor:", vendorSlug);

      const res = await api.get(`/vendor/one-vendor/${vendorSlug}`);

      console.log("Response:", res);

      return res.data;
    } catch (err) {
      console.log("Thunk error:", err);

      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch vendor"
      );
    }
  }
);

export const verifyResetOTP = createAsyncThunk(
  "auth/verifyResetOTP",
  async ({ email, otp, accountType }, { rejectWithValue }) => {
    try {
      const endpoint =
        accountType === "user" ? "/user/verify-otp" : "/vendor/verify-otp";
      const res = await api.post(endpoint, { email, otp });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accountType } = getState().auth;
      const endpoint = accountType === "user" ? "/user/me" : "/vendor/me";
      const res = await api.get(endpoint);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    vendorInfo: null,
    token: localStorage.getItem("token") || null,
    accountType: null,
    isLoggedIn: !!localStorage.getItem("token"),
    isLoading: false,
    error: null,
    pricingPackages: [],
    notificationsLoading: false,
    notifications: [],
    unreadCount: 0,
    currentVendor: null,
    currentVendorLoading: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.accountType = null;
      state.isLoggedIn = false;
      // userInfo and vendorInfo are intentionally NOT cleared here
    },
    clearError: (state) => {
      state.error = null;
    },
    updateVendorInfo: (state, action) => {
      state.vendorInfo = { ...state.vendorInfo, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.accountType = action.payload.accountType;

        if (action.payload.accountType === "user") {
          state.userInfo = action.payload.user || action.payload;
        } else {
          const vendor = action.payload.vendor || action.payload;

          state.vendorInfo = {
            ...vendor,
            _id: vendor.id || vendor._id,
            id: vendor.id || vendor._id,
            slug: vendor.slug || null,
            isOnboarded: vendor.isOnboarded ?? false,
            onboardingStep: vendor.onboardingStep || 1,
            currentStep: STEP_MAP[vendor.onboardingStep] || 'category',
            verificationStatus: vendor.verificationStatus || 'pending',
            profilePicture: vendor.profilePicture?.secureUrl || vendor.profilePicture || null,
            coverPhoto: vendor.coverPhoto?.secureUrl || vendor.coverPhoto || null,
          };
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyResetOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyResetOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyResetOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPricing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPricing.fulfilled, (state, action) => {
        state.isLoading = false;
        const savedPricing = {
          ...(action.payload || {}),
          ...(action.meta?.arg || {}),
        };
        if (!Array.isArray(state.pricingPackages)) {
          state.pricingPackages = [];
        }
        const key = savedPricing.id || savedPricing.packageName;
        const existingIndex = state.pricingPackages.findIndex(
          (pkg) => pkg.id === key || pkg.packageName === key,
        );
        if (existingIndex >= 0) {
          state.pricingPackages[existingIndex] = {
            ...state.pricingPackages[existingIndex],
            ...savedPricing,
          };
        } else {
          state.pricingPackages.push(savedPricing);
        }
      })
      .addCase(createPricing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllPricing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPricing.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload?.data || action.payload;
        state.pricingPackages = Array.isArray(payload)
          ? payload
          : [payload].filter(Boolean);
      })
      .addCase(getAllPricing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePricing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePricing.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedPricing = action.payload?.data || action.payload;
        const index = state.pricingPackages.findIndex(
          (item) => item.id === updatedPricing.id,
        );
        if (index !== -1) {
          state.pricingPackages[index] = updatedPricing;
        }
      })
      .addCase(updatePricing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateVendorProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateVendorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedData = action.payload.data || action.payload;
        state.vendorInfo = {
          ...state.vendorInfo,
          ...updatedData,
          _id: updatedData.id || updatedData._id || state.vendorInfo._id,
          id: updatedData.id || updatedData._id || state.vendorInfo.id,
          profilePicture: updatedData.profilePicture?.secureUrl || updatedData.profilePicture || state.vendorInfo.profilePicture,
          coverPhoto: updatedData.coverPhoto?.secureUrl || updatedData.coverPhoto || state.vendorInfo.coverPhoto,
          onboardingStep: updatedData.onboardingStep ?? state.vendorInfo.onboardingStep,
          currentStep: STEP_MAP[updatedData.onboardingStep] || state.vendorInfo.currentStep,
          isOnboarded: updatedData.isOnboarded ?? state.vendorInfo.isOnboarded
        };
      })
      .addCase(updateVendorProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(replaceVendorMedia.fulfilled, (state, action) => {
      const updatedVendor = action.payload?.data;

      if (updatedVendor) {
        state.currentVendor = {
          ...state.currentVendor,
          ...updatedVendor,
        };
      }
      })
      
      .addCase(uploadKyc.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadKyc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vendorInfo = {
          ...state.vendorInfo,
          isOnboarded: true,
          onboardingStep: 7,
          currentStep: 'completed',
          isKycVerified: action.payload.data?.isKycVerified || false,
          verificationStatus: action.payload.data?.verificationStatus || 'pending'
        };
      })
      .addCase(uploadKyc.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        if (state.vendorInfo) {
          state.vendorInfo.isOnboarded = false;
          state.vendorInfo.verificationStatus = 'failed';
          state.vendorInfo.currentStep = 'docs';
          state.vendorInfo.onboardingStep = 5;
        }
      })
  .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem("token");
        state.userInfo = null;
        state.vendorInfo = null;
        state.token = null;
        state.accountType = null;
        state.isLoggedIn = false;
      })
    .addCase(logoutUser.rejected, (state) => {
        localStorage.removeItem("token");
        state.userInfo = null;
        state.vendorInfo = null;
        state.token = null;
        state.accountType = null;
        state.isLoggedIn = false;
      })
      .addCase(getNotifications.pending, (state) => {
        state.notificationsLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notificationsLoading = false;
        state.notifications = action.payload.data || [];
        state.unreadCount = action.payload.count || 0;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.notificationsLoading = false;
        state.error = action.payload;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.notifications = state.notifications.map(n =>
          n._id === id ? { ...n, read: true } : n
        );
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      })
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.unreadCount = 0;
        state.notifications = state.notifications.map(n => ({ ...n, read: true }));
      })
      .addCase(getVendorById.pending, (state) => {
        state.currentVendorLoading = true;
        state.currentVendor = null;
        state.error = null;
      })
      .addCase(getVendorById.fulfilled, (state, action) => {
        state.currentVendorLoading = false;
        const vendor = action.payload.data || action.payload;

        if (!vendor || !vendor._id) {
          state.error = "Invalid vendor data";
          return;
        }

        state.currentVendor = {
          ...vendor,
          profilePicture: vendor.profilePicture?.secureUrl || vendor.profilePicture || null,
          coverPhoto: vendor.coverPhoto?.secureUrl || vendor.coverPhoto || null,
          pricingPackages: vendor.pricingPackages || [],
        };
        state.error = null;
      })
      .addCase(getVendorById.rejected, (state, action) => {
        state.currentVendorLoading = false;
        state.error = action.payload;
        state.currentVendor = null;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload?.data || action.payload;

        if (state.accountType === "user") {
          state.userInfo = data.user || data;
        } else {
          const vendor = data.vendor || data;
          state.vendorInfo = {
            ...state.vendorInfo,
            ...vendor,
            _id: vendor.id || vendor._id,
            id: vendor.id || vendor._id,
            slug: vendor.slug || null,
            isOnboarded: vendor.isOnboarded ?? false,
            onboardingStep: vendor.onboardingStep || 1,
            currentStep: STEP_MAP[vendor.onboardingStep] || 'category',
            verificationStatus: vendor.verificationStatus || 'pending',
            profilePicture: vendor.profilePicture?.secureUrl || vendor.profilePicture || null,
            coverPhoto: vendor.coverPhoto?.secureUrl || vendor.coverPhoto || null,
          };
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, updateVendorInfo } = authSlice.actions;
export default authSlice.reducer;