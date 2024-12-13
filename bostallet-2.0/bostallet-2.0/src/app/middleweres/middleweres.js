import dotenv from "dotenv";
dotenv.config();

import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const verifyPassword = (role, password) => {
  if (role === "user") {
    return password === process.env.USER_PASSWORD;
  } else if (role === "admin") {
    return password === process.env.ADMIN_PASSWORD;
  }
  return false;
};

const auth = (role) => {
  if (role === "admin") {
    return true;
  }
  return false;
};

const checkCookie =(req) => {
    const token = req.cookies.get('authToken'); // Hämta JWT-token från cookies
  
    if (!token) {
      return NextResponse.redirect('/login'); // Om ingen token finns, omdirigera till login
    }
  
    try {
      // Verifiera token och kontrollera om den är giltig
      jwt.verify(token, process.env.JWT_SECRET); // Kontrollera om token är giltig med JWT_SECRET
      return NextResponse.next(); // Om token är giltig, fortsätt till nästa steg (skyddad resurs)
    } catch (error) {
      return NextResponse.redirect('/login'); // Om token är ogiltig, omdirigera till login
    }
  }

export default { verifyPassword, auth, checkCookie };



