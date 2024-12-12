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
  const user = "Sara Pellnor"


  // Funktion för att generera veckor och rader
  const generateRows = () => {
    const rows = [];
    for (let i = 0; i < 30; i++) {
      const weekNumber = ((currentWeek + i - 1) % 52) + 1;

      // Antal personer för varje pass
      let pass1Count = 0;
      let pass2Count = 0;

      rows.push(
        <tr className=" even:bg-white odd:text-black border-2 border-purple_2" key={i}>
          <td
            className=" text-white h-12 font-bold pl-8 border-2 border-purple_1 border-l-0 bg-purple_2"
            key={weekNumber}
          >
            {weekNumber}
          </td>
          <td className=" relative border-2 border-purple_1 ">
            {schema.map((element, i) =>
              element.weeks.map((week, index) => {
                if (week.week == weekNumber && week.pass.includes(1)) {
                  pass1Count++; // Räkna antalet personer i pass 1
                  return (
                    <p
                      className=" pl-1 flex items-center gap-2"
                      key={`${i}-${index}`}
                    >
                      {element.name}  {element.name == user && <TiDelete className="text-red-700 text-xl" />}
                    </p> 
                   
                  );
                }
                return null;
              })
            )}
            {/* Visa knapp om färre än 4 */}
            {pass1Count < 4 && (
             <IoIosPersonAdd className="text-lime-500 text-4xl absolute bottom-0 right-0 " />
            )}
          </td>
          <td className=" relative border-2 border-purple_1">
            {schema.map((element, i) =>
              element.weeks.map((week, index) => {
                if (week.week == weekNumber && week.pass.includes(2)) {
                  pass2Count++; // Räkna antalet personer i pass 2
                  return (
                    <p
                       className="pl-1 flex items-center gap-2 "
                      key={`${i}-${index}`}
                    >
                      {element.name} {element.name == user && <TiDelete className="text-red-700 text-xl" />}
                    </p>
                  );
                }
                return null;
              })
            )}
            {/* Visa knapp om färre än 4 */}
            {pass2Count < 4 && (
             <IoIosPersonAdd className="text-lime-500 text-4xl absolute bottom-0 right-0 " />
            )}
          </td>
        </tr>
      );
    }
    return rows;
  };

  return (
    
      <div className="">
        <table className="" border="1">
          <thead className=" bg-purple_1 border-2 border-purple_2 text-white">
            <tr>
              <th className=" w-20 border-r-2 border-purple_2 px-5">Vecka</th>
              <th className=" md:w-[30vw] border-r-2 border-purple_2 px-5">
                <p>Pass 1</p>
                <p>18.00-20.30</p>
              </th>
              <th className="md:w-[30vw] border-r-2 border-purple_2 px-5">
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
