import { cookies } from "next/headers";

export const GET = async (req) => {
  try {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin");
console.log(isAdmin);

    if (isAdmin) {
      return new Response(JSON.stringify(true), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Du är inte admin!" }), {
        status: 401,
      });
    }
  } catch (error) {    
    console.error("Error in GET:", error); // Logga fel här
    return new Response(JSON.stringify({ error: "Något gick fel." }), {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (password === adminPassword) {
      const cookieStore = await cookies();
      cookieStore.set("admin", true, { maxAge: 1800 });

      return new Response(JSON.stringify({ message: "Inloggad som admin" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Fel lösenord!" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error in POST:", error); // Logga fel här
    return new Response(
      JSON.stringify({ error: "Något gick fel, försök igen." }),
      { status: 500 }
    );
  }
};
