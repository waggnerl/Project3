import axios from "axios";

class StudentService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });
  }

  // POST /api/students
  addStudentToPersonal = async (id, studentToAdd) => {
    return this.api.post(`/student/${id}/${studentToAdd}`);
  };

  // Delete /api/students
  deleteStudentFromPersonal = async (id, studentToRemove) => {
    return this.api.post(`/student/${id}/${studentToRemove}/delete`);
  };

  // GET /api/students
  getAll = async () => {
    return this.api.get("/student");
  };

  // GET /api/students/:id
  getOnesFromPersonal = (_id) => {
    const personalId = _id;
    return this.api.get(`/student/${personalId}`);
  };

  // PUT /api/students/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/api/students/${id}`, requestBody);
  };

  // DELETE /api/students/:id
  deleteProject = async (id) => {
    return this.api.delete(`/api/students/${id}`);
  };
}

// Create one instance of the service
const studentService = new StudentService();

export default studentService;
