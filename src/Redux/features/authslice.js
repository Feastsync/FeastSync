import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../app/axios";
import { persistor } from "../app/store";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, accountType }, { rejectWithValue }) => {
    try {
      const endpoint = accountType === "user" ? "/user/login" : "/vendor/login";
      const res = await api.post(endpoint, { email, password });

      console.log("Login API Response:", res.data);

      const responseData = res.data?.data || res.data;
      const token = responseData?.token || res.data?.token;

      if (!token) {
        return rejectWithValue("No token received from server");
      }

      localStorage.setItem("token", token);

      const payload = {
        ...responseData,
        token,
        accountType,
        user: responseData?.user || responseData,
        vendor: responseData?.vendor || responseData,
      };

      console.log("Login payload to store:", payload);
      return payload;
    } catch (err) {
      console.error("Login error:", err);
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

      console.log("ENDPOINT:", endpoint);
      console.log("EMAIL:", email);

      const res = await api.post(endpoint, { email });

      return res.data;
    } catch (err) {
      console.log("FORGOT PASSWORD ERROR:", err.response?.data);

      return rejectWithValue(
        err.response?.data?.message || "Failed to send OTP",
      );
    }
  },
);

export const verifyResetPasswordOTP = createAsyncThunk(
  "auth/verifyResetPasswordOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post("/forgot-password/verify-otp", { email, otp });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Reset OTP failed");
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/reset-password", {
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

export const createPricing = createAsyncThunk(
  "auth/createPricing",
  async (
    { packagePrice, packageDescription, packageName },
    { rejectWithValue },
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
        err.response?.data?.message || "Failed to create pricing package",
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
      { rejectWithValue }
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
          err.response?.data?.message || "Failed to update pricing package"
        );
      }
    }
  );


export const updateVendorProfile = createAsyncThunk(
  "vendor/updateProfile",
  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/vendor/update-profile/${id}`,
        profileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    vendorInfo: null,
    token: localStorage.getItem("token") || null,
    accountType: null,
    isLoggedIn: !!localStorage.getItem("token"),
    isLoading: false,
    loading: false,
    error: null,
    pricing: [],
    pricingPackages: [],
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

        // Store user or vendor data based on account type
        if (action.payload.accountType === "user") {
          state.userInfo = action.payload.user || action.payload;
        } else {
          state.vendorInfo = action.payload.vendor || action.payload;
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
          state.vendorInfo = action.payload.vendor;
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
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.accountType = action.payload.accountType;
        if (action.payload.accountType === "user") {
          state.userInfo = action.payload.user;
        } else {
          state.vendorInfo = action.payload.vendor;
        }
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

      .addCase(verifyResetPasswordOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyResetPasswordOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyResetPasswordOTP.rejected, (state, action) => {
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
        (item) => item.id === updatedPricing.id
      );
    
      if (index !== -1) {
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
     })
     .addCase(updateVendorProfile.fulfilled, (state, action) => {
       state.loading = false;
       state.vendorProfile = action.payload;
       state.success = true;
     })
     .addCase(updateVendorProfile.rejected, (state, action) => {
       state.loading = false;
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
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
