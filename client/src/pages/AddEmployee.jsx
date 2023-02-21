import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BiErrorCircle } from "react-icons/bi";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageData = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_API_KEY}`,
      formData
    );

    if (imageData.data.success) {
      const res = await axios.post(
        `${process.env.REACT_APP_END_POINT}/employee`,
        {
          name: data.name,
          image: imageData.data.data.url,
          role: data.role,
          salary: data.salary,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Employee added successul");
        reset();
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold uppercase mb-3">Add employee</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <input
            className={`w-full pl-3 py-1.5 rounded-sm bg-gray-700 border border-gray-700 focus:outline-none focus:border-[#45C6B1]  ${
              errors?.name && "border-rose-500 focus:border-rose-500"
            }`}
            type="text"
            placeholder="Name"
            {...register("name", { required: "This filed is required" })}
          />
          {errors?.name && (
            <div className="flex items-center text-rose-500 mt-1.5">
              <BiErrorCircle />
              <p className="text-xs tracking-wider ml-1">
                {errors.name.message}
              </p>
            </div>
          )}
        </div>
        <div className="mb-5">
          <input
            className={`w-full pl-3 py-1.5 rounded-sm bg-gray-700 border border-gray-700 focus:outline-none focus:border-[#45C6B1]  ${
              errors?.image && "border-rose-500 focus:border-rose-500"
            }`}
            type="file"
            {...register("image", { required: "image is required" })}
          />
          {errors?.image && (
            <div className="flex items-center text-rose-500 mt-1.5">
              <BiErrorCircle />
              <p className="text-xs tracking-wider ml-1">
                {errors.salary.message}
              </p>
            </div>
          )}
        </div>
        <select
          defaultValue="Select Division"
          className="w-full pl-3 py-2.5 mb-5 rounded-sm bg-gray-700 border border-gray-700 focus:outline-none focus:border-[#45C6B1]"
          {...register("role", { required: "This field is required" })}
        >
          <option disabled>Select Role</option>
          <option value="Front End Developer">Front End Developer</option>
          <option value="Back End Developer">Back End Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="MERN Stack Develoer">MERN Stack Develoer</option>
        </select>
        <div className="mb-5">
          <input
            className={`w-full pl-3 py-1.5 rounded-sm bg-gray-700 border border-gray-700 focus:outline-none focus:border-[#45C6B1]  ${
              errors?.salary && "border-rose-500 focus:border-rose-500"
            }`}
            type="Number"
            placeholder="Salary"
            {...register("salary", { required: "This filed is required" })}
          />
          {errors?.salary && (
            <div className="flex items-center text-rose-500 mt-1.5">
              <BiErrorCircle />
              <p className="text-xs tracking-wider ml-1">
                {errors.salary.message}
              </p>
            </div>
          )}
        </div>
        <button type="submit" className="px-14 py-2 bg-[#45C6B1] rounded-sm">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
