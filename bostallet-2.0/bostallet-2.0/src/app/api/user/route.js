import { cookies } from "next/headers";
import fs from "fs/promises";

export const GET = async (req) => {
  try {
    // Läs JSON-filen
    const cookieStore = await cookies();
    const isUser = cookieStore.get("user");
    const decodedUser = decodeURIComponent(isUser.value);

    if (decodedUser) {
      return new Response(JSON.stringify(decodedUser), { status: 200 });
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
    const emailExists = data.some((item) => item.email === email);
    const userObject = data.find((item) => item.email === email);

    const cookieStore = await cookies();

    userObject && cookieStore.set("user", userObject.name, { maxAge: 1800 });
    console.log("ok?");

    const adminPassword = process.env.USER_PASSWORD;
    const isPassword = adminPassword === password;
console.log("isPassword",isPassword,);
console.log("emailExists",emailExists);


    if (emailExists && isPassword) {
      return new Response(
        JSON.stringify(userObject.name),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Fel epostaddress eller lösenord, försök igen." }),
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
