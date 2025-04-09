"use client";
import { LuUndo2 } from "react-icons/lu";

import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { FaUserEdit, FaRegTrashAlt } from "react-icons/fa";
import { useUserContext } from "../../context/UserContext";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import NewUser from "../NewUser/NewUser";
import {
  adminDeletePass,
  checkUserStatus,
  deleteUser,
} from "../../functions/functions";
import { redirect } from "next/navigation";
import Header from "../Header/Header";
const AdminPanel = () => {
  const { setAdmin, loading, setLoading } = useUserContext();
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState("");
  const [isAdminCheckBox, setIsAdminCheckBox] = useState(false);
  const [isAdminCheckBox2, setIsAdminCheckBox2] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/adminpanel/");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const fetchUser = async () => {
    const loggedInUser = await checkUserStatus(); // Vänta på att Promiset löser sig

    if (!loggedInUser.admin) {
      setAdmin(null); // Sätt det upplösta värdet i state
      redirect(new URL("/", window.location.origin)); // Redirect
    }
  };

  // jag behöver skicka med nya value för user
  const deletePass = (week, pass, user) => {
    const confirmed = confirm(
      `Vill du radera medarbetarens pass ${pass} vecka ${week}? Det går inte att ångra!`
    );
    if (confirmed) {
      // Användaren klickade på "Ok"
      adminDeletePass(week, pass, user, name, mobile, email, isAdminCheckBox2);
      window.location.reload();
    } else {
      // Användaren klickade på "Avbryt"
      return;
    }
  };
  const handleEdit = (admin, name, mobile, email) => {
    setName(name);
    setMobile(mobile);
    setEmail(email);
    setEdit(name);
    setIsAdminCheckBox2(admin);

    if (edit.length > 0) {
      const confirmed = confirm("Vill du spara påbörjad först?");
      if (confirmed) {
        // Användaren klickade på "Ok"
        handleSave();
      } else {
        // Användaren klickade på "Avbryt"
        return;
      }
      setEdit(name);
    }
  };

  const handleSave = async (user, pass, week) => {
    setEdit("");
    adminDeletePass(week, pass, user, name, mobile, email, isAdminCheckBox2);
    window.location.reload();
  };

  const handleDelete = (email) => {
    const confirmed = confirm("Vill du radera medarbetaren?");
    if (confirmed) {
      deleteUser(email);
      window.location.reload();    } else {
      return;
    }
  
  };

  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>  <Header />
    <div className="flex flex-col justify-center gap-3 text-xl mt-16">
      <div className=" text-center pt-2 font-bold text-2xl">
        Lägg till ny medarbetare
      </div>
      <NewUser setIsAdmin={setIsAdminCheckBox} isAdmin={isAdminCheckBox} />
      <div className=" text-center pt-2 font-bold text-2xl">Medarbetare</div>

      {users.map((item, i) =>
        edit == item.name ? (
          <div key={i} className="flex flex-col bg-white">
            <div className=" font-bold flex justify-between bg-purple_1 text-white p-3">
              <input
                className="w-[60%] bg-purple_1"
                placeholder={item.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <div className="flex gap-2 items-center justify-end">
                <input
                  className="w-[50%] bg-purple_1"
                  placeholder={item.mobile}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                ></input>
                <button
                  onClick={() => handleSave(item, false, false)}
                  className=" px-3 py-1 rounded-md bg-green-500"
                >
                  Spara
                </button>
                <FaRegTrashAlt
                  onClick={() => handleDelete(item.email)}
                  className="cursor-pointer text-red-500"
                />
                <LuUndo2 className="text-2xl cursor-pointer" onClick={() =>setEdit(false)} />
              </div>
            </div>
            <div className="flex justify-between px-3 py-2">
              <p className="font-bold">E-post:</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={item.email}
              ></input>
            </div>
            <div className="flex justify-between px-3 py-2">
              <p className="font-bold">Admin:</p>
              <p>
                {isAdminCheckBox2 ? (
                  <MdOutlineCheckBox
                    onClick={() => setIsAdminCheckBox2(false)}
                    className="cursor-pointer text-2xl text-green-500"
                  />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    onClick={() => setIsAdminCheckBox2(true)}
                    className="text-2xl cursor-pointer"
                  />
                )}
              </p>
            </div>
            <p className="font-bold pl-3">Veckor:</p>
            <div className="flex flex-col gap-3 justify-end px-3 py-2">
              {item.weeks.map((week, i) => (
                <div
                  key={i}
                  className=" flex flex-col gap-1 p-2 bg-black bg-opacity-80 text-white "
                >
                  <p>V. {week.week}</p>
                  {week.pass.find((item) => item == 1) && (
                    <div
                      onClick={() => deletePass(week.week, 1, item)}
                      className="cursor-pointer p-1 bg-red-500 flex justify-between items-center px-3"
                    >
                     <p> Pass 1 </p>
                     <FaRegTrashAlt />


                    </div>
                    
                  )}
                  {week.pass.find((item) => item == 2) && (
                    <div
                    onClick={() => deletePass(week.week, 2, item)}
                    className="cursor-pointer p-1 bg-red-500 flex justify-between items-center px-3"
                  >
                   <p> Pass 2 </p>
                   <FaRegTrashAlt />


                  </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div key={i} className="flex flex-col bg-white">
            <div className=" font-bold flex justify-between bg-purple_1 text-white p-3">
              <p className="">{item.name}</p>
              <div className="flex gap-4 items-center">
                <p>{item.mobile}</p>
                <FaUserEdit 
                  onClick={() =>
                    handleEdit(item.admin, item.name, item.mobile, item.email)
                  }
                  className="text-2xl cursor-pointer"
                />
                <FaRegTrashAlt
                  onClick={() => handleDelete(item.email)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-between px-3 py-2">
              <p className="font-bold">E-post:</p> <p>{item.email}</p>
            </div>
            <div className="flex justify-between px-3 py-2">
              <p className="font-bold">Admin:</p>{" "}
              <p>
                {item.admin ? (
                  <MdOutlineCheckBox className="text-2xl text-green-500" />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank className="text-2xl" />
                )}
              </p>
            </div>
            <p className="font-bold pl-3">Veckor:</p>
            <div className="flex flex-col gap-3 px-3 py-2">
              {item.weeks.map((week, i) => (
                <div
                  key={i}
                  className=" flex flex-col gap-1 p-2 bg-black text-white "
                >
                  <p>V. {week.week}</p>
                  {week.pass.find((item) => item == 1) && (
                    <p className="p-1 bg-green-500">Pass 1</p>
                  )}
                  {week.pass.find((item) => item == 2) && (
                    <p className="p-1 bg-green-500">Pass 2</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
    </>
  );
};

export default AdminPanel;
