export type VehicleType = "BIKE" | "CAR" | "SUV";

export type SlotName =
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "B1"
  | "B2"
  | "B3"
  | "B4"
  | "B5"
  | "C1"
  | "C2"
  | "C3"
  | "C4"
  | "C5";

export type VehicleDetails = {
  vehicleNumber: string;
  vehicleType: VehicleType;
};

export type SlotType = {
  slotName: SlotName;
  isOccupied: boolean;
  vehicleDetails?: VehicleDetails;
  charge?: number;
  entryTime?: Date;
  exitTime?: Date;
};

export type Slots = SlotType[];

// export type Slots = [
//   A1: SlotType,
//   A2: SlotType,
//   A3: SlotType,
//   A4: SlotType,
//   A5: SlotType,
//   B1: SlotType,
//   B2: SlotType,
//   B3: SlotType,
//   B4: SlotType,
//   B5: SlotType,
//   C1: SlotType,
//   C2: SlotType,
//   C3: SlotType,
//   C4: SlotType,
//   C5: SlotType,
// ];

// export enum VehicleType {
//   BIKE = "BIKE",
//   CAR = "CAR",
//   SUV = "SUV",
// }

// export enum SlotName {
//   A1 = "A1",
//   A2 = "A2",
//   A3 = "A3",
//   A4 = "A4",
//   A5 = "A5",
//   B1 = "B1",
//   B2 = "B2",
//   B3 = "B3",
//   B4 = "B4",
//   B5 = "B5",
//   C1 = "C1",
//   C2 = "C2",
//   C3 = "C3",
//   C4 = "C4",
//   C5 = "C5",
// }
