import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

function Dashboard() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const profileRef = useRef();

  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);
  //function to logout the company
  const logout = async () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-job");
    }
  }, [companyData]);
  return (
    <div className="min-h-screen">
      {/* navbar for recruiter panel */}
      <div className="shadow py-4">
        <div className="px-4 flex justify-between items-center">
          <img
            width={160}
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
            alt="logo"
          />{" "}
          <p className="font-bold"> Recruiters Dashboard</p>
          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">
                {"Logged in as: "}
                <span className="text-blue-500 text-lg">
                  {companyData.name}
                </span>
              </p>
              <div ref={profileRef} className="relative">
                <img
                  className="w-10 border rounded-full mr-3"
                  src={companyData.image}
                  alt="icon"
                  onClick={() => setShowLogout((prev) => !prev)}
                />
                {showLogout && (
                  <div className="absolute  top-0 right-0 z-10 text-white rounded pt-12">
                    <ul className="bg-black rounded-md border text-sm">
                      <li
                        onClick={logout}
                        className="py-2 px-8 cursor-pointer pr-10  hover:bg-black-100"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-start">
        {/* left sidebar with option to add job manage job and add applications */}
        <div className="inline-block min-h-screen border-r-2">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-400"
                }`
              }
              to="/dashboard/add-job"
            >
              <img className="min-w-4" src={assets.add_icon} alt="icon" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-400"
                }`
              }
              to="/dashboard/manage-job"
            >
              <img className="min-w-4" src={assets.home_icon} alt="icon" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-400"
                }`
              }
              to="/dashboard/view-applications"
            >
              <img
                className="min-w-4"
                src={assets.person_tick_icon}
                alt="icon"
              />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div className="flex-1 h-full p-2 sm:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
