import axios from "axios";

class TrainService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });
  }

  // POST /api/students
  addTrain = async (name, description, interval, studentId) => {
    return this.api.post(`/train/create`, {
      name,
      description,
      interval,
      studentId,
    });
  };

  // Delete /api/students
  deleteStudentFromPersonal = async (id, studentToRemove) => {
    return this.api.post(`/student/${id}/${studentToRemove}/delete`);
  };

  // GET /api/students
  getAll = async (userId) => {
    return this.api.get(`/train/all/${userId}`);
  };

  // GET /api/students/:id
  getOnesFromStudent = (_id) => {
    const personalId = _id;
    return this.api.get(`/student/${personalId}`);
  };

  // PUT /api/students/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/api/students/${id}`, requestBody);
  };

  // DELETE /api/students/:id
  deleteProject = async (trainId) => {
    return this.api.post(`/train/delete`, {
      trainId,
    });
  };
}

// Create one instance of the service
const trainService = new TrainService();

export default trainService;
