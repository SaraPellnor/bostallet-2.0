"use client";
import React from "react";
import { GrUserAdmin } from "react-icons/gr";
import Image from "next/image";
import hero from "../../images/hero.png";
import AdminLogin from "../AdminLogin/AdminLogin";
const Header = ({ setHidden, hidden, setIsAdmin }) => {
  return (
    <div className="">
      {!hidden && (
        <AdminLogin
          setIsAdmin={setIsAdmin}
          setHidden={setHidden}
          hidden={hidden}
        />
      )}
      <div className="flex justify-end">
        <GrUserAdmin
          onClick={() => (hidden ? setHidden(false) : setHidden(true))}
          className={`z-20 ${
            hidden ? "text-purple_2 text-2xl" : "text-white text-3xl"
          }`}
        />
      </div>
      <Image priority alt="hero image" src={hero} />
    </div>
  );
};

export default Header;
