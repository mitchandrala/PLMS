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

export interface ActiveSlot {
  slotName: SlotName;
  vehicleNumber: string;
  vehicleType: VehicleType;
  entryTime: string;
}

export interface SlotHistory extends ActiveSlot {
  exitTime: string;
  charge: number;
  duration: string;
}

export type FormData = {
  slotName: SlotName | null;
  vehicleNumber: string;
  vehicleType: VehicleType | null;
  isChecked?: boolean;
  entryTime: string;
};

export type TotalVehicle = Record<VehicleType, number>;

export type Status = "AVAILABLE" | "OCCUPIED";

export type ActiveSlotTable = {
  slotName: SlotName;
  slotStatus: Status;
} & Partial<Omit<ActiveSlot, "slotName">>;
