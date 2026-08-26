import { initialSlotData } from "../Data/data";
import type { ActiveSlot, Slot, SlotHistory } from "../Types/slotType";
import { getStorageData, setStorageData } from "./storage";

export const activeSlotData: ActiveSlot[] =
  getStorageData("activeSlotData") || [];

const initialDataSave = (): Slot[] => {
  const initialData: Slot[] = getStorageData("slotData");
  if (!initialData) {
    setStorageData("slotData", initialSlotData);
    return Object.values(getStorageData("slotData"));
  }
  return Object.values(initialData);
};

export const slotData: Slot[] = initialDataSave();

export const slotHistory: SlotHistory[] =
  getStorageData("slotHistoryData") || [];
