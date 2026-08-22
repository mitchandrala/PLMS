import { Button, Checkbox, Select, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import type { ActiveSlot, Slot, Slots, VehicleType } from "../Types/slotType";

// const data: Slots = [
//   {
//     slotName: "A1",
//     isOccupied: false,
//     support
//   },
//   {
//     slotName: "A2",
//     isOccupied: true,
//   },
//   {
//     slotName: "A3",
//     isOccupied: true,
//   },
//   {
//     slotName: "A4",
//     isOccupied: false,
//   },
//   {
//     slotName: "A5",
//     isOccupied: false,
//   },
//   {
//     slotName: "B1",
//     isOccupied: false,
//   },
//   {
//     slotName: "B2",
//     isOccupied: false,
//   },
//   {
//     slotName: "B3",
//     isOccupied: true,
//   },
//   {
//     slotName: "B4",
//     isOccupied: true,
//   },
//   {
//     slotName: "B5",
//     isOccupied: true,
//   },
//   {
//     slotName: "C1",
//     isOccupied: false,
//   },
//   {
//     slotName: "C2",
//     isOccupied: true,
//   },
//   {
//     slotName: "C3",
//     isOccupied: true,
//   },
//   {
//     slotName: "C4",
//     isOccupied: true,
//   },
//   {
//     slotName: "C5",
//     isOccupied: false,
//   },
// ];

// const dataA: SlotTypeAData[] = [
//   {
//     slotName: "A1",
//     isOccupied: true,

//   },
// ];

// const dataB: SlotTypeBData[] = [
//   {
//     slotName: "B1",
//     isOccupied: false,
//   },
// ];

// const dataC: SlotTypeCData[] = [
//   {
//     slotName: "C1",
//     isOccupied: true,
//   },
// ];

const initialData: Slots = {
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

const activeSlotData: ActiveSlot[] = [
  {
    slotName: "A1",
    vehicleNumber: "GJ01AB1234",
    vehicleType: "CAR",
    entryTime: "11:00",
  },
  {
    slotName: "A2",
    vehicleNumber: "GJ01AB1234",
    vehicleType: "CAR",
    entryTime: "11:00",
  },
  {
    slotName: "A4",
    vehicleNumber: "GJ01AB1234",
    vehicleType: "CAR",
    entryTime: "11:00",
  },
  {
    slotName: "A3",
    vehicleNumber: "GJ02NK8690",
    vehicleType: "BIKE",
    entryTime: "1:00",
  },
  {
    slotName: "A5",
    vehicleNumber: "GJ02NK8690",
    vehicleType: "BIKE",
    entryTime: "1:00",
  },
  {
    slotName: "B1",
    vehicleNumber: "GJ13ER9045",
    vehicleType: "SUV",
    entryTime: "3:34",
  },
  {
    slotName: "B5",
    vehicleNumber: "GJ11YU0009",
    vehicleType: "CAR",
    entryTime: "1:60",
  },
  {
    slotName: "C1",
    vehicleNumber: "GJ18G5674",
    vehicleType: "SUV",
    entryTime: "11:05",
  },
  {
    slotName: "C2",
    vehicleNumber: "GJ18G5674",
    vehicleType: "SUV",
    entryTime: "11:05",
  },
  {
    slotName: "C3",
    vehicleNumber: "GJ18G5674",
    vehicleType: "SUV",
    entryTime: "11:05",
  },
  {
    slotName: "C4",
    vehicleNumber: "GJ01DR76432",
    vehicleType: "CAR",
    entryTime: "9:45",
  },
  {
    slotName: "C5",
    vehicleNumber: "GJ01DR76432",
    vehicleType: "CAR",
    entryTime: "9:45",
  },
];

const BookSlot = () => {
  const [checked, setChecked] = useState<boolean>(true);
  const [vehType, setVehType] = useState<VehicleType | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      slotName: "",
      vehicleNumber: "",
      vehicleType: "",
      isChecked: checked,
      entryTime: "",
    },
    validate: {
      vehicleNumber: (value) => {
        if (value.length < 9) return "Enter valid vehicle number";
        if (value.length >= 9) {
          return /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/i.test(value)
            ? null
            : "Invalid vehicle number";
        }
      },
      vehicleType: (value) =>
        value.length < 1 ? "Vehicle Type is required" : null,
      entryTime: (value) =>
        value.length < 1 ? "Entry Time is required" : null,
      slotName: (value: string) =>
        checked === false &&
        (value.length < 1 ? "Slot Name is required" : null),
    },
  });

  form.watch("vehicleType", ({ value }) => {
    setVehType(value);
  });

  const occupiedSlotName = activeSlotData.map(
    (activeSlot: ActiveSlot) => activeSlot.slotName,
  );

  const newInitialData = Object.values(initialData).filter(
    (val) => !occupiedSlotName.includes(val.slotName),
  );

  const selectSlotData = (vehicleType: VehicleType) => {
    return newInitialData
      .filter((slot: Slot) => {
        return slot.supportVehicleType.includes(vehicleType);
      })
      .map((slot: Slot) => slot.slotName);
  };

  const isVehicleOccupied = (vehicleNumber: string) => {
    return activeSlotData.find((val) => val.vehicleNumber === vehicleNumber);
  };

  const handleSubmit = async (formData: typeof form.values) => {
    console.log(formData);
    const isExist = isVehicleOccupied(formData.vehicleNumber.toUpperCase());

    if (formData.isChecked === true && formData.slotName === "") {
      const slotName = selectSlotData(formData.vehicleType).at(0);
      if (slotName) {
        console.log(slotName);
      }
      console.log("Slot is Full");
    }
    if (isExist) {
      console.log("This vehicle already occupy the slot.");
      return;
    }

    setChecked(true);
    setVehType(null);
    form.reset();
  };

  return (
    <div className="max-h-screen h-170 w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-blue-100 max-h-full py-8 w-75 rounded-2xl shadow-lg ">
        <h1 className="text-xl font-semibold mb-9">Book Slot</h1>
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="w-50 flex flex-col gap-5"
        >
          {/* <MaskInput
          required
          label="Vehicle No."
          mask="AA 99 AA 9999"
          // key={form.key("vehicleNumber")}
          placeholder="__ __ __ ____"
          defaultValue={String(form.getValues().vehicleNumber)}
          onChangeRaw={(raw) =>
            form.setFieldValue("vehicleNumber", raw, { forceUpdate: false })
          }
          className="w-50"
          error={
            form.getValues().vehicleNumber.length < 1 &&
            "Invalid Vehicle Number"
          }
        /> */}

          <TextInput
            label="Vehicle No."
            placeholder="Vehicle Number"
            key={form.key("vehicleNumber")}
            {...form.getInputProps("vehicleNumber")}
            className="w-50"
          />

          <Select
            required
            label="Vehicle Type"
            placeholder="Select Vehicle Type"
            data={["BIKE", "CAR", "SUV"]}
            key={form.key("vehicleType")}
            {...form.getInputProps("vehicleType")}
          />

          {vehType !== null && (
            <Checkbox
              label="Automatic Slot Assign"
              key={form.key("isChecked")}
              {...form.getInputProps("isChecked", { type: "checkbox" })}
              onClick={() => {
                if (checked === false) {
                  form.setFieldValue("slotName", "");
                }
                setChecked((val) => !val);
              }}
            />
          )}

          {checked === false && vehType && (
            <Select
              required
              label="Slot Name."
              placeholder="Select Slot Name"
              data={selectSlotData(vehType)}
              nothingFoundMessage={
                selectSlotData(vehType).length === 0 ? "No Slot Available" : ""
              }
              key={form.key("slotName")}
              {...form.getInputProps("slotName")}
            />
          )}

          <DateTimePicker
            required
            className="w-50"
            label="Entry Time"
            placeholder="Date with Time"
            key={form.key("entryTime")}
            {...form.getInputProps("entryTime")}
          />

          <Button type="submit">Book Slot</Button>
        </form>
      </div>
    </div>
  );
};

export default BookSlot;
