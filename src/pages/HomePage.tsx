import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-400 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Welcome to the Booking System
      </h1>
      <p className="text-lg md:text-xl text-center max-w-xl mb-8">
        Easily add and manage your appointments and keep track of your schedule all in one place.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-purple-100 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-pink-100 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
