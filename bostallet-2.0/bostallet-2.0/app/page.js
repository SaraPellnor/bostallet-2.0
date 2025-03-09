import Login from "./Components/Login/Login";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import hero from "./images/hero.png";
import Image from "next/image";
const page = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  user && redirect("/kalender"); // Skicka tillbaka till startsidan om det inte finns en token

  return (
    <div className="relative w-full">
      <Image priority alt="hero image" src={hero} />

      <Login />
    </div>
  );
};

export default page;
