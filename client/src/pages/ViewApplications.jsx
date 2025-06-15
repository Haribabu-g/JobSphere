import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
  return (
    <div className="container mx-auto p-4">
      <div>
        <table className="   min-w-full  border-collapse bg-white border rounded-lg max-sm:text-sm">
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
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="text-gray-700">
  <td className="py-3 px-4 border-b text-center">{index + 1}</td>
  <td className="py-3 px-4 border-b text-center">
    <div className="flex items-center gap-4">
      <img className="w-10 h-10 rounded-full max-sm:hidden" src={applicant.imgSrc} alt="" />
      <span className="font-bold text-lg">{applicant.name}</span>
    </div>
  </td>
  <td className="py-3 px-4 border-b text-center max-sm:hidden">{applicant.jobTitle}</td>
  <td className="py-3 px-4 border-b text-center max-sm:hidden">{applicant.location}</td>
  <td className="py-3 px-4 border-b text-center">
    <a href={applicant.resumeLink} target="_blank" className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center">
      Resume <img src={assets.resume_download_icon} alt="Download Resume" />
    </a>
  </td>
  <td className="py-2 px-4 border-b relative text-center">
    <div className="relative inline-block text-left group">
      <button className="text-gray-500 action-button">...</button>
      <div className=" z-10 hidden absolute left-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block ">
        <button className=" border block w-full text-left px-4 py-2 text-blue-500 hover:bg-blue-100 rounded">Accept</button>
        <button className="border block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 rounded">Reject</button>
      </div>
    </div>
  </td>
</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
