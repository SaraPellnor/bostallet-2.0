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



export const PUT = async (req) => {
  const { id, week, pass, action } = await req.json();  // action kan vara "add" eller "remove"

  try {
    // Läs JSON-filen
    const filePath = process.cwd() + "/data/data.json";
    const jsonData = await fs.readFile(filePath, "utf-8");

    const data = JSON.parse(jsonData);
    const user = data.find((item) => item.name === id);

    if (user) {
      // Hitta rätt vecka, eller skapa ny vecka om den inte finns
      let weekObj = user.weeks.find((item) => item.week === week);

      if (action === 'remove') {
        // Om åtgärden är att ta bort ett pass
        if (weekObj) {
          // Uppdatera pass-arrayen genom att ta bort det specifika passet
          weekObj.pass = weekObj.pass.filter((number) => number !== pass);

          // Spara tillbaka den uppdaterade datan till filen
          await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

          return new Response(
            JSON.stringify({ message: "Pass borttaget framgångsrikt." }),
            { status: 200 }
          );
        } else {
          return new Response(
            JSON.stringify({ message: "Vecka inte hittad." }),
            { status: 404 }
          );
        }
      } else if (action === 'add') {
        // Om åtgärden är att lägga till en vecka
        if (!weekObj) {
          // Skapa en ny vecka om den inte finns
          weekObj = { week: week, pass: [pass] };
          user.weeks.push(weekObj);
          
          // Spara tillbaka den uppdaterade datan till filen
          await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

          return new Response(
            JSON.stringify({ message: "Vecka och pass tillagda framgångsrikt." }),
            { status: 200 }
          );
        } else {
          // Om veckan redan finns, lägg bara till passet om det inte redan finns
          if (!weekObj.pass.includes(pass)) {
            weekObj.pass.push(pass);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
            return new Response(
              JSON.stringify({ message: "Pass tillagt framgångsrikt." }),
              { status: 200 }
            );
          } else {
            return new Response(
              JSON.stringify({ message: "Passet finns redan för den här veckan." }),
              { status: 400 }
            );
          }
        }
      } else {
        return new Response(
          JSON.stringify({ message: "Ogiltig åtgärd. Använd 'add' eller 'remove'." }),
          { status: 400 }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ message: "Användare hittades inte." }),
        { status: 404 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fel vid läsning eller uppdatering av filen." }),
      { status: 500 }
    );
  }
};

