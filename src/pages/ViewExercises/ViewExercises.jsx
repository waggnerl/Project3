import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import exerciseService from "../../services/exercise.service";
import GymTrainImage from "../../assets/gym-train.jpg";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import backgroundImage from "../../assets/gym.jpg";

function ViewTrains() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { trainId, studentName } = useParams();
  const [exercises, setExercises] = useState([]);
  const [trainToAdd, setTrainToAdd] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [interval, setInterval] = useState("");
  const [activicty, setActivicty] = useState("");
  const [activicties, setActivicties] = useState([]);
  const [reRender, setReRender] = useState(false);

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleInterval = (e) => setInterval(e.target.value);
  const handleSets = (e) => setSets(e.target.value);
  const handleReps = (e) => setReps(e.target.value);
  const handleActivicty = (e) => setActivicty(e.target.value);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editReps, setEditReps] = useState("");
  const [editSets, setEditSets] = useState("");
  const [editInterval, setEditInterval] = useState("");
  const [editActivicty, setEditActivicty] = useState("");
  const [editActivicties, setEditActivicties] = useState([]);

  const handleEditName = (e) => setEditName(e.target.value);
  const handleEditDescription = (e) => setEditDescription(e.target.value);
  const handleEditInterval = (e) => setEditInterval(e.target.value);
  const handleEditSets = (e) => setEditSets(e.target.value);
  const handleEditReps = (e) => setEditReps(e.target.value);
  const handleEditActivicty = (e) => setEditActivicty(e.target.value);

  const handleActivicties = (e) => {
    e.preventDefault();
    setActivicties((prev) => [...prev, activicty]);
  };

  const handleEditActivicties = (e) => {
    e.preventDefault();
    setEditActivicties((prev) => [...prev, editActivicty]);
  };

  const handleDeleteActivicties = (e) => {
    e.preventDefault();
    setActivicties((prev) =>
      prev.filter((el, index) => {
        return index.toString() !== e.target.id;
      })
    );
  };

  const handleDeleteEditActivicties = (e) => {
    e.preventDefault();
    setEditActivicties((prev) =>
      prev.filter((el, index) => {
        return index.toString() !== e.target.id;
      })
    );
  };

  const handleAddExercise = async (e) => {
    e.preventDefault();
    try {
      const data = await exerciseService.addExercise(
        name,
        description,
        interval,
        reps,
        sets,
        trainId,
        activicties
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

  const handleEditExercise = async (exerciseId) => {
    try {
      const body = {
        name: editName,
        description: editDescription,
        reps: editReps,
        sets: editSets,
        interval: editInterval,
        activicties: editActivicties,
        exerciseId,
      };
      const data = await exerciseService.updateOne({
        body,
      });
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
    const getTrains = async () => {
      const data = await exerciseService.getAll(trainId);
      setExercises(data.data.exercises);
    };
    getTrains();
  }, [trainId, reRender]);
  return (
    <div
      className={`h-screen w-full ${
        exercises.length > 0 ? "max-w-fit sm:max-w-full" : "max-w-full"
      }   bg-cover bg-center bg-no-repeat min-h-screen  bg-gray-100 flex flex-col justify-start items-center sm:py-12`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto sm:px-8 bg-white rounded-2xl">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold text-left leading-tight">
              {studentName}
            </h2>
            <form className=" flex flex-col w-full sm:w-1/5 py-4">
              <label htmlFor="my-modal" className="btn">
                Create New Exercise
              </label>

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
                        <span className="label-text">Interval</span>
                      </label>
                      <select
                        onChange={handleInterval}
                        className="select select-bordered"
                      >
                        <option disabled selected>
                          Select One
                        </option>
                        <option>20 Seconds</option>
                        <option>30 Seconds</option>
                        <option>1 min</option>
                        <option>1 min 30 Seconds</option>
                        <option>2 min</option>
                      </select>
                      <label className="label">
                        <span className="label-text">Reps</span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered w-full "
                        onChange={handleReps}
                      />
                      <label className="label">
                        <span className="label-text">Sets</span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered w-full "
                        onChange={handleSets}
                      />
                      <label className="label">
                        <span className="label-text">Activicties</span>
                      </label>
                      <div className="flex">
                        <input
                          onChange={handleActivicty}
                          type="text"
                          className="input input-bordered w-full "
                        />
                        <button
                          className="btn w-16"
                          onClick={handleActivicties}
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                      <div className="h-8 flex w-full items-center flex-wrap py-4">
                        {activicties.map((activicty, index) => (
                          <div className="badge badge-info gap-2">
                            <button
                              id={index}
                              onClick={handleDeleteActivicties}
                              className="h-full flex items-center"
                            >
                              <svg
                                id={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-4 h-4 stroke-current"
                              >
                                <path
                                  id={index}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                ></path>
                              </svg>
                            </button>
                            {activicty}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="modal-action">
                    <button className="btn" onClick={handleAddExercise}>
                      Send Data
                    </button>
                    <label htmlFor="my-modal" className="btn">
                      Close
                    </label>
                  </div>
                </div>
              </div>
            </form>
            <div className="flex flex-wrap gap-6 max-w-fit">
              {exercises.map((exercise) => (
                <div
                  key={exercise._id}
                  className="card w-96 bg-base-100 shadow-xl"
                >
                  <figure>
                    <img src={GymTrainImage} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{exercise.name}</h2>
                    <p className="text-left">{exercise.description}</p>
                    <div className="grid grid-cols-2 max-w-fit">
                      <p className="text-left text-gray-400 text-xs col-span-1	">
                        <span className="text-black">Interval:</span>
                        {exercise.interval}
                      </p>
                      <p className="text-left text-gray-400 text-xs col-span-1	">
                        <span className="text-black">Reps:</span>
                        {exercise.reps}
                      </p>
                      <p className="text-left text-gray-400 text-xs col-span-1	">
                        <span className="text-black">Sets:</span>
                        {exercise.sets}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          try {
                            const data = await exerciseService.deleteProject(
                              trainId,
                              exercise._id
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
                        className="btn btn-error w-1/3"
                      >
                        Delete Exercise
                      </button>
                      <label htmlFor="my-modal2" className="btn w-1/3">
                        See Activicties
                      </label>
                      <label htmlFor="my-modal-edit" className="btn w-1/3">
                        Update Exercise
                      </label>
                    </div>

                    {/* Put this part before </body> tag */}
                    <input
                      type="checkbox"
                      id="my-modal2"
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box">
                        {exercise.activicties.map((activicty) => (
                          <>
                            <h3 className="font-bold text-lg">{activicty}</h3>
                          </>
                        ))}
                        <div className="modal-action">
                          <label htmlFor="my-modal2" className="btn">
                            Close
                          </label>
                        </div>
                      </div>
                    </div>
                    <form className=" flex flex-col w-full sm:w-1/5 py-4">
                      <input
                        onClick={(e) => {
                          setEditDescription(exercise.description);
                          setEditName(exercise.name);
                          setEditInterval(exercise.interval);
                          setEditReps(exercise.reps);
                          setEditSets(exercise.sets);
                          setEditActivicties(exercise.activicties);
                        }}
                        type="checkbox"
                        id="my-modal-edit"
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Editar Treino</h3>
                          <div className="py-4">
                            <div className="form-control w-full ">
                              <label className="label">
                                <span className="label-text">Name</span>
                              </label>
                              <input
                                defaultValue={editName}
                                type="text"
                                className="input input-bordered w-full "
                                onChange={handleEditName}
                              />
                              <label className="label">
                                <span className="label-text">Description</span>
                              </label>
                              <textarea
                                defaultValue={editDescription}
                                className="textarea  textarea-bordered w-full"
                                onChange={handleEditDescription}
                              ></textarea>
                              <label className="label">
                                <span className="label-text">Interval</span>
                              </label>
                              <select
                                defaultValue={editInterval}
                                onChange={handleEditInterval}
                                className="select select-bordered"
                              >
                                <option>20 Seconds</option>
                                <option>30 Seconds</option>
                                <option>1 min</option>
                                <option>1 min 30 Seconds</option>
                                <option>2 min</option>
                              </select>
                              <label className="label">
                                <span className="label-text">Reps</span>
                              </label>
                              <input
                                defaultValue={editReps}
                                type="number"
                                className="input input-bordered w-full "
                                onChange={handleEditReps}
                              />
                              <label className="label">
                                <span className="label-text">Sets</span>
                              </label>
                              <input
                                defaultValue={editSets}
                                type="number"
                                className="input input-bordered w-full "
                                onChange={handleEditSets}
                              />
                              <label className="label">
                                <span className="label-text">Activicties</span>
                              </label>
                              <div className="flex">
                                <input
                                  onChange={handleEditActivicty}
                                  type="text"
                                  className="input input-bordered w-full "
                                />
                                <button
                                  className="btn w-16"
                                  onClick={handleEditActivicties}
                                >
                                  <AiOutlinePlus />
                                </button>
                              </div>
                              <div className="h-8 flex w-full items-center flex-wrap py-4">
                                {editActivicties.map((activicty, index) => (
                                  <div className="badge badge-info gap-2">
                                    <button
                                      id={index}
                                      onClick={handleDeleteEditActivicties}
                                      className="h-full flex items-center"
                                    >
                                      <svg
                                        id={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block w-4 h-4 stroke-current"
                                      >
                                        <path
                                          id={index}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                      </svg>
                                    </button>
                                    {activicty}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="modal-action">
                            <button
                              className="btn"
                              onClick={(e) => {
                                e.preventDefault();
                                handleEditExercise(exercise._id);
                              }}
                            >
                              Send Data
                            </button>
                            <label htmlFor="my-modal-edit" className="btn">
                              Close
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTrains;
