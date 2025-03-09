"use client";
import { useUserContext } from "../../context/UserContext";
import { handleLogIn } from "../../functions/functions";
const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    message,
    setMessage,
    setUser,
    setAdmin,
  } = useUserContext();

  return (
    <div className="p-5 max-w-[700px] m-auto">
      <div className="flex flex-col justify-around gap-4 pt-20">
        <input
          className="px-10 py-4"
          placeholder="e-post"
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)} // Uppdatera state
          required
        />
        <input
          className="px-10 py-4"
          placeholder="lösenord"
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)} // Uppdatera state
          required
        />
        <button
          className="transition duration-500 ease-out text-font font-bold gradiantBg py-4 px-10 rounded-md hover:scale-105"
          onClick={() =>
            handleLogIn(email, password, setMessage, setUser, setAdmin)
          } 
        >
          Verifiera dig
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
