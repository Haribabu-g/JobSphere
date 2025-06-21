import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const { backendUrl, companyToken, userData } = useContext(AppContext);
  const [applicants, setApplicants] = useState([]);

  //function to fetch company data
  const fetchCompanyJobApplications = async () => {
    // console.log(companyToken);
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applications`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
      // console.log(data.applications);
    } catch (error) {
      toast.error(error.message);
    }
  };
  //function to update the job application status



  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(statusbar.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);
  return applicants ? (
    
    applicants.length === 0 ? (
      <div className="flex items-center justify-center h-[75vh]">
      <p className="text-xl sm:text-2xl">
        No applications available!
      </p>
    </div>
    ) : (
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl bg-white border border-gray-50 rounded-full sm:text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">User Name</th>
                <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
                <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
                <th className="py-2 px-4 text-left">Resume</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="py-2 px-4 border-b text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b ">
                      <div className="flex items-center gap-2">
                      <img
                        className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                        src={applicant.userId.image}
                        alt="image"
                      />
                      <span className="text-sm">{applicant.userId.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b max-sm:hidden">
                      {applicant.jobId.title}
                    </td>
                    <td className="py-2 px-4 border-b max-sm:hidden">
                      {applicant.jobId.location}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <a
                        className="bg-blue-50 text-blue-400 px-3 py-1 max-sm:px-2 max-sm:py-0.5 rounded inline-flex gap-2 items-center text-sm max-sm:text-xs cursor-pointer"

                        href={applicant.userId.resume}
                      
                        rel="noopener noreferrer"

                        target="_blank"
                        
                      >
                        
                        {"Resume"}
                        <img className="cursor-pointer" src={assets.resume_download_icon} alt="img" />
                      </a>
                    </td>
                    <td className="py-2 px-4 border-b relative">
                      {applicant.status === "Pending" ? (
                        <div className="relative inline-block text-left group">
                          <button className="text-gray-500 action-button">
                            ...
                          </button>
                          <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block ">
                            <button
                              onClick={() =>
                                updateStatus(applicant._id, "Accepted")
                              }
                              className="block border w-full text-left px-4 py-2 text-green-500 hover:bg-green-100 cursor-pointer"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(applicant._id, "Rejected")
                              }
                              className="block border w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ) : 
                        <div>{applicant.status}</div>
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <div className="flex items-center justify-center h-[75vh]">
      <p className="text-xl sm:text-2xl">
        <Loading/>
      </p>
    </div>
  );
};

export default ViewApplications;