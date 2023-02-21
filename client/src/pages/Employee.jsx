import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";

const Employee = () => {
  const [employees, setEmployess] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getEmployees = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_END_POINT}/employee`,
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setEmployess(data.employees);
      }
    };
    getEmployees();
  }, [refresh]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setIsOpen(true);
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold uppercase mb-3">Our employee</h1>
      <div className="overflow-x-auto rounded-lg border border-slate-600">
        <table className="min-w-full divide-y-2 divide-slate-600 text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-bold">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-bold">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-bold">
                Role
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-bold">
                Salary
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-bold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600">
            {employees?.map((employee) => (
              <tr key={employee._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                  <img
                    src={employee.image}
                    className="h-10 rounded-full"
                    alt=""
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2">{employee.name}</td>
                <td className="whitespace-nowrap px-4 py-2">{employee.role}</td>
                <td className="whitespace-nowrap px-4 py-2">
                  ${employee.salary}
                </td>
                <td className="whitespace-nowrap px-4">
                  <div className="flex items-center text-2xl space-x-3">
                    <AiFillEdit
                      onClick={() => openModal(employee)}
                      className="text-[#45C6B1]"
                    />{" "}
                    <MdDelete
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-500"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          selectedEmployee={selectedEmployee}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      {isOpen && (
        <EditModal
          isOpen={isOpen}
          closeModal={closeModal}
          selectedEmployee={selectedEmployee}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default Employee;
