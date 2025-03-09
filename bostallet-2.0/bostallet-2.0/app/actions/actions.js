import { redirect } from "next/navigation";


export const signIn = async (state, formData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }), // Skicka e-postadressen
    });

    const data = await res.json();

    if (res.ok) {
redirect("/kalender");
      }
  } catch (error) {
    // setMessage("Ett fel inträffade, försök igen senare.");
    console.error("Error:", error);
  }
};
