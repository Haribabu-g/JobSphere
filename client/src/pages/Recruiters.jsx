import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import RecruiterDetailCard from "../components/RecruiterDetailCard";

const Recruiters = () => {
  const { backendUrl } = useContext(AppContext);
  const [recruiterData, setRecruiterData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchRecruiterData = async () => {
    try {
      const { data: recData } = await axios.get(
        `${backendUrl}/api/company/recruiters`
      );
      if (recData.success) {
        setRecruiterData(recData.data.recruiters);
        setTotal(recData.data.total);
      } else {
        toast.error("Unable to fetch recruiters data from the backend!");
      }
    } catch (error) {
      toast.error("An error occurred while fetching recruiters data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiterData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="">
      <Navbar />
      <div className="h-screen container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome to <span className="text-blue-600 font-bold">jobHunt</span>!
          </h1>
          <p className="text-gray-600 mt-2">
            Here are our top recruiters on the platform!
          </p>
          <p className="text-gray-500 mt-1">Total Recruiters: {total}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recruiterData?.map((rec, index) => (
            <RecruiterDetailCard
              key={index}
              companyImage={rec.image}
              companyName={rec.name}
              companyEmail={rec.email}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recruiters;