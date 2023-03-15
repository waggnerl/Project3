import "./ProfilePage.css";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../../assets/gym.jpg";

function ProfilePage(props) {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/profile/${id}`
        );
        console.log(response.data);
        setEmail(response.data.email);
        setName(response.data.name);
        setImg(response.data.img);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [id]);
  return (
    <div
      class="flex items-center h-screen w-full justify-center"
      className="bg-cover bg-center bg-no-repeat min-h-screen  bg-gray-100 flex flex-col justify-center sm:py-12"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >


      <div class="max-w-xs">
        <div class="bg-white shadow-xl rounded-lg py-4 h-[300px]">
          <div class="photo-wrapper p-2">
            <img src={img} alt={img}/>
          </div>
          <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8"> </h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
              <p></p>
            </div>
            <table class="text-xs my-3">
              <tbody>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Name</td>
                  <td class="px-2 py-2">{name}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td class="px-2 py-2">{email}</td>
                </tr>
              </tbody>
            </table>

            <div class="text-center my-3">
              <a
                className="transition duration-200 bg-white hover:bg-black focus:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-lg hover:text-white border-2 w-full py-2 text-sm"
                href="#"
              >
                View Trains
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProfilePage;
