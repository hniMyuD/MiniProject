import { useAuth } from "../context/AuthContext";

export const HomePage = () => {
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center">Home Page</h1>
      <p className="text-center">Welcome {user?.name} to the home page!</p>
      <p className="text-center">Your email is: {user?.email}</p>
      <p className="text-center">Your ID is: {user?.id}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};
