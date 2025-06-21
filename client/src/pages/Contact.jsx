import React, { useState } from "react";
import { send } from "@emailjs/browser";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [id]: undefined,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSending(true);
    setStatusMessage("Sending...");

    send(serviceId, templateId, formData, publicKey).then(
      () => {
        setIsSending(false);
        setStatusMessage("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      },
      (error) => {
        setIsSending(false);
        setStatusMessage(`Error: ${error.text || "Failed to send message"}`);
        console.error(error);
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 2xl:px-20 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">Contact Us</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question, feedback,
            or need assistance, feel free to reach out.
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                aria-required="true"
                aria-invalid={formErrors.name ? "true" : "false"}
                className={`w-full p-3 rounded border ${
                  formErrors.name
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-600"
                } focus:outline-none focus:ring-2`}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                aria-required="true"
                aria-invalid={formErrors.email ? "true" : "false"}
                className={`w-full p-3 rounded border ${
                  formErrors.email
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-600"
                } focus:outline-none focus:ring-2`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
                required
                aria-required="true"
                aria-invalid={formErrors.message ? "true" : "false"}
                rows="5"
                className={`w-full p-3 rounded border ${
                  formErrors.message
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-600"
                } focus:outline-none focus:ring-2`}
              ></textarea>
              {formErrors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 w-full disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>

            {statusMessage && (
              <div
                className={`mt-4 text-center ${
                  statusMessage.includes("successfully")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;