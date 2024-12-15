import { getISOWeek } from "date-fns";
const childrenHolidayWeeks = () => {
  function calculateEaster(year) {
    const f = Math.floor,
      G = year % 19,
      C = f(year / 100),
      H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
      I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
      J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
      L = I - J,
      month = 3 + f((L + 40) / 44),
      day = L + 28 - 31 * f(month / 4);
    return new Date(year, month - 1, day); // Returnerar påskdagen
  }

  function calculateMidsummer(year) {
    const june = new Date(year, 5, 20); // Startar från 20 juni
    const day = june.getDay();
    const offset = day === 5 ? 0 : (5 - day + 7) % 7; // Hitta första fredag
    return new Date(year, 5, 20 + offset); // Midsommarafton
  }

  function getChildrenHolidayWeeks(year) {
    const holidays = [];

    // Fasta högtider
    const fixedHolidays = [
      { name: "Nyårsveckan", date: new Date(year, 11, 31) }, // 31 december
      { name: "Luciaveckan", date: new Date(year, 11, 13) }, // 13 december
      { name: "Julveckan", date: new Date(year, 11, 24) }, // 24 december
      { name: "Halloweenveckan", date: new Date(year, 9, 31) }, // 31 oktober
    ];

    fixedHolidays.forEach((holiday) => {
      holidays.push({
        holiday: holiday.name,
        fact: { year: year, week: getISOWeek(holiday.date) },
      });
    });

    // Rörliga högtider
    const easter = calculateEaster(year);
    holidays.push({
      holiday: "Påskveckan",
      fact: { year: year, week: getISOWeek(easter) },
    });

    const midsummer = calculateMidsummer(year);
    holidays.push({
      holiday: "Midsommarveckan",
      fact: { year: year, week: getISOWeek(midsummer) },
    });

    // Returnera lista
    return holidays;
  }

  // Använd funktionen
  const year = new Date().getFullYear();
  const childrenHolidays = getChildrenHolidayWeeks(year);
  return childrenHolidays;
};

export default childrenHolidayWeeks;
