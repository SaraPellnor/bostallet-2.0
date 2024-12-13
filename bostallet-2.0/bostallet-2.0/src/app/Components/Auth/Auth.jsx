"use client";

import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      
      const res = await fetch("/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }), // Skicka e-postadressen
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message); // Visa framgångsmeddelande
      } else {
        setMessage(data.message); // Visa felmeddelande
      }
    } catch (error) {
      setMessage("Ett fel inträffade, försök igen senare.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-around gap-4 pt-20">
      <input
        className="px-10 py-4"
        placeholder="e-post"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Uppdatera state
      />
      <button
        className="transition duration-500 ease-out text-font font-bold gradiantBg py-4 px-10 rounded-md hover:scale-105"
        onClick={handleSubmit} // Skicka POST-förfrågan
      >
        Verifiera dig
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Auth;
