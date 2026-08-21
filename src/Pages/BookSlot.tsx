import { Button, Checkbox, Select, TextInput } from "@mantine/core";
import {
  type SlotType,
  type SlotTypeAData,
  type SlotTypeBData,
  type SlotTypeCData,
  type Slots,
} from "../Types/slotType";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";

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

const dataA: SlotTypeAData[] = [
  {
    slotName: "A1",
    isOccupied: true,
  },
];

const dataB: SlotTypeBData[] = [
  {
    slotName: "B1",
    isOccupied: false,
  },
];

const dataC: SlotTypeCData[] = [
  {
    slotName: "C1",
    isOccupied: true,
  },
];

const BookSlot = () => {
  const [checked, setChecked] = useState<boolean>(true);

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

  const selectSlotData = data
    .filter((val: SlotType) => {
      if (val.isOccupied === false) {
        return true;
      }
    })
    .map((val: SlotType) => val.slotName);

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values);
    form.reset();
    setChecked(true);
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
            required
            label="Vehicle No."
            placeholder="Vehicle number"
            key={form.key("vehicleNumber")}
            {...form.getInputProps("vehicleNumber")}
            className="w-50"
          />

          <Select
            required
            label="Vehicle Type"
            placeholder="Select Vehicle type"
            data={["BIKE", "CAR", "SUV"]}
            key={form.key("vehicleType")}
            {...form.getInputProps("vehicleType")}
          />
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

          {checked === false && (
            <Select
              required
              label="Slot Name."
              placeholder="Select Slot name"
              data={selectSlotData}
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
