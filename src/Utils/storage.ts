import type { ActiveSlot, SlotHistory, Slots } from "../Types/slotType";

type Key = "slotData" | "activeSlotData" | "slotHistoryData";
type Value = ActiveSlot[] | SlotHistory[] | Slots;

export const getStorageData = (key: Key) => {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export const setStorageData = (key: Key, value: Value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.log(error);
  }
};
