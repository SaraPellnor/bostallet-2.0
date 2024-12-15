"use client";
import { useEffect, useState } from "react";
import Auth from "./Components/Auth/Auth";
import Header from "./Components/Header/Header";
import Schema from "./Components/Schema/Schema";
import AdminPanel from "./Components/AdminPanel/AdminPanel";

const page = () => {
  const [hidden, setHidden] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("/api/admin");
        const data = await response.json();

        if (response.status === 200) {
          setIsAdmin(true);
        } else {
          console.log(data.message || "Något gick fel");
        }
      } catch (error) {
        console.log("Något gick fel vid anropet");
      }
    };
    const checkUserStatus = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
console.log("vad händer:",data);

        if (response.status === 200) {
          setUser(data);
        } else {
          console.log(data.message || "Något gick fel");
        }
      } catch (error) {
        console.log("Något gick fel vid anropet.");
      }
    };

    checkAdminStatus();
    checkUserStatus();
  }, []);
  return (
    <div className="relative w-full ">
      {isAdmin ? (
        <AdminPanel />
      ) : user ? (
        <Schema user={user} />
      ) : (
        <div className="p-5 max-w-[700px] m-auto">
          <Header
            setIsAdmin={setIsAdmin}
            setHidden={setHidden}
            hidden={hidden}
          />
          <Auth setUser={setUser} />
        </div>
      )}
    </div>
  );
};

export default page;
