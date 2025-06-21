import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import Loading from "../components/Loading";
const Application = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  const updateResume = async () => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message || "Failed to update resume.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
    } finally {
      setIsEdit(false);
      setResume(null);
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit || userData?.resume === "" ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 cursor-pointer">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="icon" />
              </label>
              <button
                onClick={updateResume}
                disabled={isUploading}
                className="w-[100px] bg-green-100 border border-green-400 px-4 py-2 rounded-lg flex items-center justify-center transition-all duration-200"
              >
                {isUploading ? <Loading /> : "Save"}
              </button>
            </>
          ) : (
            <div className="flex gap-2 ">
              <a
                target="_blank"
                rel="noreferrer"
                className="bg-blue-100 text-blue-600 px-6 py-2 rounded-lg"
                href={userData?.resume}
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-500 rounded-lg px-8 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        {userApplications ? (
          <div className="overflow-x-auto rounded-lg">

          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="border-t border-gray-300">
                <th className="py-3 px-3  text-left ">Company</th>
                <th className="py-3 px-3  text-left ">Job Title</th>
                <th className="py-3 px-3  text-left  ">Location</th>
                <th className="py-3 px-3 text-left ">Date</th>
                <th className="py-3 px-3  text-left ">Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications.length > 0 ? (
                userApplications.map((job, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 max-sm:py-2 max-sm:px-2 border-b">
                      <div className="flex items-center gap-3 max-sm:gap-2 max-sm:flex-col max-sm:items-start">
                        <img
                          className="w-8 h-8 max-sm:w-5 max-sm:h-5"
                          src={job.companyId.image}
                          alt="logo"
                        />
                        <span className="text-sm max-sm:text-xs truncate">
                          {job.company}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">{job.jobId.title}</td>
                    <td className="py-2 px-4 max-sm:py-1 max-sm:px-2 border-b text-sm max-sm:text-xs">
                      {job.jobId.location}
                    </td>
                    <td className="py-2 px-4 max-sm:py-1 max-sm:px-2 border-b text-sm max-sm:text-xs">
                      {moment(job.date).format("ll")}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`${
                          job.status === "Accepted"
                            ? "bg-green-300"
                            : job.status === "Rejected"
                            ? "bg-red-300"
                            : "bg-blue-300"
                        } px-4 py-2 rounded text-center w-full text-sm max-sm:text-xs max-sm:px-2 max-sm:py-1`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
            

          </table>
          </div>
        ) : (
          <div className="flex justify-center my-10">
            <Loading />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default Application;
