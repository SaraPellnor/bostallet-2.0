




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




// import jwt from 'jsonwebtoken';
// import { authenticateUser } from '../../../lib/auth'; // Funktion som autentiserar användaren mot databas

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     // Verifiera användarens autentisering (kan vara via databas)
//     const user = await authenticateUser(email, password);
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Skapa en JWT-token som är giltig i 30 minuter
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' });

//     // Skicka token som en cookie till klienten
//     res.setHeader('Set-Cookie', `authToken=${token}; HttpOnly; Path=/; Max-Age=1800; Secure; SameSite=Strict`);

//     return res.status(200).json({ message: 'Logged in successfully' });
//   }

//   // Om metoden inte är POST, returnera en 405
//   return res.status(405).json({ message: 'Method Not Allowed' });
// }
