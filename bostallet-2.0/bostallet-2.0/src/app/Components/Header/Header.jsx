import React from "react";
import { GrUserAdmin } from "react-icons/gr";
import Image from "next/image";
import hero from "../../images/hero.png";
const Header = () => {
  return (
    <div>
      <div className=" flex justify-end">
        <GrUserAdmin className="text-purple_2 text-2xl" />
      </div>
      <Image priority alt="hero image" src={hero} />
    </div>
  );
};

export default Header;
