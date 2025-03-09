"use client";
import { usePathname, useRouter } from "next/navigation";
import { useUserContext } from "../../context/UserContext";
import { logOutUser } from "../../functions/functions";

const Header = () => {
  const { admin, setUser } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex gap-5 justify-end p-5 bg-black">
      {admin && pathname === "/kalender" ? (
        <button
          onClick={() => router.push("/adminpanel")}
          className="text-white font-bold px-3 py-1 rounded-md bg-green-500"
        >
          Adminpanel
        </button>
      ) : (
        <button
          onClick={() => router.push("/kalender")}
          className="text-white font-bold px-3 py-1 rounded-md bg-green-500"
        >
          Kalender
        </button>
      )}
      <button
        onClick={() => logOutUser(setUser)}
        className="text-white font-bold px-3 py-1 rounded-md bg-green-500"
      >
        Logga ut
      </button>
    </div>
  );
};

export default Header;
