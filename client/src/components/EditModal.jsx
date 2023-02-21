import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BiErrorCircle } from "react-icons/bi";
import { toast } from "react-hot-toast";

const EditModal = ({
  isOpen,
  closeModal,
  selectedEmployee,
  setRefresh,
  refresh,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await axios.put(
      `${process.env.REACT_APP_END_POINT}/employee/${selectedEmployee._id}`,
      data,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      toast.success(res.data.message);
      setRefresh(!refresh);
      closeModal();
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl mb-4 font-medium leading-6 text-gray-900"
                >
                  Edit Employee Info
                </Dialog.Title>
                <div className="text-white">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                      <input
                        className={`w-full pl-3 py-1.5 rounded-sm bg-gray-700 border border-gray-700 focus:outline-none focus:border-[#45C6B1]  ${
                          errors?.name &&
                          "border-rose-500 focus:border-rose-500"
                        }`}
                        type="text"
                        defaultValue={selectedEmployee.name}
                        placeholder="Name"
                        {...register("name", {
                          required: "This filed is required",
                        })}
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
                    <select
                      defaultValue={selectedEmployee.role}
                      className="w-full pl-3 py-2.5 mb-5 rounded-sm bg-gray-700 border border-gray-700 focus:outline-none focus:border-[#45C6B1]"
                      {...register("role", {
                        required: "This field is required",
                      })}
                    >
                      <option disabled>Select Role</option>
                      <option value="Front End Developer">
                        Front End Developer
                      </option>
                      <option value="Back End Developer">
                        Back End Developer
                      </option>
                      <option value="Full Stack Developer">
                        Full Stack Developer
                      </option>
                      <option value="MERN Stack Develoer">
                        MERN Stack Develoer
                      </option>
                    </select>
                    <div className="mb-5">
                      <input
                        className={`w-full pl-3 py-1.5 rounded-sm bg-gray-700 border border-gray-700 focus:outline-none focus:border-[#45C6B1]  ${
                          errors?.salary &&
                          "border-rose-500 focus:border-rose-500"
                        }`}
                        type="Number"
                        defaultValue={selectedEmployee.salary}
                        placeholder="Salary"
                        {...register("salary", {
                          required: "This filed is required",
                        })}
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
                    <button
                      type="submit"
                      className="px-14 py-2 bg-[#45C6B1] rounded-sm"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditModal;
