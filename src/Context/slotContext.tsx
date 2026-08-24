import { createContext, useState, type ReactNode } from "react";
import type { ActiveSlot } from "../Types/slotType";
import { activeSlotData } from "../Utils/helper";

type ContextType = {
  activeSlots: ActiveSlot[] | [];
};

export const SlotContext = createContext<ContextType | undefined>(undefined);

type SlotProviderProps = {
  children: ReactNode;
};

export function SlotProvider({ children }: SlotProviderProps) {
  const [activeSlots, setActiveSlots] = useState<ActiveSlot[]>(activeSlotData);
  return (
    <SlotContext.Provider value={{ activeSlots }}>
      {children}
    </SlotContext.Provider>
  );
}
