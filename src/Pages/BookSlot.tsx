import { Button, Checkbox, Select, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useCallback, useMemo, useState } from "react";
import type {
  ActiveSlot,
  FormData,
  Slot,
  SlotName,
  VehicleType,
} from "../Types/slotType";
import { useSlots } from "../Hooks/useSlots";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Routes/routes";

const BookSlot = () => {
  const [checked, setChecked] = useState<boolean>(true);
  const [vehType, setVehType] = useState<VehicleType | null>(null);

  const navigate = useNavigate();

  const { activeSlots, bookSlot, slots } = useSlots();

  const availableSlotNameByVehicleType = (vehicleType: VehicleType) => {
    let newSlotName = slots;
    if (activeSlots) {
      const activeSlotName: SlotName[] = activeSlots.map(
        (slotData: ActiveSlot) => slotData.slotName,
      );

      newSlotName = slots.filter(
        (val: Slot) => !activeSlotName.includes(val.slotName),
      );
    }

    return newSlotName
      ?.filter((slot: Slot) => slot.supportVehicleType.includes(vehicleType))
      .map((slot: Slot) => slot.slotName);
  };

  const isVehicleOccupied = useMemo(
    () => (vehicleNumber: string) => {
      return activeSlots.find(
        (val: ActiveSlot) => val.vehicleNumber === vehicleNumber,
      );
    },
    [activeSlots],
  );

  const saveSlotForm = useCallback(
    (value: ActiveSlot) => {
      try {
        bookSlot(value);
        console.log("Slot Booked");
      } catch (error) {
        console.log(error);
      }
    },
    [bookSlot],
  );

  const initialValue: FormData = {
    slotName: null,
    vehicleNumber: "",
    vehicleType: null,
    isChecked: checked,
    entryTime: "",
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValue,
    validate: {
      vehicleNumber: (value) => {
        if (value.length < 9) return "Enter valid vehicle number";
        if (value.length >= 9) {
          return /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/.test(value)
            ? null
            : "Invalid vehicle number";
        }
      },
      vehicleType: (value) => {
        return value === null ? "Vehicle Type is required" : null;
      },
      entryTime: (value) =>
        value.length < 1 ? "Entry Time is required" : null,
      slotName: (value) =>
        checked === false && (value === null ? "Slot Name is required" : null),
    },
  });

  form.watch("vehicleType", ({ value }) => {
    setVehType(value);
  });

  const handleSubmit = (formData: typeof form.values) => {
    const isExist = isVehicleOccupied(formData.vehicleNumber);
    if (isExist) {
      alert("This vehicle already occupy the slot.");
      return;
    }

    // Automatic Slot Assign
    if (formData.isChecked === true && formData.slotName === null) {
      if (!formData?.vehicleType) return;
      const slotName = availableSlotNameByVehicleType(formData?.vehicleType).at(
        0,
      );
      if (slotName) {
        const slotBookData: ActiveSlot = {
          slotName: slotName,
          vehicleNumber: formData.vehicleNumber,
          vehicleType: formData.vehicleType,
          entryTime: formData.entryTime,
        };
        saveSlotForm(slotBookData);
        alert(`Slot For ${slotBookData.vehicleNumber} is ${slotName}`);
        navigate(ROUTES.VIEW_AND_MANAGE);
        console.log(slotBookData);
      } else {
        alert("Slot is Full");
      }
    }

    // Manually Slot
    if (formData.isChecked === false && formData.slotName !== null) {
      if (!formData?.vehicleType) return;

      const slotBookData: ActiveSlot = {
        slotName: formData.slotName,
        vehicleNumber: formData.vehicleNumber,
        vehicleType: formData.vehicleType,
        entryTime: formData.entryTime,
      };
      saveSlotForm(slotBookData);
      alert(
        `Slot For ${slotBookData.vehicleNumber} is ${slotBookData.slotName}`,
      );
      navigate(ROUTES.VIEW_AND_MANAGE);
      console.log(slotBookData);
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
          <TextInput
            withAsterisk
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
                  form.setFieldValue("slotName", null);
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
              data={availableSlotNameByVehicleType(vehType)}
              nothingFoundMessage={
                availableSlotNameByVehicleType(vehType).length === 0
                  ? "No Slot Available"
                  : ""
              }
              key={form.key("slotName")}
              {...form.getInputProps("slotName")}
            />
          )}

          <DateTimePicker
            required
            className="w-50"
            label="Entry Time"
            valueFormat="DD MMM YYYY hh:mm A"
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
