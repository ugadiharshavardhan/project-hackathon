import "./App.css";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import UserPage from "./pages/UserPage/UserPage";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminPage/AdminDashboard";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import { CounterProvider } from "./contextApi/TotalCountsContext";
import { FormProvider } from "./contextApi/FormContext";
import NotFound from "./pages/ErrorPage/notFound";
import DisplayAllEvents from "./pages/UserTotalEvents/DisplayAllEvents";
import ProtectedRoute from "./components/ProtectedRoute";
import EachEventDetails from "./components/EachEventDetails";
import AppliedEvent from "./pages/AppliedEvents/AppliedEvent";
import Eventsbyuser from "./pages/ApplyedEventsbyuser/Eventsbyuser";
import UserAccount from "./pages/Account/UserAccount";


function App() {
  return (
    
    <CounterProvider>
      <FormProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/user/allevents" element={<ProtectedRoute><DisplayAllEvents /></ProtectedRoute>} />
            <Route path="/user/allevents/:eventid" element={<ProtectedRoute><EachEventDetails /></ProtectedRoute>} />
            <Route path="/events/apply/:eventid" element={<ProtectedRoute><AppliedEvent /></ProtectedRoute>} />
            <Route path="/user/appliedevents" element={<ProtectedRoute><Eventsbyuser /></ProtectedRoute>} />
            <Route path="/user/account" element={<ProtectedRoute><UserAccount /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </CounterProvider>
  );
}

export default App;
