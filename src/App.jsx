import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PrivateRoute from "./lib/Private.jsx";

// // Pages
// import Home from "./Page/Home.jsx";
// import Howitworks from "./Page/Howitworks.jsx";
// import VendorsPage from "./Page/VendorsPage.jsx";
// import Layout from "./Page/Layout.jsx";
// import AllVendors from "./Components/VendorsComponents/All.jsx";
// import DJs from "./Components/VendorsComponents/DJs.jsx";
// import MCs from "./Components/VendorsComponents/MCs.jsx";
// import LiveBands from "./Components/VendorsComponents/LiveBands.jsx";
// import Photography from "./Components/VendorsComponents/Photographty.jsx";
// import Videography from "./Components/VendorsComponents/Videography.jsx";
// import OnBoarding from "./Auth/OnBoarding.jsx";
// import Login from "./Auth/Login.jsx";
// import OTP from "./Auth/OTP.jsx";
// import ForgotPassword from "./Auth/ForgetPassword.jsx";
// import ResetPassword from "./Auth/ResetPassword.jsx";
// import VendorSignUp from "./Auth/Vendor/VedorSignUp.jsx";
// import VendorKYC from "./Auth/Vendor/VendorKYC.jsx";
// import Vendordashboard from "./Auth/Vendor/Vendordashboard.jsx";
// import Vendordashboardrating from "./Auth/Vendor/Vendordashoardrating.jsx";
// import Contact from "./Page/Contact.jsx";
// import UserSignUp from "./Auth/User/UserSignUp.jsx";
// import Userdashboard from "./Auth/User/Userdashboard.jsx";
// import GetStarted from "./Page/GetStarted.jsx";
// import About from "./Page/About.jsx";
// import Services from "./Page/Services.jsx";
// import VendorOnboarding from "./Auth/Vendor/onBoardingFiles/VendorOnboarding.jsx";
// import WalletLedger from "./Page/Wallet/WalletLedger.jsx";
// import VendorWallet from "./Page/Wallet/VendorWallet.jsx";
// import AllNotifications from "./Page/NotitficationsPages/AllNotifications.jsx";
// import Chat from "./Page/chatPage/Chat.jsx";
// import Error505 from "./Auth/Vendor/Error505.jsx";
// import Error404 from "./Auth/Vendor/Error404.jsx";
// import BookingRequest from "./Page/BookingRequest.jsx";
// import RatingReview from "./Page/RatingReview.jsx";
// import VendorSetting from "./Auth/Vendor/VendorSetting.jsx";
// import Settings from "./Page/SettingsPage/Settings.jsx";
// import { ScrollToTop } from "./Components/Highfunction.jsx";
// import Epknorating from "./Auth/Vendor/Epknorating.jsx";
// import Epkrating from "./Auth/Vendor/Epkrating.jsx";
// import BookingModal from "./Page/Booking/Booking.jsx";
// import { useSelector } from "react-redux";
// const OnboardingPage = () => {
//   const { vendorInfo } = useSelector((state) => state.auth);
//   const vendorName = vendorInfo?.stageName || vendorInfo?.firstName || "";
//   return (
//     <>
//       <Vendordashboard />
//       <VendorOnboarding
//         isOpen={true}
//         vendorName={vendorName}
//         onClose={() => (window.location.href = "/vendordashboard")}
//       />
//     </>
//   );
// };

// const App = () => {
//   return (
//     <BrowserRouter>
//       <ScrollToTop />
//       <Routes>
//         <Route element={<Layout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/howitworks/*" element={<Howitworks />} />
//           <Route path="/vendors" element={<VendorsPage />}>
//             <Route index element={<AllVendors />} />
//             <Route path="djs" element={<DJs />} />
//             <Route path="mcs" element={<MCs />} />
//             <Route path="livebands" element={<LiveBands />} />
//             <Route path="photography" element={<Photography />} />
//             <Route path="videography" element={<Videography />} />
//           </Route>
//           <Route path="/contact" element={<Contact />} />
//           <Route path="about" element={<About />} />
//           <Route path="services" element={<Services />} />
//         </Route>

//         <Route path="/onboarding" element={<OnBoarding />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/verify-otp" element={<OTP />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/vendor/signup" element={<VendorSignUp />} />
//         <Route path="/user/signup" element={<UserSignUp />} />
//         <Route path="getStarted" element={<GetStarted />} />
//         <Route path="bookings" element={<BookingModal />} />
        
//         <Route
//           path="/vendor/onboarding"
//           element={
//             <PrivateRoute>
//               <OnboardingPage />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/epknorating/:vendorId" element={<Epknorating />} />
//         <Route path="/epkrating/:id" element={<Epkrating />} />
//         <Route path="/505" element={<Error505 />} />

