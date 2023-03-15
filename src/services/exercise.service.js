import axios from "axios";

class ExerciseService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });
  }

  // POST /api/students
  addExercise = async (
    name,
    description,
    interval,
    reps,
    sets,
    trainId,
    activicties
  ) => {
    return this.api.post(`/exercise/create`, {
      name,
      description,
      interval,
      trainId,
      reps,
      sets,
      activicties,
    });
  };

  // Delete /api/students
  deleteStudentFromPersonal = async (id, studentToRemove) => {
    return this.api.post(`/student/${id}/${studentToRemove}/delete`);
  };

  // GET /api/students
  getAll = async (trainId) => {
    return this.api.get(`/exercise/getAll/${trainId}`);
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
  deleteProject = async (id) => {
    return this.api.delete(`/api/students/${id}`);
  };
}

// Create one instance of the service
const exerciseService = new ExerciseService();

export default exerciseService;
