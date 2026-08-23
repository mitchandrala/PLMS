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

export type Slot = {
  slotName: SlotName;
  supportVehicleType: VehicleType[];
};

export type Slots = Record<SlotName, Slot>;

export type ActiveSlot = {
  slotName: SlotName;
  vehicleNumber: string;
  vehicleType: VehicleType;
  entryTime: string;
  exitTime?: string;
  charge?: number;
};

export type SlotHistory = Required<ActiveSlot>;

// type SlotA = "BIKE" | "CAR";
// type SlotB = "CAR" | "SUV";
// type SlotC = VehicleType;

// export type VehicleDetails<T> = {
//   vehicleNumber: string;
//   vehicleType: T;
// };

// export type SlotType<T, K> = {
//   slotName: K;
//   isOccupied: boolean;
//   supportVehicleTypesupportVehicleType: T[];
//   vehicleDetails?: VehicleDetails<T>;
//   charge?: number;
//   entryTime?: Date;
//   exitTime?: Date;
// };

// export type SlotTypeA = Extract<SlotName, "A1" | "A2" | "A3" | "A4" | "A5">;
// export type SlotTypeB = Extract<SlotName, "B1" | "B2" | "B3" | "B4" | "B5">;
// export type SlotTypeC = Extract<SlotName, "C1" | "C2" | "C3" | "C4" | "C5">;

// // export type Slots = SlotType[];

// export type SlotTypeAData = SlotType<SlotA, SlotTypeA>[];
// export type SlotTypeBData = SlotType<SlotB, SlotTypeB>[];
// export type SlotTypeCData = SlotType<SlotC, SlotTypeC>[];

// export type Slots = SlotTypeAData & SlotTypeBData & SlotTypeCData;

// export type InitialValue = {
//   slotName: SlotName | string;
//   vehicleNumber: string;
//   vehicleType: VehicleType | string;
//   isChecked: boolean;
//   entryTime: string;
// };

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
