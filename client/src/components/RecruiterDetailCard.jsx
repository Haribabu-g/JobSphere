import React from "react";

const RecruiterDetailCard = ({ companyName, companyImage, companyEmail }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white flex flex-col items-center text-center">
      <img
        className="h-24 w-24 rounded-full object-cover mb-4"
        src={companyImage}
        alt={`${companyName} Logo`}
      />
      <h3 className="text-lg font-semibold text-gray-800">{companyName}</h3>
      <p className="text-sm text-gray-600 mt-2">{companyEmail}</p>
    </div>
  );
};

export default RecruiterDetailCard;