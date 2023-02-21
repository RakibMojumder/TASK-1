import React, { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_END_POINT}/register`,
      data
    );
    if (res.data.success) {
      toast.success("register successful");
      navigate("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="p-4 md:p-8"
    >
      <h1 className="text-2xl font-semibold text-center mb-5 uppercase">
        Register
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <input
            className={`w-full pl-3 py-1.5 rounded-sm bg-gray-700 border border-gray-700 focus:outline-none focus:border-[#45C6B1]  ${
              errors?.username && "border-rose-500 focus:border-rose-500"
            }`}
            type="text"
            placeholder="Your Name"
            {...register("username", { required: "This filed is required" })}
          />
          {errors?.username && (
            <div className="flex items-center text-rose-500 mt-1.5">
              <BiErrorCircle />
              <p className="text-xs tracking-wider ml-1">
                {errors.username.message}
              </p>
            </div>
          )}
        </div>
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
              name="password"
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
                className="text-slate-700 absolute right-1.5 top-1.5 h-7 w-8 p-1.5 rounded-md transition-all duration-500 hover:bg-gray-200"
              />
            ) : (
              <FaRegEye
                onClick={() => setShowPass(!showPass)}
                className="text-slate-700 absolute right-1.5 top-1.5 h-7 w-8 p-1.5 rounded-md transition-all duration-500 hover:bg-gray-200"
              />
            )}
          </div>
          {errors?.password && (
            <div className="flex items-center text-rose-500 dark:text-red-400 mt-1.5">
              <BiErrorCircle />
              <p className="text-xs tracking-wider ml-1">
                {errors.password.message}
              </p>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-1.5 bg-[#45C6B1] transition-all hover:bg-[#07b396] text-white rounded-sm font-semibold uppercase"
        >
          Register
        </button>
      </form>
    </motion.div>
  );
};

export default Register;
