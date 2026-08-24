import { createContext, useState, type ReactNode } from "react";
import type { ActiveSlot, Slot } from "../Types/slotType";
import { activeSlotData, slotData } from "../Utils/helper";
import { setStorageData } from "../Utils/storage";

type ContextType = {
  slots: Slot[];
  activeSlots: ActiveSlot[] | [];
  bookSlot: (value: ActiveSlot) => void;
};

export const SlotContext = createContext<ContextType | undefined>(undefined);

type SlotProviderProps = {
  children: ReactNode;
};

export function SlotProvider({ children }: SlotProviderProps) {
  const [slots, setSlots] = useState<Slot[]>(slotData);
  const [activeSlots, setActiveSlots] = useState<ActiveSlot[]>(activeSlotData);

  const bookSlot = (value: ActiveSlot) => {
    const data = [...activeSlots, value];
    setActiveSlots(data);
    console.log(data);
    setStorageData("activeSlotData", data);
  };

  return (
    <SlotContext.Provider value={{ activeSlots, bookSlot, slots }}>
      {children}
    </SlotContext.Provider>
  );
}
