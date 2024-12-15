"use client";
import { IoIosPersonAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { getISOWeek, getWeekYear } from "date-fns";
import Loading from "../Loading/Loading";
import childrenHolidayWeeks from "@/app/utils/getHolidaysWeek";

const Schema = ({user}) => {
  const [schema, setSchema] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [hollidays, setHollidays] = useState([]);
console.log(user);

  const handleUser = async (week, pass, action) => {
    try {
      const res = await fetch("/api/schema/", {
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
      console.log(data);
      setMessage(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Hämta schemat från API
  useEffect(() => {
    setHollidays(childrenHolidayWeeks);

    setCurrentWeek(getISOWeek(new Date()));
    setCurrentYear(getWeekYear(new Date()));

    const fetchData = async () => {
      try {
        const res = await fetch("/api/schema/");
        const data = await res.json();
        setSchema(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [message]);

  // Rendera en cell för ett specifikt pass
  const renderPassCell = (weekNumber, passNumber) => {
    let passCount = 0;
    let userIn = false;

    const participants = schema.flatMap((element) => {
      return element.weeks
        .filter(
          (week) => week.week === weekNumber && week.pass.includes(passNumber)
        )
        .map(() => {
          if (element.name === user) userIn = true;
          passCount++;
          return element.name;
        });
    });
    return (
      <td className="relative rounded-xl pb-[50px] text-center align-middle p-2">
        {participants.map((name, index) => (
          <p
            className={`p-1 border-b-2 border-yellow_1 ${
              name === user ? "text-green-400" : ""
            }`}
            key={index}
          >
            {name}
          </p>
        ))}
        {passCount < 4 || userIn ? (
          <div
            onClick={() =>
              handleUser(weekNumber, passNumber, userIn ? "remove" : "add")
            }
            className="cursor-pointer flex justify-end items-center absolute bottom-0 right-0 h-12 w-full"
          >
            {userIn ? (
              <>
                <p className="text-red-400 sm:text-[20px] text-[15px]">
                  Ta bort
                </p>
                <TiDelete
                  title="Klicka här för att ta bort dig ifrån passet"
                  className="text-red-400 text-5xl"
                />
              </>
            ) : (
              passCount < 4 && (
                <>
                  <p className="text-green-400 sm:text-[20px] text-[15px]">
                    Lägg till
                  </p>
                  <IoIosPersonAdd
                    title="Klicka här för att lägga till dig på passet"
                    className="text-green-400 text-5xl"
                  />
                </>
              )
            )}
          </div>
        ) : (
          <div className="flex justify-end items-center absolute bottom-0 right-0 h-12 w-full">
            <p className="self-center m-auto text-green-400 font-bold">FULLT</p>
          </div>
        )}
      </td>
    );
  };

  // Generera rader för tabellen
  const generateRows = () => {
    return Array.from({ length: 30 }, (_, i) => {
      const weekNumber = ((currentWeek + i - 1) % 52) + 1;

      return (
        <>
          {weekNumber == 1 && (
            <th
              colSpan="3"
              className="bg-purple_2 p-1 rounded-lg text-center text-white text-2xl"
            >
              {currentYear + 1}
            </th>
          )}

          <tr
            className="text-white text-xl bg-black even:bg-opacity-70"
            key={weekNumber}
          >
            <td className="rounded-l-lg text-center align-middle text-black text-3xl font-bold bg-white">
              {hollidays.some(
                (item) =>
                  item.fact.week == weekNumber && item.fact.year == currentYear
              ) ? (
                hollidays
                  .filter(
                    (item) =>
                      item.fact.week == weekNumber &&
                      item.fact.year == currentYear
                  )
                  .map((item, index) => (
                    <div key={index}>
                      <p>{weekNumber}</p>
                      <p className="hidden md:block">{item.holiday}</p>
                    </div>
                  ))
              ) : (
                <p>{weekNumber}</p>
              )}
            </td>

            {renderPassCell(weekNumber, 1)}
            {renderPassCell(weekNumber, 2)}
          </tr>
        </>
      );
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className=" gradiantBg w-full flex justify-center">
      <table className="max-w-[700px] border-none border-spacing-x-4 border-spacing-y-4 border border-separate">
        <thead className="bg-yellow_1 font-bold text-black">
          <tr>
            <th className="rounded-t-lg w-20 px-5">VECKA</th>
            <th className="rounded-t-lg md:w-[30vw] px-5">
              <p>PASS 1</p>
              <p>18.00-20.30</p>
            </th>
            <th className="rounded-t-lg md:w-[30vw] px-5">
              <p>PASS 2</p>
              <p>20.30-23.00</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <th
            colSpan="3"
            className="bg-purple_2 p-1 rounded-lg text-center text-white text-2xl"
          >
            {currentYear}
          </th>
          {generateRows()}
        </tbody>
      </table>
    </div>
  );
};

export default Schema;
