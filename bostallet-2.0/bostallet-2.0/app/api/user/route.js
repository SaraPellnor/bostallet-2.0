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
      const userObject = data.find((item) => item.email === email);

    const adminPassword = process.env.ADMIN_PASSWORD;
    const userPassword = process.env.USER_PASSWORD;

    const isAdminPassword = adminPassword === password;
    const isUserPassword = userPassword === password;

    const validUser = userObject.admin && isAdminPassword || !userObject.admin && isUserPassword;
console.log("validUser", validUser);

    if (emailExists && validUser) {
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


export const PUT = async (req) => {
  const { week } = await req.json(); // Ex: { "week": 1 eller 15 }

  try {
    const filePath = process.cwd() + "/data/data.json";
    const jsonData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    // Räkna ut föregående vecka
    const weekToRemove = week > 1 ? week - 1 : 52;

    // Gå igenom alla användare och ta bort just den veckan
    data.forEach((user) => {
      user.weeks = user.weeks.filter((item) => item.week !== weekToRemove);
    });

    // Spara ändrade data tillbaka till filen
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return new Response(
      JSON.stringify({ message: `Vecka ${weekToRemove} borttagen för alla användare.` }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Fel vid rensning:", error);
    return new Response(
      JSON.stringify({ error: "Fel vid läsning eller skrivning av filen." }),
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
