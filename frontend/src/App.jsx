import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Admission from "./Pages/Admission";
import Curriculum from "./Pages/Curriculum";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import AdminRoute from "./Component/AdminRoutes";
import PrivateRoute from "./Component/PrivateRoutes";
import AdminDashboard from "./Admin Pages/AdminDashboard";
import ParentsDashboard from './Parents Pages/ParentsDashboard';
import Calendar from './Pages/Calendar';
import Gallery from './Pages/Gallery';
import ChildInfo from './Parents Pages/ChildInfo';
// import Performance from "./Parents Pages/Performance";
import ParentProtected from './Component/ParentProtected';
import StudentInfo from "./Admin Pages/StudentInfo";
import Signup from "./Admin Pages/Signup";
import NewStudent from "./Admin Pages/NewStudent";
import Edit from "./Admin Pages/Edit";
import View from "./Admin Pages/View";

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "auto" instead of "smooth" for instant scrolling
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
    
    // Optional: Reset scroll restoration to manual
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admission" element={<Admission/>} />
        <Route path="/curriculum" element={<Curriculum/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<PrivateRoute><ResetPassword /></PrivateRoute>} />
        <Route path="/adminDashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/studentInfo" element={<AdminRoute><StudentInfo /></AdminRoute>} />
        <Route path="/signup" element={<AdminRoute><Signup/></AdminRoute>} />
        <Route path="/newStudent" element={<AdminRoute><NewStudent/></AdminRoute>} />
        <Route path="/view/:id" element={<AdminRoute><View/></AdminRoute>} />
        <Route path="/edit/:id" element={<AdminRoute><Edit/></AdminRoute>} />
        <Route element={<ParentProtected allowedRoles={['user']} />}>
          <Route path="/parentsDashboard" element={<ParentsDashboard />} />
          <Route path="/childInfo" element={<ChildInfo />} />    
          {/* <Route path="/performance" element={<Performance />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;