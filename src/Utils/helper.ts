import type { ActiveSlot, Slot, SlotHistory } from "../Types/slotType";
import { getStorageData } from "./storage";

export const activeSlotData: ActiveSlot[] =
  getStorageData("activeSlotData") || [];

export const slotData: Slot[] = Object.values(getStorageData("slotData"));

export const slotHistory: SlotHistory[] =
  getStorageData("slotHistoryData") || [];
