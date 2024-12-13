
import fs from 'fs/promises'; 

export const GET = async (req) => {
 
   try {
     // Läs JSON-filen
     const filePath = process.cwd() + '/data/data.json';
     const jsonData = await fs.readFile(filePath, 'utf-8');
 
     const data = JSON.parse(jsonData);
 
     if (data) {
       return new Response(
         JSON.stringify(data ),
         { status: 200 }
       );
     } else {
       return new Response(
         JSON.stringify({ message: 'Data hittades inte!' }),
         { status: 404 }
       );
     }
   } catch (error) {
     return new Response(
       JSON.stringify({ error: 'Fel vid läsning av filen.' }),
       { status: 500 }
     );
   }
 };

export const POST = async (req) => {
  const { email } = await req.json();

  try {
    // Läs JSON-filen
    const filePath = process.cwd() + '/public/data/data.json';
    const jsonData = await fs.readFile(filePath, 'utf-8');

    const data = JSON.parse(jsonData);
    const emailExists = data.some((item) => item.email === email);

    if (emailExists) {
      return new Response(
        JSON.stringify({ message: 'E-postadressen finns i filen!' }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'E-postadressen hittades inte.' }),
        { status: 404 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Fel vid läsning av filen.' }),
      { status: 500 }
    );
  }
};