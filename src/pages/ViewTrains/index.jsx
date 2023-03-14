import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import studentService from "../../services/student.service";
import { BsFillTrashFill } from "react-icons/bs";

function ViewTrains() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const id = user._id;
  const [students, setStudents] = useState([]);
  const [studentsTeacher, setStudentsTeacher] = useState([]);
  // const [studentToAdd, setStudentToAdd] = useState({});
  const [reRender, setReRender] = useState(false);

  // const handleStudentToAdd = (e) => setStudentToAdd(e.target.value);

  // const handleAddStudent = async (e) => {
  //   e.preventDefault();
  //   await studentService.addStudentToPersonal(id, studentToAdd);
  //   setReRender((prev) => !prev);
  // };

  const handleNavigate = (e) => {
    if (e.target.id !== "delete") {
      navigate("/");
    }
  };

  useEffect(() => {
    const getStudentsFromPersonal = async () => {
      const data = await studentService.getOnesFromPersonal(id);
      setStudentsTeacher(data.data);
    };
    // const getStudents = async () => {
    //   const data = await studentService.getAll();
    //   setStudents(data.data);
    // };

    getStudentsFromPersonal();
    // getStudents();
  }, [id, reRender]);

  if (students && studentsTeacher && user.role === "personal")
    return (
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold text-left leading-tight">
              {user && user.name}
            </h2>
            <form className=" flex flex-col">
              <h2 className="text-xl font-light text-left py-2 leading-tight">
                Include Students
              </h2>
              {/* <select
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                defaultValue=""
                onChange={handleStudentToAdd}
              >
                <option value="" disabled>
                  Choose a Student
                </option>
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
              </button> */}
            </form>
            <h2 className="text-xl font-light text-left py-2 leading-tight">
              Trains
            </h2>
            <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
              <div className="carousel-item ">
                <h1>hey</h1>
              </div>
              <div className="carousel-item ">
                <h1>hey</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ViewTrains;
