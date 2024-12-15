import React, { useState } from "react";

const AdminLogin = ({ setHidden, hidden, setIsAdmin }) => {
  const [password, setPassword] = useState(""); // För att hålla koll på lösenordet
  const [error, setError] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const res = await fetch("/api/admin/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        });
        setPassword("")

        if (res.ok) {
          setIsAdmin(true);
        } else {
          const data = await res.json();
          setError(data.message || "Fel lösenord!");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Något gick fel, försök igen.");
      }
    }
  };

  return (
    <div className="absolute">
      <div
        onClick={() => {
          hidden ? setHidden(false) : setHidden(true);
        }}
        className="absolute -m-5 w-[100vw] h-[100vh] left-0 top-0 right-0 bottom-0 bg-black opacity-50"
      ></div>
      <div className="absolute z-10 flex flex-col justify-center gap-2 bg-purple_2 p-7 w-[100vw] -top-5 -left-5">
        <input
          className="p-2 rounded-lg w-[50%]"
          placeholder="Skriv in lösenord för admin"
          type="password"
          value={password} // Håller koll på användarens input
          onChange={(e) => setPassword(e.target.value)} // Uppdaterar state när användaren skriver
          onKeyDown={handleKeyDown} // Fångar Enter-tangenten
        />
        {error && <p className="text-yellow_1">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
