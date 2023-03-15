import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ViewStudents from "./pages/ViewStudents/ViewStudents";
import ViewExercises from "./pages/ViewExercises/ViewExercises";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import ViewTrains from "./pages/ViewTrains/ViewTrains";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/profile/:id" element={<ProfilePage />} />

        <Route
          path="/list-students"
          element={
            <IsPrivate>
              <ViewStudents />
            </IsPrivate>
          }
        />

        <Route
          path="/trains/:studentId/:studentName"
          element={
            <IsPrivate>
              <ViewTrains />
            </IsPrivate>
          }
        />

        <Route
          path="/exercises/:trainId/:studentName"
          element={
            <IsPrivate>
              <ViewExercises />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
