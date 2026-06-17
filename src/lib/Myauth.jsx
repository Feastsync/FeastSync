// src/Redux/hooks/useAuth.js
import { useSelector } from 'react-redux'

const useAuth = () => {
  const { isLoggedIn, userInfo, vendorInfo, accountType, token } = useSelector((state) => state.auth)

  const isVendor = accountType === 'vendor'
  const isUser = accountType === 'user'
  const activeUser = isVendor ? vendorInfo : userInfo

  return { isLoggedIn, isVendor, isUser, activeUser, accountType, token }
}

export default useAuth