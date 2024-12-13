"use client";
import { IoIosPersonAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

import React, { useEffect, useState } from "react";
import { getISOWeek } from "date-fns";

const Schema = () => {
  const [schema, setSchema] = useState([]);
  const currentWeek = getISOWeek(new Date());

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/checkEmail/");
      const data = await res.json();
      setSchema(data);
      console.log(data);
    };
    getData();
  }, []);
  const user = "Sara Pellnor";

  // Funktion för att generera veckor och rader
  const generateRows = () => {
    const rows = [];
    for (let i = 0; i < 30; i++) {
      const weekNumber = ((currentWeek + i - 1) % 52) + 1;

      // Antal personer för varje pass
      let pass1Count = 0;
      let pass2Count = 0;

      rows.push(
        <tr className=" text-white" key={i}>
          <td
            className=" rounded-l-lg text-center align-middle text-white font-bold odd:bg-purple_2"
            key={weekNumber}
          >
            {weekNumber}
          </td>
          <td className=" gradiantBg text-center align-middle p-2">
            {schema.map((element, i) =>
              element.weeks.map((week, index) => {
                if (week.week == weekNumber && week.pass.includes(1)) {
                  pass1Count++; // Räkna antalet personer i pass 1
                  return (
                    <p
                      className="p-1 border-b-2 border-yellow_1"
                      key={`${i}-${index}`}
                    >
                      {element.name}
                    </p>
                  );
                }
                return null;
              })
           
              
             )}
             { pass1Count < 4 && <div className="relative h-12 w-full">
              <IoIosPersonAdd className="text-green-400 text-5xl absolute -right-2 -bottom-2" /></div>}
          </td>
          <td className=" gradiantBg text-center align-middle p-2">
            {schema.map((element, i) =>
              element.weeks.map((week, index) => {
                if (week.week == weekNumber && week.pass.includes(2)) {
                  pass2Count++; // Räkna antalet personer i pass 2
                  return (
                    <p
                      className=" p-1 border-b-2 border-yellow_1"
                      key={`${i}-${index}`}
                    >
                      {element.name}
                    </p>
                  );
                }
                return null;
              })
            )}
          </td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className="">
      <table
        className=" border-spacing-x-4 border-spacing-y-4 bord border-separate"
        border="1"
      >
        <thead className=" bg-purple_1 text-white">
          <tr>
            <th className=" rounded-t-lg w-20  px-5">Vecka</th>
            <th className="rounded-t-lg md:w-[30vw] px-5">
              <p>Pass 1</p>
              <p>18.00-20.30</p>
            </th>
            <th className="rounded-t-lg md:w-[30vw] px-5">
              <p>Pass 2</p>
              <p>20.30-23.00</p>
            </th>
          </tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </table>
    </div>
  );
};

export default Schema;
