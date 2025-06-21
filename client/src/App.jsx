import React, { useContext, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import RecruiterLogin from "./components/RecruiterLogin";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Application from "./pages/Application";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import Recruiters from "./pages/Recruiters";
import Contact from "./pages/Contact";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";


const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <>
    
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="w-full mx-0 px-0">
        <Suspense
          fallback={<div className="text-center mt-10">Loading...</div>}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply-job/:id" element={<ApplyJob />} />
            <Route path="/applications" element={<Application />} />
            <Route path="/dashboard" element={<Dashboard />}>
              {companyToken ? (
                <>
                  <Route path="add-job" element={<AddJob />} />
                  <Route path="manage-job" element={<ManageJobs />} />
                  <Route
                    path="view-applications"
                    element={<ViewApplications />}
                  />
                </>
              ) : null}
            </Route>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/recruiters" element={<Recruiters />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>
      
    </>
  );
};

export default App;