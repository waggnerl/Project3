import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import trainService from "../../services/trains.service";
import GymTrainImage from "../../assets/gym-train.jpg";
import { format } from "date-fns";
import { toast } from "react-toastify";

function ViewTrains() {
  const navigate = useNavigate();
  const { studentId, studentName } = useParams();
  const [trains, setTrains] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reRender, setReRender] = useState(false);

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleStart = (e) => setStart(e.target.value);
  const handleEnd = (e) => setEnd(e.target.value);

  const handleAddTrain = async (e) => {
    e.preventDefault();
    const interval = `${format(new Date(start), "dd/MM/yyyy")}-${format(
      new Date(end),
      "dd/MM/yyyy"
    )}`;
    try {
      const data = await trainService.addTrain(
        name,
        description,
        interval,
        studentId
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
      setReRender((prev) => !prev);
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
  };

  useEffect(() => {
    const getExercises = async () => {
      const data = await trainService.getAll(studentId);

      setTrains(data.data.trains);
    };
    getExercises();
  }, [studentId, reRender]);
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold text-left leading-tight">
            {studentName}
          </h2>
          <form className=" flex flex-col w-full sm:w-1/5 py-4">
            <label htmlFor="my-modal" className="btn">
              Create New Train
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Criar Novo Treino</h3>
                <div className="py-4">
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full "
                      onChange={handleName}
                    />
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>

                    <textarea
                      className="textarea  textarea-bordered w-full"
                      onChange={handleDescription}
                    ></textarea>
                    <label className="label">
                      <span className="label-text">Start</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered w-full "
                      onChange={handleStart}
                    />
                    <label className="label">
                      <span className="label-text">End</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered w-full "
                      onChange={handleEnd}
                    />
                  </div>
                </div>
                <div className="modal-action">
                  <button className="btn" onClick={handleAddTrain}>
                    Send Data
                  </button>
                  <label htmlFor="my-modal" className="btn">
                    Close
                  </label>
                </div>
              </div>
            </div>
          </form>
          <div className="flex flex-wrap gap-6">
            {trains.map((train) => (
              <div key={train._id} className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src={GymTrainImage} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{train.name}</h2>
                  <h2 className="text-left text-gray-400 text-xs">
                    {train.interval}
                  </h2>
                  <p className="text-left">{train.description}</p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          const data = await trainService.deleteProject(
                            train._id
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
                          setReRender((prev) => !prev);
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
                      }}
                      className="btn btn-error"
                    >
                      Delete Train
                    </button>
                    <div className="card-actions justify-end">
                      <button
                        className="btn "
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/exercises/${train._id}/${studentName}`);
                        }}
                      >
                        Look Exercises
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTrains;
