import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import WelcomeModal from "./Auth/Vendor/onBoardingFiles/WelcomeModal.jsx";
import Error505 from "./Auth/Vendor/Error505.jsx";
const App = () => {
  return (
    <BrowserRouter>
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
        <Route path="/vendor/onboarding" element={<VendorOnboarding />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/vendor/signup" element={<VendorSignUp />} />
        <Route path="/vendor/kyc" element={<VendorKYC />} />
        <Route path="/vendordashboard" element={<Vendordashboard />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="getStarted" element={<GetStarted />} />

        <Route path="/wallet/transactions" element={<VendorWallet />} />
        <Route path="/welcomeModal" element={<WelcomeModal />} />
        <Route path="/transaction/histories" element={<WalletLedger />} />
        {/* <Route path="/transaction/histories" element={<WalletLedger />} /> */}

        <Route
          path="/notifications/:category?"
          element={<AllNotifications />}
        />
        <Route path="/Error" element={<Error505 />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
