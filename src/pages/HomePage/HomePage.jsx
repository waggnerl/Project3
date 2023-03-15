import "./HomePage.css";
import backgroundImage from "../../assets/gym.jpg";

function HomePage() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}
    className="bg-cover bg-center bg-no-repeat min-h-screen  bg-gray-100 flex flex-col justify-center sm:py-12">
      <h1 className="text-white text-4xl font-bold border-solid border-black border-2">Transform your workout
       into a unique journey with our gym app, where expert personal trainers and a 
       community of students come together to offer personalized and motivating workout routines.</h1>
    </div>
  );
}

export default HomePage;
