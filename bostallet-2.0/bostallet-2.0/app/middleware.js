import { NextResponse } from "next/server";

export const middleware = (req) => {
  console.log("Hej, jag är i middleware!");

  const admin = req.cookies.get("admin")?.value;
  const user = req.cookies.get("user")?.value;

  if (admin) {
    return NextResponse.redirect(new URL("/adminpanel", req.url));
  } else if (user) {
    return NextResponse.redirect(new URL("/schema", req.url));
  }

  // Fortsätt till sidan om ingen matchning
  return NextResponse.next();
};

// Specificera vilka rutter middleware ska köras på
export const config = {
  matcher: ["/", "/adminpanel","/schema"], // Middleware körs bara för root-sidan
};
