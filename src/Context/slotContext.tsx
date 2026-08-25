import { createContext, useState, type ReactNode } from "react";
import type { ActiveSlot, Slot, SlotHistory } from "../Types/slotType";
import { activeSlotData, slotData, slotHistory } from "../Utils/helper";
import { setStorageData } from "../Utils/storage";

type ContextType = {
  slots: Slot[];
  activeSlots: ActiveSlot[] | [];
  slotHistoryData: SlotHistory[] | [];
  bookSlot: (value: ActiveSlot) => void;
  releaseSlot: (value: ActiveSlot, data: SlotHistory) => void;
};

export const SlotContext = createContext<ContextType | undefined>(undefined);

type SlotProviderProps = {
  children: ReactNode;
};

export function SlotProvider({ children }: SlotProviderProps) {
  const [slots, _setSlots] = useState<Slot[]>(slotData);
  const [activeSlots, setActiveSlots] = useState<ActiveSlot[]>(activeSlotData);
  const [slotHistoryData, setSlotHistoryData] =
    useState<SlotHistory[]>(slotHistory);

  const bookSlot = (value: ActiveSlot) => {
    const data = [...activeSlots, value];
    setActiveSlots(data);
    setStorageData("activeSlotData", data);
  };

  const releaseSlot = (value: ActiveSlot, data: SlotHistory) => {
    const updatedSlotData = activeSlots.filter(
      (slot: ActiveSlot) => slot.slotName !== value.slotName,
    );
    setActiveSlots(updatedSlotData);
    setStorageData("activeSlotData", updatedSlotData);

    const updatedSlotHistory = [data, ...slotHistoryData];
    setSlotHistoryData(updatedSlotHistory);
    setStorageData("slotHistoryData", updatedSlotHistory);
  };

  return (
    <SlotContext.Provider
      value={{ activeSlots, bookSlot, slots, releaseSlot, slotHistoryData }}
    >
      {children}
    </SlotContext.Provider>
  );
}
