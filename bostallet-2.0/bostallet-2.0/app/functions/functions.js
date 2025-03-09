export const checkUserStatus = async () => {
  try {
    const response = await fetch("/api/user");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Något gick fel vid user-anropet:", error);
    return false;
  }
};

export const handleLogIn = async (
  email,
  password,
  setMessage,
  setUser,
  setAdmin
) => {
  try {
    const res = await fetch("/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }), // Skicka e-postadressen
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message); // Visa framgångsmeddelande
      setUser(data.userName);
      setAdmin(data.admin);

      window.location.href = "/kalender";
    } else {
      setMessage(data.message); // Visa felmeddelande
    }
  } catch (error) {
    setMessage("Ett fel inträffade, försök igen senare.");
    console.error("Error:", error);
  }
};

export const handleUser = async (week, pass, action) => {
  try {
    const res = await fetch("/api/calendar/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user,
        week: week,
        pass: pass,
        action: action,
      }), // Skicka e-postadressen
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export async function createUser(formData) {
  const isAdmin = formData.get("isAdmin");
  const name = formData.get("name");
  const email = formData.get("email");
  const mobile = formData.get("mobile");

  const res = await fetch(`/api/adminpanel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      mobile: mobile,
      isAdmin: isAdmin,
    }),
  });

  if(res.status === 400) {
alert("Användaren finns redan! Du måste välja en annan epost-adress.");
return
  }

  if (!res.ok) {
    throw new Error("Fel vid skapande av användare");
  }
}

export const fetchData = async (setLoading, setUserData) => {
  try {
    const res = await fetch("/api/calendar/");
    const data = await res.json();
    setUserData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  setLoading(false);
};

export const handleSchema = async (setMessage, week, pass, action, user) => {
  try {
    const res = await fetch("/api/calendar/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user,
        week: week,
        pass: pass,
        action: action,
      }), // Skicka e-postadressen
    });

    const data = await res.json();
    setMessage(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const logOutUser = async (setUser) => {
  try {
    await fetch("/api/user", { method: "DELETE" });

    window.location.href = "/"; // Laddar om sidan och navigerar

    setUser(null);
  } catch (error) {
    console.error("Fel vid borttagning av cookie:", error);
  }
};

// jag behöver skicka med nya value för user!!!!!!
export const adminDeletePass = async (
  week,
  pass,
  user,
  name,
  mobile,
  email,
  isAdminCheckBox
) => {
  try {
    const res = await fetch("/api/adminpanel", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        week: week,
        pass: pass,
        name: name,
        mobile: mobile,
        email: email,
        isAdminCheckBox: isAdminCheckBox,
      }),
    });

    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteUser = async (email) => {
  try {
    const res = await fetch("/api/adminpanel", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
