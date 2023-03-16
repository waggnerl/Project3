import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import studentService from "../../services/student.service";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import backgroundImage from "../../assets/gym.jpg";

function ViewStudents() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const id = user._id;
  const [students, setStudents] = useState([]);
  const [userName, setUserName] = useState("");
  const [studentsTeacher, setStudentsTeacher] = useState([]);
  const [studentToAdd, setStudentToAdd] = useState("");
  const [reRender, setReRender] = useState(false);

  const handleStudentToAdd = (e) => setStudentToAdd(e.target.value);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const data = await studentService.addStudentToPersonal(id, studentToAdd);
      toast.success(data.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      const errorDescription = err.response.data.message;
      toast.error(errorDescription, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setReRender((prev) => !prev);
  };

  useEffect(() => {
    const getStudentsFromPersonal = async () => {
      const data = await studentService.getOnesFromPersonal(id);
      setStudentsTeacher(data.data);
    };
    const getStudents = async () => {
      const data = await studentService.getAll();
      setStudents(data.data);
      setStudentToAdd(data.data[0]._id);
    };
    const getProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/profile/${id}`
        );
        console.log(response.data);
        setUserName(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
    getStudentsFromPersonal();
    getStudents();
  }, [id, reRender]);
  if (user.role === "student") navigate(`/trains/${id}`);
  if (students && studentsTeacher && user.role === "personal")
    return (
      <div
        className=" h-screen w-full  bg-cover bg-center bg-no-repeat min-h-screen  bg-gray-100 flex flex-col justify-start items-center sm:py-12"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container mx-auto mt-6 px-4 sm:px-8 bg-white rounded-2xl">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold text-left leading-tight">
                {userName}
              </h2>
              <form className=" flex flex-col">
                <h2 className="text-xl font-light text-left py-2 leading-tight">
                  Include Students
                </h2>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  onChange={handleStudentToAdd}
                >
                  {students.map((student) => {
                    return (
                      <option key={student._id} value={student._id}>
                        {student.name}
                      </option>
                    );
                  })}
                </select>
                <button
                  onClick={handleAddStudent}
                  class="w-full h-12 px-6 text-black transition-colors duration-150  rounded-lg focus:shadow-outline bg-sky-100 hover:bg-sky-200"
                >
                  Include Student
                </button>
              </form>
              <h2 className="text-xl font-light text-left py-2 leading-tight">
                Students
              </h2>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Photo
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsTeacher.map((student) => {
                      return (
                        <tr
                          key={student._id}
                          onClick={(e) => {
                            if (
                              e.target.id !== "delete" &&
                              e.target.tagName !== "path"
                            ) {
                              navigate(`/trains/${student._id}`);
                            }
                          }}
                          className="hover:bg-sky-100"
                        >
                          <td className="px-5 py-5 border-b border-gray-200  text-sm w-2/5">
                            <div className="flex items-center justify-center">
                              <div className="flex-shrink-0 w-10 h-10 table-cell">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={
                                    student.img
                                      ? student.img
                                      : "https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200  text-sm relative">
                            <p className="text-gray-900 whitespace-no-wrap text-center">
                              {student.name}
                            </p>
                            <div
                              id="delete"
                              className="bottom-7 right-0 h-6 w-h-6 absolute"
                            >
                              <button
                                id="delete"
                                className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-full mx-2"
                                onClick={async (e) => {
                                  e.preventDefault();
                                  try {
                                    const data =
                                      await studentService.deleteStudentFromPersonal(
                                        id,
                                        student._id
                                      );
                                    toast.success(data.data.message, {
                                      position: "top-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                    });
                                  } catch (err) {
                                    const errorDescription =
                                      err.response.data.message;
                                    toast.error(errorDescription, {
                                      position: "top-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                    });
                                  }
                                  setReRender((prev) => !prev);
                                }}
                              >
                                <BsFillTrashFill id="delete" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ViewStudents;
