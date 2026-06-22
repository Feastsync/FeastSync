import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./lib/Private.jsx";

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
import WalletLedger from "./Page/Wallet/WalletLedger.jsx";
import VendorWallet from "./Page/Wallet/VendorWallet.jsx";
import AllNotifications from "./Page/NotitficationsPages/AllNotifications.jsx";
import Chat from "./Page/chatPage/Chat.jsx";
import MediaStep from "./Auth/Vendor/onBoardingFiles/MediaStep.jsx";
import Error505 from "./Auth/Vendor/Error505.jsx";
import Error404 from "./Auth/Vendor/Error404.jsx";
import RatingReview from "./Page/RatingReview.jsx";
import Settings from "./Page/SettingsPage/Settings.jsx";
import Epknorating from "./Auth/Vendor/Epknorating.jsx";
import Epkrating from "./Auth/Vendor/Epkrating.jsx";
import BookingModal from "./Page/Booking/Booking.jsx";
import Vendormediagallery from "./Auth/Vendor/Vendormediagallery.jsx";
import PricingStep from "./Auth/Vendor/onBoardingFiles/PricingStep.jsx";
import BookingRequest from "./Page/Booking/BookingRequest.jsx";
import BookingNotifications from "./Page/NotitficationsPages/BookingNotifications.jsx";
import PaymentNotifications from "./Page/NotitficationsPages/PaymentNotifications.jsx";
import ReviewsNotification from "./Page/NotitficationsPages/ReviewsNotifications.jsx";
import NotificationsWrapper from "./Page/NotitficationsPages/NotificationsWrapper.jsx";
import { ScrollToTop, TokenValidator, OnboardingPage } from "./Components/Highfunction.jsx";
import Inbox from "./Page/Inbox/Inbox.jsx";
import VendorChat from "./Page/chatPage/VendorChats.jsx";


const PublicLayout = () => {
  const { vendorInfo, token } = useSelector((s) => s.auth);
  if (token && vendorInfo) return <Navigate to="/vendordashboard" replace />;
  return <Layout />;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TokenValidator />
      <Routes>

        <Route element={<PublicLayout />}>
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
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Route> 
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/vendor/signup" element={<VendorSignUp />} />
         <Route path="/vendor/:slug" element={<Vendordashboard />} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/getStarted" element={<GetStarted />} />
        <Route path="/505" element={<Error505 />} />


        <Route element={<PrivateRoute allowedRoles={["user", "vendor"]} />}>
          {/* <Route path="/vendor/:slug" element={<Vendordashboard />} /> */}
          <Route path="/epknorating/:vendorId" element={<Epknorating />} />
          <Route path="/epkrating/:id" element={<Epkrating />} />
          <Route path="/chats" element={<Chat />} />
          <Route path="/bookings" element={<BookingModal />} />
          <Route path="/bookingrequest" element={<BookingRequest />} />
          <Route path="/request/:requestId" element={<BookingRequest />} />
          <Route path="/chats/:bookingId" element={<Chat />} />
            <Route path="/notifications" element={<NotificationsWrapper />}>
            <Route index element={<Navigate to="all" replace />} />
            <Route path="all" element={<AllNotifications />} />
            <Route path="booking" element={<BookingNotifications />} />
            <Route path="payment" element={<PaymentNotifications />} />
            <Route path="reviews" element={<ReviewsNotification />} />
          </Route>
        </Route>


        <Route element={<PrivateRoute allowedRoles={["user"]} />}>
          <Route path="/userdashboard" element={<Userdashboard />} />
          <Route path="/ratingreview/:bookingId" element={<RatingReview />} />
          <Route path="/transaction/histories" element={<WalletLedger />} />
          <Route path="/inbox" element={<Inbox />} />
        </Route>


        <Route element={<PrivateRoute allowedRoles={["vendor"]} />}>
          <Route path="/vendordashboard" element={<Vendordashboard />} />
          <Route path="/vendordashboardrating" element={<Vendordashboardrating />} />
          <Route path="/vendor/onboarding" element={<OnboardingPage />} />
          <Route path="/vendor/kyc" element={<VendorKYC />} />
          <Route path="/mediastep" element={<MediaStep />} />
             <Route path="/Settings" element={<Settings />} />
          <Route path="/pricingstep" element={<PricingStep />} />
          <Route path="/vendormediagallery" element={<Vendormediagallery />} />
          <Route path="/VendorChat/:Id" element={<VendorChat />} />
          <Route path="/wallet/transactions" element={<VendorWallet />} />
        </Route>

        {/* ── CATCH-ALL ─────────────────────────────────────────────────────── */}
        <Route path="*" element={<Error404 />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;