//         <Route
//           path="/vendordashboard"
//           element={
//             <PrivateRoute>
//               <Vendordashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/vendordashboardrating"
//           element={
//             <PrivateRoute>
//               <Vendordashboardrating />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/userdashboard"
//           element={
//             <PrivateRoute>
//               <Userdashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/bookingrequest"
//           element={
//             <PrivateRoute>
//               <BookingRequest />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/ratingreview"
//           element={
//             <PrivateRoute>
//               <RatingReview />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/wallet/transactions"
//           element={
//             <PrivateRoute>
//               <VendorWallet />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/transaction/histories"
//           element={
//             <PrivateRoute>
//               <WalletLedger />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/notifications/:category?"
//           element={
//             <PrivateRoute>
//               <AllNotifications />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/chats"
//           element={
//             <PrivateRoute>
//               <Chat />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/Settings"
//           element={
//             <PrivateRoute>
//               <Settings />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/vendorsetting"
//           element={
//             <PrivateRoute>
//               <VendorSetting />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/vendor/kyc"
//           element={
//             <PrivateRoute>
//               <VendorKYC />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<Error404 />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./Page/Home.jsx";
import Howitworks from "./Page/Howitworks.jsx";
import VendorsPage from "./Page/VendorsPage.jsx";
import Layout from "./Page/Layout.jsx";
import AllVendors from "./Components/VendorsComponents/All.jsx";
import DJs from "./Components/VendorsComponents/DJs.jsx";
import MCs from "./Components/VendorsComponents/MCs.jsx";
import LiveBands from "./Components/VendorsComponents/LiveBands.jsx";
import Photography from "./Components/VendorsComponents/Photographty.jsx";
import Videography from "./Components/VendorsComponents/Videography.jsx";
import OnBoarding from "./Auth/OnBoarding.jsx";
import Login from "./Auth/Login.jsx";
import OTP from "./Auth/OTP.jsx";
import ForgotPassword from "./Auth/ForgetPassword.jsx";
import ResetPassword from "./Auth/ResetPassword.jsx";
import VendorSignUp from "./Auth/Vendor/VedorSignUp.jsx";
import VendorKYC from "./Auth/Vendor/VendorKYC.jsx";
import Vendordashboard from "./Auth/Vendor/Vendordashboard.jsx";
import Vendordashboardrating from "./Auth/Vendor/Vendordashoardrating.jsx";
import Contact from "./Page/Contact.jsx";
import UserSignUp from "./Auth/User/UserSignUp.jsx";
import Userdashboard from "./Auth/User/Userdashboard.jsx";
import GetStarted from "./Page/GetStarted.jsx";
import About from "./Page/About.jsx";
import Services from "./Page/Services.jsx";
import VendorOnboarding from "./Auth/Vendor/onBoardingFiles/VendorOnboarding.jsx";
import WalletLedger from "./Page/Wallet/WalletLedger.jsx";
import VendorWallet from "./Page/Wallet/VendorWallet.jsx";
import AllNotifications from "./Page/NotitficationsPages/AllNotifications.jsx";
import Chat from "./Page/chatPage/Chat.jsx";
import MediaStep from "./Auth/Vendor/onBoardingFiles/MediaStep.jsx";
import Error505 from "./Auth/Vendor/Error505.jsx";
import Error404 from "./Auth/Vendor/Error404.jsx";
import BookingRequest from "./Page/BookingRequest.jsx";
import RatingReview from "./Page/RatingReview.jsx";
import VendorSetting from "./Auth/Vendor/VendorSetting.jsx";
import Settings from "./Page/SettingsPage/Settings.jsx";
import { ScrollToTop } from "./Components/Highfunction.jsx";
import Epknorating from "./Auth/Vendor/Epknorating.jsx";
import Epkrating from "./Auth/Vendor/Epkrating.jsx";
import BookingModal from "./Page/Booking/Booking.jsx";
import Vendormediagallery from "./Auth/Vendor/Vendormediagallery.jsx";
import PricingStep from "./Auth/Vendor/onBoardingFiles/PricingStep.jsx";
import { useSelector } from "react-redux";

const OnboardingPage = () => {
  const { vendorInfo } = useSelector((state) => state.auth);
  const vendorName = vendorInfo?.stageName || vendorInfo?.firstName || "";
  return (
    <>
      <Vendordashboard />
      <VendorOnboarding
        isOpen={true}
        vendorName={vendorName}
        onClose={() => (window.location.href = "/vendordashboard")}
      />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/howitworks/*" element={<Howitworks />} />
          <Route path="/vendors" element={<VendorsPage />}>
            <Route index element={<AllVendors />} />
            <Route path="djs" element={<DJs />} />
            <Route path="mcs" element={<MCs />} />
            <Route path="livebands" element={<LiveBands />} />
            <Route path="photography" element={<Photography />} />
            <Route path="videography" element={<Videography />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
        </Route>

        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/vendor/signup" element={<VendorSignUp />} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="getStarted" element={<GetStarted />} />
        <Route path="bookings" element={<BookingModal />} />
        
        <Route path="/vendor/onboarding" element={<OnboardingPage />} />
        <Route path="/epknorating/:vendorId" element={<Epknorating />} />
        <Route path="/epkrating/:id" element={<Epkrating />} />
        <Route path="/505" element={<Error505 />} />
        <Route path="/vendordashboard" element={<Vendordashboard />} />
        <Route path="/vendor/:slug" element={<Vendordashboard />} />
        <Route path="/vendordashboardrating" element={<Vendordashboardrating />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/bookingrequest" element={<BookingRequest />} />
        <Route path="/ratingreview" element={<RatingReview />} />
        <Route path="/wallet/transactions" element={<VendorWallet />} />
        <Route path="/transaction/histories" element={<WalletLedger />} />
        <Route path="/notifications/:category?" element={<AllNotifications />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/mediastep" element={<MediaStep />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/vendorsetting" element={<VendorSetting />} />
        <Route path="vendormediagallery" element={<Vendormediagallery />} />
        <Route path="/vendor/kyc" element={<VendorKYC />} />
        <Route path="/pricingstep" element={<PricingStep />} />
        {/* <Route path="Calenderrr" element={<CalendarStep />} /> */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;