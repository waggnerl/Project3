import "./ProfilePage.css";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProfilePage(props) {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/profile/${id}`
        );

        setName(response.data.name);
        setImg(response.data.img);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [id]);
  return (
    <div class="flex items-center h-screen w-full justify-center">

    <div class="max-w-xs">
        <div class="bg-white shadow-xl rounded-lg py-4">
            <div class="photo-wrapper p-2">
            <img src={img}/>
            </div>
            <div class="p-2">
                <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{name}</h3>
                <div class="text-center text-gray-400 text-xs font-semibold">
                    <p></p>
                </div>
                <table class="text-xs my-3">
                    <tbody><tr>
                        <td class="px-2 py-2 text-gray-500 font-semibold">Personal Trainer</td>
                        <td class="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                    </tr>
                    <tr>
                        <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                        <td class="px-2 py-2">john@exmaple.com</td>
                    </tr>
                </tbody></table>
    
                <div class="text-center my-3">
                    <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Trains</a>
                </div>
    
            </div>
        </div>
    </div>
    
    </div>
                 
  );
}

export default ProfilePage;
