import { cookies } from "next/headers";
import AdminPanel from "../../Components/AdminPanel/AdminPanel";
import { redirect } from "next/navigation";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("user");

  if (!token) {
    redirect("/"); // Skicka tillbaka till startsidan om det inte finns en token
  }
  return <AdminPanel />;
};

export default page;
