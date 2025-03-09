import Calendar from "../../Components/Calendar/Calendar";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const page = async () => {
    const cookieStore = await cookies();
    const token =  cookieStore.get("user");
  
    if (!token) { 
      redirect("/"); // Skicka tillbaka till startsidan om det inte finns en token
    }
  return <Calendar />;
};

export default page;
