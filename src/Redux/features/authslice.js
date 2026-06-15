import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../app/axios";
import { persistor } from "../app/store";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, accountType }, { rejectWithValue }) => {
    try {
      const endpoint = accountType === "user"? "/user/login" : "/vendor/login";
      const res = await api.post(endpoint, { email, password });
      
      console.log('LOGIN RAW RESPONSE:', res.data); 
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
      console.log('LOGIN PAYLOAD TO REDUX:', payload);
      console.log('VENDOR isOnboarded:', payload.vendor?.isOnboarded);

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
        accountType === "user"? "/user/verify" : "/vendor/verify";
      const res = await api.post(endpoint, { email, otp });
      console.log(res)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      return {...res.data, accountType };
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
        accountType === "user"? "/user/resend-otp" : "/vendor/resend-otp";

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
  async (
    { email, otp, password, confirmPassword, accountType },
    { rejectWithValue },
  ) => {
    try {
      const endpoint =
        accountType === "user"
    ? "/user/reset-password"
          : "/vendor/reset-password";

      const res = await api.post(endpoint, {
        email,
        otp,
        password,
        confirmPassword,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password reset failed",
      );
    }
  },
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
        err.response?.data?.message || "Failed to update pricing package",
      );
    }
  },
);

export const updateVendorProfile = createAsyncThunk(
  "vendor/updateProfile",
  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      console.log("Sending request to:", `/vendor/update-profile/${id}`);

      const response = await api.put(
        `/vendor/update-profile/${id}`,
        profileData,
      );

      console.log("Response:", response.data);

      return response.data;
    } catch (error) {
      console.log("API Error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accountType } = getState().auth;
      const endpoint =
        accountType === "user"? "/user/logout" : "/vendor/logout";
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
      
      console.log('Full KYC Response:', res.data);
      return res.data;
    } catch (err) {
      console.log('KYC Error:', err.response?.data);
      return rejectWithValue(err.response?.data?.message || "KYC upload failed");
    }
  }
);
 
export const createPricing = createAsyncThunk(
  "auth/createPricing",
  async ({ packagePrice, packageDescription, packageName, pacakageName }, { rejectWithValue }) => {
    try {
      const res = await api.post("/pricing", {
        packagePrice,
        packageDescription,
        packageName: packageName || pacakageName,
        pacakageName: pacakageName || packageName,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create pricing package"
      );
    }
  }
);

export const getNotifications = createAsyncThunk(
  "auth/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("notification");
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
      const res = await api.put(`/api/notification/read-notificatication/${notificationId}`);
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
      const res = await api.put("/api/notification/mark-all-read");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to mark all as read"
      );
    }
  }
);

export const getVendorById = createAsyncThunk(
  "vendor/getById",
  async (vendorSlug, { rejectWithValue }) => {
    try {
      const res = await api.get(`/vendor/one-vendor/${vendorSlug}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch vendor");
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
    isLoggedIn:!!localStorage.getItem("token"),
    isLoading: false,
    loading: false,
    error: null,
    pricing: [],
    pricingPackages: [],
    notificationsLoading: false,
    kycUploaded: false,
    success: false,
    notifications: [],
    unreadCount: 0,
    viewingVendor: null,
    viewingVendorLoading: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.userInfo = null;
      state.vendorInfo = null;
      state.token = null;
      state.accountType = null;
      state.isLoggedIn = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateVendorInfo: (state, action) => {
      state.vendorInfo = {...state.vendorInfo,...action.payload };
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
            profilePicture: vendor.profilePicture?.secureUrl || vendor.profilePicture || null,
            coverPhoto: vendor.coverPhoto?.secureUrl || vendor.coverPhoto || null,
          };
        }
      })
.addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
.addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
.addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.accountType = action.payload.accountType;
        if (action.payload.accountType === "user") {
          state.userInfo = action.payload.user;
        } else {
          const vendor = action.payload.vendor;
          state.vendorInfo = {
        ...vendor,
            profilePicture: vendor.profilePicture?.secureUrl || vendor.profilePicture || null,
            coverPhoto: vendor.coverPhoto?.secureUrl || vendor.coverPhoto || null,
          };
        }
      })
.addCase(verifyOTP.rejected, (state, action) => {
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
        state.pricing = savedPricing;
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
        state.loading = true;
      })
.addCase(getAllPricing.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.pricingPackages = Array.isArray(payload)
    ? payload
          : [payload].filter(Boolean);
      })
.addCase(getAllPricing.rejected, (state, action) => {
        state.loading = false;
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
        if (index!== -1) {
          state.pricingPackages[index] = updatedPricing;
        }
        state.pricing = updatedPricing;
      })
.addCase(updatePricing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
.addCase(updateVendorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(updateVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        console.log('PROFILE UPDATE RESPONSE:', action.payload);
        
        const updatedData = action.payload.data;
        
        state.vendorInfo = {
      ...state.vendorInfo,
      ...updatedData,
          profilePicture: updatedData.profilePicture?.secureUrl || state.vendorInfo.profilePicture,
          coverPhoto: updatedData.coverPhoto?.secureUrl || state.vendorInfo.coverPhoto,
          isOnboarded: updatedData.isOnboarded?? true
        };
      })
.addCase(updateVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
.addCase(uploadKyc.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
.addCase(uploadKyc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.kycUploaded = true;
        state.vendorInfo = {
    ...state.vendorInfo,
          isOnboarded: true,
          isKycVerified: action.payload.data?.isKycVerified || false,
          verificationStatus: action.payload.data?.verificationStatus
        };
      })
.addCase(uploadKyc.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
.addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem("token");
        state.userInfo = null;
        state.vendorInfo = null;
        state.token = null;
        state.accountType = null;
        state.isLoggedIn = false;
        persistor.purge();
      })
.addCase(logoutUser.rejected, (state) => {
        localStorage.removeItem("token");
        state.userInfo = null;
        state.vendorInfo = null;
        state.token = null;
        state.accountType = null;
        state.isLoggedIn = false;
        persistor.purge();
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
          n._id === id? {...n, read: true } : n
        );
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      })
.addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.unreadCount = 0;
        state.notifications = state.notifications.map(n => ({...n, read: true }));
      })
.addCase(getVendorById.pending, (state) => {
    state.viewingVendorLoading = true;
    state.viewingVendor = null;
    state.error = null;
  })
.addCase(getVendorById.fulfilled, (state, action) => {
    state.viewingVendorLoading = false;
    const vendor = action.payload.data || action.payload;
    
    if (!vendor ||!vendor._id) {
      state.error = "Invalid vendor data";
      return;
    }
    
    state.viewingVendor = {
    ...vendor,
      profilePicture: vendor.profilePicture?.secureUrl || vendor.profilePicture || null,
      coverPhoto: vendor.coverPhoto?.secureUrl || vendor.coverPhoto || null,
      pricingPackages: vendor.pricingPackages || [],
    };
    state.error = null;
  })
.addCase(getVendorById.rejected, (state, action) => {
    state.viewingVendorLoading = false;
    state.error = action.payload;
    state.viewingVendor = null;
  });
  },
});

export const { logout, clearError, updateVendorInfo } = authSlice.actions;
export default authSlice.reducer;