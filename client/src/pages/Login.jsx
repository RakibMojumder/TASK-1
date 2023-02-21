import React, { useContext, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AUTH_CONTEXT } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { setUser } = useContext(AUTH_CONTEXT);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_END_POINT}/login`,
      data
    );
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      toast.success("login successful");
      setUser(res.data.userInfo);
      navigate("/dashboard");
    } else {
      setError(res.data.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="p-4 md:p-8"
    >
      <h1 className="text-2xl font-semibold text-center mb-5 uppercase">
        Login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <input
            className={`w-full pl-3 py-1.5 rounded-sm bg-gray-700 border border-gray-700 focus:outline-none focus:border-[#45C6B1] ${
              errors?.email && "border border-rose-500 focus:border-rose-500"
            }`}
            type="email"
            placeholder="Email"
            {...register("email", { required: "This filed is required" })}
          />
          {errors?.email && (
            <div className="flex items-center text-rose-500 mt-1.5">
              <BiErrorCircle />
              <p className="text-xs tracking-wider ml-1">
                {errors.email.message}
              </p>
            </div>
          )}
        </div>
        <div className="mb-5">
          <div className="relative">
            <input
              className={`w-full pl-3 py-1.5 rounded-sm bg-gray-700 border border-gray-700 focus:outline-none focus:border-[#45C6B1] ${
                errors?.password && "border-rose-500 focus:border-rose-500"
              }`}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              autoComplete="off"
              {...register("password", {
                required: "This filed is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 character",
                },
                maxLength: {
                  value: 12,
                  message: "Password cannot exceed more than 12 characters",
                },
              })}
            />
            {showPass ? (
              <FaRegEyeSlash
                onClick={() => setShowPass(!showPass)}
                className="text-slate-200 absolute right-1.5 top-1.5 h-7 w-8 p-1.5 rounded-md transition-all duration-500 hover:bg-gray-800"
              />
            ) : (
              <FaRegEye
                onClick={() => setShowPass(!showPass)}
                className="text-slate-200 absolute right-1.5 top-1.5 h-7 w-8 p-1.5 rounded-md transition-all duration-500 hover:bg-gray-800"
              />
            )}
          </div>
          {errors?.password && (
            <div className="flex items-center text-rose-500 mt-1.5">
              <BiErrorCircle />
              <p className="text-xs tracking-wider ml-1">
                {errors.password.message}
              </p>
            </div>
          )}
          <div className="mt-1.5 flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="accent-[#45C6B1] h-5 cursor-pointer"
              />
              <label
                className="text-sm ml-1 tracking-wide cursor-pointer"
                htmlFor="remember"
              >
                Remember me
              </label>
            </div>
            <p className="text-xs tracking-wider hover:underline cursor-pointer">
              Forget password?
            </p>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-5">{error}</p>}
        <button
          type="submit"
          className="w-full py-1.5 bg-[#45C6B1] transition-all hover:bg-[#07b396] text-white rounded-sm font-semibold uppercase"
        >
          login
        </button>
      </form>
    </motion.div>
  );
};

export default Login;
