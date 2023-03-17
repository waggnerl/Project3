import "./ProfilePage.css";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../../assets/gym.jpg";
import profileImg from "../../assets/profile.png";
import service from "../../api/service";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";

function ProfilePage(props) {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("img", e.target.files[0]);
    try {
      setIsLoading(true);
      const data = await service.uploadImage(uploadData);
      setIsLoading(false);
      setImg(data.fileUrl);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, img };

    try {
      const data = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/profile/edit/${id}`,
        body
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

      navigate(`/profile/${id}`);
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
    const getProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/profile/${id}`
        );
        setEmail(response.data.email);
        setName(response.data.name);
        setImg(response.data.img);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [id]);
  if (isLoading) return <Loading />;
  return (
    <div
      className=" h-screen w-full  bg-cover bg-center bg-no-repeat min-h-screen  bg-gray-100 flex flex-col justify-center items-center sm:py-12"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="">
        <div className="bg-white shadow-xl rounded-lg p-12 min-h-min h-[450px] w-96 flex flex-col items-center	">
          <div className="w-24 mask mask-squircle justify-center">
            <img src={img} alt={img} />
          </div>
          <div className=" h-full flex flex-col  justify-center ">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {" "}
            </h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p></p>
            </div>
            <form onSubmit={handleSubmit}>
              <table className="text-xs my-3">
                <tbody>
                  {
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">
                        Name
                      </td>
                      <td className="px-2 py-2 text-base">
                        <input
                          type="text"
                          className="input input-bordered w-full max-w-xs"
                          onChange={handleName}
                          value={name}
                        />
                      </td>
                    </tr>
                  }
                  {
                    <tr>
                      <td className="px-2 py-2 text-gray-500 font-semibold">
                        Email
                      </td>
                      <td className="px-2 py-2">
                        <input
                          value={email}
                          className="input input-bordered w-full max-w-xs"
                        ></input>
                      </td>
                    </tr>
                  }
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold ">
                      Profile Image
                    </td>
                    <td className="px-2 py-2 ">
                      <input
                        className="file-input file-input-bordered file-input-xs w-full max-w-xs"
                        type="file"
                        /* value={img} */
                        onChange={handleFileUpload}
                        /* defaultValue={img} */
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className="transition duration-200 bg-white hover:bg-black focus:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-lg hover:text-white border-2 w-full py-2 text-sm"
                type="submit"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
