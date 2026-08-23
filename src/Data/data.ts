import type { ActiveSlot, SlotHistory, Slots } from "../Types/slotType";

export const slotData: Slots = {
  A1: {
    slotName: "A1",
    supportVehicleType: ["BIKE", "CAR"],
  },
  A2: {
    slotName: "A2",
    supportVehicleType: ["BIKE", "CAR"],
  },
  A3: {
    slotName: "A3",
    supportVehicleType: ["BIKE", "CAR"],
  },
  A4: {
    slotName: "A4",
    supportVehicleType: ["BIKE", "CAR"],
  },
  A5: {
    slotName: "A5",
    supportVehicleType: ["BIKE", "CAR"],
  },
  B1: {
    slotName: "B1",
    supportVehicleType: ["CAR", "SUV"],
  },
  B2: {
    slotName: "B2",
    supportVehicleType: ["CAR", "SUV"],
  },
  B3: {
    slotName: "B3",
    supportVehicleType: ["CAR", "SUV"],
  },
  B4: {
    slotName: "B4",
    supportVehicleType: ["CAR", "SUV"],
  },
  B5: {
    slotName: "B5",
    supportVehicleType: ["CAR", "SUV"],
  },
  C1: {
    slotName: "C1",
    supportVehicleType: ["BIKE", "CAR", "SUV"],
  },
  C2: {
    slotName: "C2",
    supportVehicleType: ["BIKE", "CAR", "SUV"],
  },
  C3: {
    slotName: "C3",
    supportVehicleType: ["BIKE", "CAR", "SUV"],
  },
  C4: {
    slotName: "C4",
    supportVehicleType: ["BIKE", "CAR", "SUV"],
  },
  C5: {
    slotName: "C5",
    supportVehicleType: ["BIKE", "CAR", "SUV"],
  },
};

export const activeSlotData: ActiveSlot[] = [
  {
    slotName: "A2",
    vehicleNumber: "GJ13AB1234",
    vehicleType: "BIKE",
    entryTime: "11:00",
  },
  {
    slotName: "B4",
    vehicleNumber: "GJ11YU0009",
    vehicleType: "SUV",
    entryTime: "1:34",
  },
  {
    slotName: "C1",
    vehicleNumber: "GJ18GL5674",
    vehicleType: "CAR",
    entryTime: "8:06",
  },
];

export const slotHistory: SlotHistory[] = [
  {
    slotName: "A5",
    vehicleNumber: "GJ13AM1234",
    vehicleType: "CAR",
    entryTime: "9:00 8/23/26",
    exitTime: "11:00 8/23/26",
    charge: 40,
  },
];
