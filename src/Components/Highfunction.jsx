 import { useEffect } from "react";
 import { useLocation } from "react-router-dom";
 import { useDispatch, useSelector } from 'react-redux'
 import api from "../Redux/app/axios.js";
import { getCurrentUser, logout } from '../Redux/features/authslice'
import Vendordashboard from '../Auth/Vendor/Vendordashboard.jsx'
import VendorOnboarding from '../Auth/Vendor/onBoardingFiles/VendorOnboarding.jsx'
 export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const TokenValidator = () => {
  const dispatch = useDispatch()
  const { token, accountType } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!token || !accountType) return

    const validateToken = async () => {
      try {
        const endpoint = accountType === 'user'
          ? '/user/user-dashboard'
          : '/vendor/vendor-dashboard'
        await api.get(endpoint)
      } catch (err) {
        if (err.response?.status === 401) {
       
          dispatch(logout())
        }
       
      }
    }

    validateToken()
  }, [])

  return null
}

export const OnboardingPage = () => {
  const { vendorInfo } = useSelector((state) => state.auth)
  const vendorName = vendorInfo?.stageName || vendorInfo?.firstName || ""
  return (
    <>
      <Vendordashboard />
      <VendorOnboarding
        isOpen={true}
        vendorName={vendorName}
        onClose={() => (window.location.href = "/vendordashboard")}
      />
    </>
  )
}