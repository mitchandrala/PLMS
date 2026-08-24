import type { ActiveSlot, FormData, Slot } from "../Types/slotType";
import { getStorageData, setStorageData } from "./storage";

export const activeSlotData: ActiveSlot[] =
  getStorageData("activeSlotData") || [];
export const slotData: Slot[] = Object.values(getStorageData("slotData"));

// export const availableSlotNameByVehicleType = (vehicleType: VehicleType) => {
//   let newSlotName = slotData;
//   if (activeSlotData) {
//     const activeSlotName: SlotName[] = activeSlotData.map(
//       (slotData: ActiveSlot) => slotData.slotName,
//     );

//     newSlotName = slotData.filter(
//       (val: Slot) => !activeSlotName.includes(val.slotName),
//     );
//   }

//   return newSlotName
//     ?.filter((slot: Slot) => slot.supportVehicleType.includes(vehicleType))
//     .map((slot: Slot) => slot.slotName);
// };

// export const isVehicleOccupied = (vehicleNumber: string) => {
//   return activeSlotData.find(
//     (val: ActiveSlot) => val.vehicleNumber === vehicleNumber,
//   );
// };

// export const saveSlotForm = (value: FormData) => {
//   try {
//     const data = [...activeSlotData, value];
//     const res = setStorageData("activeSlotData", data);
//     if (!res) return;
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };
