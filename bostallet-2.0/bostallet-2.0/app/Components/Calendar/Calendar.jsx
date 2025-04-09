"use client";
import { IoIosPersonAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import React, { useEffect } from "react";
import { getISOWeek, getWeekYear } from "date-fns";
import Loading from "../Loading/Loading";
import childrenHolidayWeeks from "../../utils/getHolidaysWeek";
import { useUserContext } from "../../context/UserContext";
import { handleSchema, fetchData, removeOldWeeks } from "../../functions/functions";
import Header from "../Header/Header";
const Calendar = () => {
  const {
    user,
    userData,
    setUserData,
    loading,
    setLoading,
    message,
    setMessage,
    currentWeek,
    setCurrentWeek,
    currentYear,
    setCurrentYear,
    hollidays,
    setHollidays,
  } = useUserContext();

  // Hämta schemat från API
  useEffect(() => {
    removeOldWeeks(getISOWeek(new Date()))
    setHollidays(childrenHolidayWeeks);
    setCurrentWeek(getISOWeek(new Date()));
    setCurrentYear(getWeekYear(new Date()));
    fetchData(setLoading, setUserData);
  }, [message]);

  // Rendera en cell för ett specifikt pass
  const renderPassCell = (weekNumber, passNumber) => {
    let passCount = 0;
    let userIn = false;

    const participants = userData.flatMap((element) => {
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
      <div className={`${passCount>3 && "opacity-50"} pb-5 px-5 py-3`}>
        <div className="bg-purple_2 w-full px-2 flex justify-between">
          {passNumber == 1 ? (
            <>
              <p>PASS 1</p>
              <p>18.00-20.30</p>
            </>
          ) : (
            <>
              <p>PASS 2</p>
              <p>20.30-23.00</p>
            </>
          )}
        </div>
        {!userIn && passCount < 4 && (
          <div
            onClick={() =>
              handleSchema(
                setMessage,
                weekNumber,
                passNumber,
                userIn ? "remove" : "add",
                user
              )
            }
            className="cursor-pointer flex items-center h-12 p-1 border-b-2 border-yellow_1"
          >
            <p className="text-green-400 sm:text-[20px] text-[15px]">
              Lägg till mig
            </p>
            <IoIosPersonAdd
              title="Klicka här för att lägga till dig på passet"
              className="text-green-400 text-3xl"
            />
          </div>
        )}
        {participants.map((name, index) => (
          <div
            className={`px-2 flex items-center p-1 border-b-2 border-yellow_1 ${
              name === user ? "text-green-400" : ""
            }`}
            key={index}
          >
            <p className="w-2/3"> {name}</p>
            {name == user && (
              <div
                onClick={() =>
                  handleSchema(
                    setMessage,
                    weekNumber,
                    passNumber,
                    userIn ? "remove" : "add",
                    user
                  )
                }
                className="cursor-pointer flex justify-end items-center h-12 w-full"
              >
                <p className="text-red-400 sm:text-[20px] text-[15px]">
                  Ta bort mig
                </p>
                <TiDelete
                  title="Klicka här för att ta bort dig ifrån passet"
                  className="text-red-400 text-3xl"
                />
              </div>
            )}
          </div>
        ))}
        {passCount > 3 && (
          <div className="flex justify-end items-center h-12 w-full">
            <p className="self-center m-auto text-yellow-400 font-bold">
              FULLT
            </p>
          </div>
        )}
      </div>
    );
  };

  // Generera rader för tabellen
  const generateRows = () => {
    return Array.from({ length: 26 }, (_, i) => {
      const weekNumber = ((currentWeek + i - 1) % 52) + 1;
      return (
        <div className="mb-3" key={weekNumber}>
          {weekNumber == 1 && i > 0 && (
            <p className="gradiantBg p-4 text-white text-2xl">
              {currentYear + 1}
            </p>
          )}

          <div
            className="text-white text-xl bg-black"
            key={weekNumber}
          >
            <div className="text-2xl font-bold">
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
                    <div className="p-3" key={index}>
                      <p> Fredag V. {weekNumber}</p>
                      <p className="text-green-400 font-thin">{item.holiday}</p>
                    </div>
                  ))
              ) : (
                <p className="p-3">Fredag V. {weekNumber}</p>
              )}
            </div>

            {renderPassCell(weekNumber, 1)}
            {renderPassCell(weekNumber, 2)}
          </div>
        </div>
      );
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full max-w-[800px] h-full mx-5 flex flex-col">
      <Header />
     {currentWeek != 52 && <p className="gradiantBg p-4 text-white text-2xl">
        {currentYear}
      </p>}
      {generateRows()}
    </div>
  );
};

export default Calendar;
