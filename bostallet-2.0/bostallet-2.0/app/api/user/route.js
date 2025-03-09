import { cookies } from "next/headers";
import fs from "fs/promises";

export const GET = async () => {
  try {
    // Läs JSON-filen
    const cookieStore = await cookies();
    const isUser = cookieStore.get("user");
    const decodedUser = decodeURIComponent(isUser.value);

    if (decodedUser) {
      return new Response(decodedUser, { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Data hittades inte!" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fel vid läsning av filen." }),
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  const { email, password } = await req.json();

  try {
    // Läs JSON-filen
    const filePath = process.cwd() + "/data/data.json";
    const jsonData = await fs.readFile(filePath, "utf-8");

    const data = JSON.parse(jsonData);
    console.log(data);
    
    const emailExists = data.some((item) => item.email === email);

    const adminPassword = process.env.USER_PASSWORD;
    const isPassword = adminPassword === password;
    if (emailExists && isPassword) {
      const userObject = data.find((item) => item.email === email);
      const cookieStore = await cookies();
      userObject &&
        cookieStore.set(
          "user",
          JSON.stringify({
            username: userObject.name,
            admin: userObject.admin,
          }),
          { maxAge: 3600 }
        );

      return new Response(
        JSON.stringify({ userName: userObject.name, admin: userObject.admin }),
        { status: 200 }
      );
    } else if (!emailExists) {
      return new Response(
        JSON.stringify({
          message: "Du verkar inte finnas med i vårat system. Kontakta admin.",
        }),
        { status: 404 }
      );
    } else if (emailExists && !isPassword) {
      return new Response(
        JSON.stringify({
          message: "Fel lösenord, försök igen.",
        }),
        { status: 404 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Fel epostaddress eller lösenord, försök igen.",
        }),
        { status: 404 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fel vid läsning av filen." }),
      { status: 500 }
    );
  }
};

export const DELETE = async () => {
  try {
    const cookieStore = await cookies();
    const isUser = cookieStore.get("user");

    if (isUser) {
      // Ta bort cookien
      cookieStore.delete("user");

      return new Response(
        JSON.stringify({ message: "Cookie har tagits bort!" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Cookie hittades inte!" }),
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fel vid borttagning av cookie." }),
      { status: 500 }
    );
  }
};
