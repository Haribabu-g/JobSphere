import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 2xl:px-20 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">About Us</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Welcome to{" "}
            <span className="text-blue-600 font-semibold">jobHunt</span>, your
            one-stop platform to discover and apply for exciting career
            opportunities. We aim to bridge the gap between talent and
            opportunity, empowering individuals and businesses alike.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center border border-gray-200 rounded-lg shadow-md overflow-hidden">
          {/* Mission Section */}
          <div className="flex-1 p-6 md:border-r border-gray-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At <span className="text-blue-600 font-semibold">jobHunt</span>,
              we are committed to transforming the hiring process. Our mission
              is to provide a seamless and transparent platform where job
              seekers can connect with top recruiters and find their dream
              roles.
            </p>
          </div>

          {/* Vision Section */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a future where every individual has equal access to
              career opportunities and every company finds the perfect candidate
              for their needs. With cutting-edge technology and user-focused
              solutions, we strive to redefine the recruitment experience.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Meet the Developer
          </h2>
          <div className="mt-6 max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg shadow">
            <div className="flex flex-col items-center">
              <img
                width={100}
                src={"/avatar.jpg"}
                alt="Developer Avatar"
                className="rounded-full mb-4 shadow-md"
              />
              <h3 className="text-xl font-medium text-gray-800">Nishant Dev</h3>
              <p className="text-gray-600 mt-2">
                A passionate software developer with expertise in React,
                Node.js, Tailwind CSS, and more. I thrive on creating intuitive
                and user-friendly web applications that make a difference.
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://github.com/n1shan1"
                  className="text-blue-600 hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/nishantdev"
                  className="text-blue-600 hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://nishant-dev-portfolio.vercel.app/"
                  className="text-blue-600 hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;