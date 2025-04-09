"use client";
import { usePathname, useRouter } from "next/navigation";
import { useUserContext } from "../../context/UserContext";
import { logOutUser } from "../../functions/functions";

const Header = () => {
  const { admin, setUser } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex gap-5 justify-end w-full max-w-[800px] p-5 pr-16 fixed z-10">
      {admin && pathname === "/kalender" ? (
        <button
          onClick={() => router.push("/adminpanel")}
          className="text-white font-bold px-3 py-1 rounded-md bg-green-500 hover:bg-green-600"
        >
          Adminpanel
        </button>
      ) : pathname === "/adminpanel" ? (
        <button
          onClick={() => router.push("/kalender")}
          className="text-white font-bold px-3 py-1 rounded-md bg-green-500 border-2 border-white hover:bg-green-600"
        >
          Kalender
        </button>
      ): ("")}
      <button
        onClick={() => logOutUser(setUser)}
        className="text-white font-bold px-3 py-1 rounded-md bg-red-500 hover:bg-red-600"
      >
        Logga ut
      </button>
    </div>
  );
};

export default Header;
