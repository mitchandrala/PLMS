import type { VehicleType } from "../Types/slotType";

type EntryValueType = {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
};

export const entryTime = (value: string) => {
  const day = Number(value.slice(8, 10));
  const month = Number(value.slice(5, 7));
  const year = Number(value.slice(0, 4));
  const hour = Number(value.slice(11, 13));
  const min = Number(value.slice(14, 16));
  return { year, month, day, hour, min };
};

const findDayMonth = (val: number) => {
  if (val === 2) return 28;
  const months = [4, 6, 9, 11];
  if (months.includes(val)) return 30;
  return 31;
};

const findDayBtwMonth = (startMonth: number, endMonth: number) => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const finalEndMonth = endMonth - startMonth;
  const arr = months.splice(startMonth, finalEndMonth - 1);

  let totalDay = 0;
  arr.map((val) => {
    totalDay += findDayMonth(val);
  });
  return totalDay;
};

export const countMinute = (entryTime: EntryValueType, exitTime: Date) => {
  if (!entryTime || !exitTime) return;
  const isSameYear = entryTime.year === exitTime.getFullYear();
  const isSameMonth = entryTime.month === exitTime.getMonth() + 1;
  const isSameDay = entryTime.day === exitTime.getDate();

  // Same Day
  if (isSameYear && isSameMonth && isSameDay) {
    const hour = Number(exitTime.getHours()) - (entryTime.hour + 1);
    const min = Number(exitTime.getMinutes()) + (60 - entryTime.min);
    const totalMin = hour * 60 + min;
    return totalMin;
  }

  // Same Month
  if (isSameYear && isSameMonth && !isSameDay) {
    const pdayhour = 24 - (entryTime.hour + 1);
    const pdaymin = 60 - entryTime.min;

    const tdayhour = exitTime.getHours();
    const tdaymin = exitTime.getMinutes();

    const diffday = exitTime.getDate() - (entryTime.day + 1);
    const diffhour = diffday * 24;

    const hour = pdayhour + tdayhour + diffhour;
    const min = pdaymin + tdaymin;
    const totalMin = hour * 60 + min;
    return totalMin;
  }

  // Same Year
  if (isSameYear && !isSameMonth) {
    const entdayhour = 24 - (entryTime.hour + 1);
    const entdaymin = 60 - entryTime.min;
    const entdayno = findDayMonth(entryTime.month) - (entryTime.day + 1);

    const diffMonthDay = findDayBtwMonth(
      entryTime.month,
      exitTime.getMonth() + 1,
    );

    const extdayhour = exitTime.getHours();
    const extdaymin = exitTime.getMinutes();
    const extdayno = exitTime.getDate();

    const finalday = entdayno + diffMonthDay + extdayno;
    const finalhour = entdayhour + extdayhour;
    const finalmin = entdaymin + extdaymin;

    const totalMin = finalday * 24 * 60 + finalhour * 60 + finalmin;
    return totalMin;
  }
  return;
};

export const countCharges = (vehicleType: VehicleType, minutes: number) => {
  if (vehicleType === "BIKE") {
    if (minutes <= 120) {
      return minutes * 0.1666;
    } else {
      return minutes * 0.1666;
    }
  }

  if (vehicleType === "CAR") {
    if (minutes <= 120) {
      return minutes * 0.3333;
    } else {
      return minutes * 0.3333;
    }
  }

  if (vehicleType === "SUV") {
    if (minutes <= 120) {
      return minutes * 0.5;
    } else {
      return minutes * 0.5;
    }
  }
};
