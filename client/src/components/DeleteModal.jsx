import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

const DeleteModal = ({
  setShowDeleteModal,
  selectedEmployee,
  setRefresh,
  refresh,
}) => {
  const handleDeleteEmployee = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_END_POINT}/employee/${selectedEmployee._id}`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      setShowDeleteModal(false);
      setRefresh(!refresh);
    }
  };

  return (
    <div className="bg-white px-9 py-3 rounded-md flex justify-center items-center text-slate-800 absolute h-36 w-64 md:w-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div>
        <h1 className="text-xl">Are you sure want to delete this</h1>
        <div className="text-white space-x-7 mt-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-8 py-0.5 rounded-sm bg-green-500"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteEmployee}
            className="px-8 py-0.5 rounded-sm bg-red-500"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
