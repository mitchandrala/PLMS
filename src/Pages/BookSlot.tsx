import { Button, Checkbox, MaskInput, Select } from "@mantine/core";
import { useState } from "react";
import { type SlotType, type Slots } from "../Types/slotType";
import { DateTimePicker } from "@mantine/dates";

const data: Slots = [
  {
    slotName: "A1",
    isOccupied: false,
  },
  {
    slotName: "A2",
    isOccupied: true,
  },
  {
    slotName: "A3",
    isOccupied: true,
  },
  {
    slotName: "A4",
    isOccupied: false,
  },
  {
    slotName: "A5",
    isOccupied: false,
  },
  {
    slotName: "B1",
    isOccupied: false,
  },
  {
    slotName: "B2",
    isOccupied: false,
  },
  {
    slotName: "B3",
    isOccupied: true,
  },
  {
    slotName: "B4",
    isOccupied: true,
  },
  {
    slotName: "B5",
    isOccupied: true,
  },
  {
    slotName: "C1",
    isOccupied: false,
  },
  {
    slotName: "C2",
    isOccupied: true,
  },
  {
    slotName: "C3",
    isOccupied: true,
  },
  {
    slotName: "C4",
    isOccupied: true,
  },
  {
    slotName: "C5",
    isOccupied: false,
  },
];

const BookSlot = () => {
  // const [formData, setFormData] = useState({});
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string | null>("");
  const [checked, setChecked] = useState<boolean>(true);
  const [slotNumber, setSlotNumber] = useState<string | null>("");
  const [entryTime, setEntrytTime] = useState<string | null>("");

  const selectSlotData = data
    .filter((val: SlotType) => {
      if (val.isOccupied === false) {
        return true;
      }
    })
    .map((val: SlotType) => val.slotName);

  console.log(selectSlotData);
  console.log(new Date());

  const date = new Date();
  console.log(date.getFullYear(), date.getDay());

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(vehicleNumber);
    console.log(vehicleType);
    console.log(checked);
    console.log(slotNumber);
    console.log(entryTime);
  };
  return (
    <div className="px-10 py-10">
      <h1 className="text-xl font-semibold mb-7">Book Slot</h1>
      <form onSubmit={onSubmit} className="w-50 flex flex-col gap-5">
        <MaskInput
          required
          className="w-50"
          label="Vehicle No."
          mask="AA 99 AA 9999"
          placeholder="__ __ __ ____"
          onChangeRaw={(val) => setVehicleNumber(val)}
        />
        <Select
          value={vehicleType}
          required
          label="Vehicle Type"
          placeholder="Vehicle Type"
          data={["BIKE", "CAR", "SUV"]}
          onChange={(val) => setVehicleType(val)}
        />
        <Checkbox
          label="Automatic Slot Assign"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked === false && (
          <Select
            required
            label="Slot No."
            placeholder="Select Slot No."
            data={selectSlotData}
            onChange={(val) => setSlotNumber(val)}
          />
        )}

        <DateTimePicker
          required
          className="w-50"
          label="Pick date and time"
          defaultValue={new Date()}
          onChange={(value) => setEntrytTime(value)}
        />

        <Button type="submit">Book Slot</Button>
      </form>
    </div>
  );
};

export default BookSlot;
