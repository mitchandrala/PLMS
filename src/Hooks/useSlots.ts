import { useContext } from "react";
import { SlotContext } from "../Context/slotContext";

export const useSlots = () => {
  const context = useContext(SlotContext);

  if (!context) {
    throw new Error("Context must be used within a provider.");
  }

  return context;
};
