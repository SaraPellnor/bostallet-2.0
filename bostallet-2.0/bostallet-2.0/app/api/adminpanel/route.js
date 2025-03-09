import fs from "fs/promises";

export const GET = async (req) => {
  try {
    // Läs JSON-filen
    const filePath = process.cwd() + "/data/data.json";
    const jsonData = await fs.readFile(filePath, "utf-8");

    const data = JSON.parse(jsonData);

    if (data) {
      return new Response(JSON.stringify(data), { status: 200 });
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
  try {
    const { name, email, mobile, isAdmin } = await req.json();

    // Filväg till JSON-filen
    const filePath = process.cwd() + "/data/data.json";

    // Läs in existerande data
    const jsonData = await fs.readFile(filePath, "utf-8");
    let data = JSON.parse(jsonData);

    // Kontrollera om användaren redan finns
    const userExists = data.some((item) => item.email === email);

    if (userExists) {
      return new Response(
        JSON.stringify({ message: "Användaren finns redan" }),
        { status: 400 }
      );
    }

    // Lägg till den nya användaren
    const newUser = {
      admin: isAdmin,
      name: name,
      email: email,
      mobile: mobile,
      weeks: [],
    };
    data.push(newUser);

    // Skriv tillbaka till filen
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return new Response(
      JSON.stringify({ message: "Användare tillagd!", userData: newUser }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Fel vid hantering av data",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
};
// jag behöver skicka med värdet för user...       <--------------------------------------
export const PUT = async (req) => {
  const { week, pass, user, name, mobile, email, isAdminCheckBox } =
    await req.json();

  try {
    // Läs JSON-filen
    const filePath = process.cwd() + "/data/data.json";
    const jsonData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    // Hitta index för användaren i databasen
    const userIndex = data.findIndex((item) => item.email === user.email);

    if (userIndex === -1) {
      return new Response(
        JSON.stringify({ message: "Användare hittades inte." }),
        { status: 404 }
      );
    }

    // Uppdatera användarens data
    data[userIndex] = {
      ...data[userIndex], // Behåller befintliga värden
      name: name,
      mobile: mobile,
      email: email,
      admin: isAdminCheckBox,
    };

    
    // Hitta rätt vecka och ta bort passet om det finns
    if (week) {
      const weekIndex = data[userIndex].weeks.findIndex(
        (item) => item.week === week
      );

      if (weekIndex === -1) {
        return new Response(JSON.stringify({ message: "Veckan finns inte." }), {
          status: 404,
        });
      }

      // Filtrera bort passet från veckan
      data[userIndex].weeks[weekIndex].pass = data[userIndex].weeks[
        weekIndex
      ].pass.filter((number) => number !== pass);

      // Om veckan blir tom, ta bort den helt från weeks-arrayen
      if (data[userIndex].weeks[weekIndex].pass.length === 0) {
        data[userIndex].weeks.splice(weekIndex, 1);
      }
    }
    // Fel sker när jag ska skriva om databasen. <<<<<<<<<<--------------------------------
    // Spara den uppdaterade databasen
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return new Response(
      JSON.stringify({ message: "Pass borttaget framgångsrikt." }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fel vid läsning eller uppdatering av filen." }),
      { status: 500 }
    );
  }
};


export const DELETE = async (req) => {
  const { email } = await req.json();
console.log(email);

  try {
    // Läs JSON-filen
    const filePath = process.cwd() + "/data/data.json";
    const jsonData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    // Hitta index för användaren i databasen
    const userIndex = data.findIndex((item) => item.email === email);

    if (userIndex === -1) {
      return new Response(
        JSON.stringify({ message: "Användare hittades inte." }),
        { status: 404 }
      );
    }

    // Ta bort användaren från databasen
    data.splice(userIndex, 1);

    // Spara den uppdaterade databasen
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return new Response(
      JSON.stringify({ message: "Användare borttagen." }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fel vid läsning eller borttagning av filen." }),
      { status: 500 }
    );
  }
};