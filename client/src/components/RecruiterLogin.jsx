import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function RecruiterLogin() {
  const { setShowRecruiterLogin, backendUrl, setCompanyData, setCompanyToken } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);
      return;
    }

    try {
      setLoading(true); // Disable the button during processing
      const url =
        state === "Login"
          ? `${backendUrl}/api/company/login`
          : `${backendUrl}/api/company/register`;

      const payload =
        state === "Login"
          ? { email: formState.email, password: formState.password }
          : new FormData();

      if (state === "Sign Up") {
        payload.append("name", formState.name);
        payload.append("password", formState.password);
        payload.append("email", formState.email);
        payload.append("image", formState.image);
      }

      const { data } = await axios.post(url, payload, {
        headers:
          state === "Sign Up" ? { "Content-Type": "multipart/form-data" } : {},
      });

      if (data.success) {
        
        setCompanyData(data.company);
        setCompanyToken(data.token);
        localStorage.setItem("companyToken", data.token);
        setShowRecruiterLogin(false);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Re-enable the button after processing
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const renderInputField = (type, name, placeholder, icon) => (
    <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
      <img src={icon} alt="icon" />
      <input
        className="outline-none text-sm"
        type={type}
        name={name}
        value={formState[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        required
      />
    </div>
  );

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-gray-800"
      >
        <h1 className="text-center text-2xl text-neutral-800 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm">
          {state === "Login"
            ? "Welcome Back! Please login to continue!"
            : "Create your recruiter account to get started!"}
        </p>

        {state === "Sign Up" && isTextDataSubmitted ? (
          <div className="flex items-center gap-4 my-10">
            <label htmlFor="image">
              <img
                className="cursor-pointer w-16 h-16 rounded-full"
                src={
                  formState.image
                    ? URL.createObjectURL(formState.image)
                    : assets.upload_area
                }
                alt="logo"
              />
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleInputChange}
                hidden
              />
            </label>
            <p>
              Upload Company <br /> Logo
            </p>
          </div>
        ) : (
          <>
            {state === "Sign Up" &&
              renderInputField(
                "text",
                "name",
                "Company Name",
                assets.person_icon
              )}
            {renderInputField("email", "email", "Email ID", assets.email_icon)}
            {renderInputField(
              "password",
              "password",
              "Password",
              assets.lock_icon
            )}
          </>
        )}

        {state === "Login" && (
          <p className="text-sm text-center text-blue-500 mt-4 cursor-pointer">
            Forgot password?
          </p>
        )}

        <button
          type="submit"
          className={`bg-blue-600 w-full text-white py-2 rounded-full mt-4 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : state === "Login"
            ? "Login"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        <p className="mt-5 text-center">
          {state === "Login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="cursor-pointer text-blue-600"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="cursor-pointer text-blue-600"
                onClick={() => setState("Login")}
              >
                Sign In
              </span>
            </>
          )}
        </p>

        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt="Close"
        />
      </form>
    </div>
  );
}

export default RecruiterLogin;