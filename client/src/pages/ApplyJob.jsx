import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import kconvert from "k-convert";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import Loading from "../components/Loading";

import {
  BriefcaseIcon,
  UserIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  MapPinIcon ,
} from "@heroicons/react/24/outline";

const ApplyJob = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const { user } = useUser();
  const [jobData, setJobData] = useState();
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const applyHandler = async () => {
    try {
      if (!userData) {
        toast.error("Login to apply for the job.");
        return;
      }

      if (!userData.resume) {
        toast.error("Upload your Resume to apply!");
        navigate("/applications");
        return;
      }

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        { jobId: jobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const checkAlreadyApplied = async () => {
    const hasApplied = userApplications.some(
      (item) => item.jobId._id === jobData._id
    );
    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJobs();
  }, [id]);

  useEffect(() => {
    if (userApplications.length > 0 && jobData) {
      checkAlreadyApplied();
    }
  }, [jobData, userApplications, id]);

  if (!jobData) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex-grow">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  className="h-20 w-20 rounded-lg object-contain mr-6 border-2 border-white shadow-md"
                  src={jobData.companyId.image}
                  alt={`${jobData.companyId.name} logo`}
                />
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                    {jobData.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
                    {[
                      {
                        icon: (
                          <BriefcaseIcon className="h-5 w-5 mr-1 text-blue-500" />
                        ),
                        text: jobData.companyId.name,
                      },
                      {
                        icon: (
                          <MapPinIcon className="h-5 w-5 mr-1 text-blue-500" />
                        ),
                        text: jobData.location,
                      },
                      {
                        icon: (
                          <UserIcon className="h-5 w-5 mr-1 text-blue-500" />
                        ),
                        text: jobData.label,
                      },
                      {
                        icon: (
                          <CurrencyDollarIcon className="h-5 w-5 mr-1 text-blue-500" />
                        ),
                        text: `CTC: ${kconvert.convertTo(jobData.salary)}`,
                      },
                    ].map((detail, index) => (
                      <div key={index} className="flex items-center">
                        {detail.icon}
                        <span className="text-sm">{detail.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <button
                  disabled={isAlreadyApplied}
                  onClick={applyHandler}
                  className={`
                    ${
                      isAlreadyApplied
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 transform hover:scale-105"
                    } 
                    px-6 py-3 text-white rounded-full transition-all duration-300 flex items-center gap-2
                  `}
                >
                  {isAlreadyApplied ? (
                    <>
                      <CheckCircleIcon className="h-5 w-5" />
                      Already Applied
                    </>
                  ) : (
                    <>
                      <DocumentTextIcon className="h-5 w-5" />
                      Apply Now
                    </>
                  )}
                </button>
                <p className="mt-2 text-sm text-gray-500">
                  Posted {moment(jobData.date).fromNow()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 p-6 md:p-10">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Job Description
              </h2>
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              />
              <button
                disabled={isAlreadyApplied}
                onClick={applyHandler}
                className={`
                  ${
                    isAlreadyApplied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 transform hover:scale-105"
                  } 
                  mt-6 px-6 py-3 text-white rounded-full transition-all duration-300 flex items-center gap-2
                `}
              >
                {isAlreadyApplied ? (
                  <>
                    <CheckCircleIcon className="h-5 w-5" />
                    Already Applied
                  </>
                ) : (
                  <>
                    <DocumentTextIcon className="h-5 w-5" />
                    Apply Now
                  </>
                )}
              </button>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                More Jobs from {jobData.companyId.name}
              </h3>
              {jobs
                .filter(
                  (job) =>
                    job._id !== jobData._id &&
                    job.companyId._id === jobData.companyId._id
                )
                .filter((job) => {
                  const appliedJobsId = new Set(
                    userApplications.map(
                      (application) =>
                        application.jobId && application.jobId._id
                    )
                  );
                  return !appliedJobsId.has(job._id);
                })
                .slice(0, 4)
                .map((job, index) => (
                  <div className="mt-4" key={index}>
                    <JobCard job={job} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplyJob;