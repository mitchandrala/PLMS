import { Button, Select, Table, TextInput } from "@mantine/core";
import { useSlots } from "../Hooks/useSlots";
import {
  type ActiveSlot,
  type Slot,
  type SlotHistory,
  type VehicleType,
} from "../Types/slotType";
import {
  countCharges,
  countMinute,
  entryTime,
  showDuration,
} from "../Helper/dateHelper";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Routes/routes";

const ViewAndManage = () => {
  const [search, setSearch] = useState<string>("");
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const { activeSlots, slots, releaseSlot } = useSlots();

  const navigate = useNavigate();

  const searchList = useMemo(() => {
    return activeSlots.filter((slot: ActiveSlot) => {
      if (search && vehicle) {
        return (
          slot.vehicleNumber.match(search) && slot.vehicleType.match(vehicle)
        );
      } else if (vehicle) {
        return slot.vehicleType.match(vehicle);
      } else {
        return slot.vehicleNumber.match(search);
      }
    });
  }, [search, vehicle]);

  const activeSlotName = activeSlots.map(
    (activeSlot: ActiveSlot) => activeSlot.slotName,
  );

  const filterSlot = slots
    .filter((slot: Slot) => !activeSlotName.includes(slot.slotName))
    .map((slot: Slot) => slot.slotName);

  const handleRelease = (value: ActiveSlot) => {
    const evalue = entryTime(value.entryTime);
    const exitTime = new Date();

    const min = countMinute(evalue, exitTime);
    if (min <= 0) {
      alert("Could't Release");
      return;
    }
    const charge = countCharges(value.vehicleType, min);
    const duration = showDuration(min);

    const data: SlotHistory = {
      ...value,
      charge: charge,
      duration: duration,
      exitTime: String(exitTime).slice(4, 24),
    };

    releaseSlot(value, data);
    alert(
      `Pay Charge: ₹${charge?.toLocaleString()} for ${duration} of parking`,
    );

    navigate(ROUTES.PARKING_HISTORY);
  };

  const rows = (search || vehicle ? searchList : activeSlots).map(
    (slot: ActiveSlot) => (
      <Table.Tr key={slot.slotName}>
        <Table.Td>{slot?.slotName}</Table.Td>
        <Table.Td>{slot?.vehicleNumber}</Table.Td>
        <Table.Td>{slot?.vehicleType}</Table.Td>
        <Table.Td>{slot?.entryTime}</Table.Td>
        <Table.Td>
          <>
            <Button size="sm" onClick={() => handleRelease(slot)}>
              Release
            </Button>
          </>
        </Table.Td>
      </Table.Tr>
    ),
  );

  return (
    <div className="max-h-screen h-170 w-full flex flex-col p-10 gap-5">
      <div>
        <h1 className="text-lg font-semibold text-center">View And Manage</h1>
      </div>

      <div className="flex gap-10">
        <div className="w-50">
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Vehicle No."
          />
        </div>
        <div>
          <Select
            placeholder="Select Vehicle Type"
            data={["BIKE", "CAR", "SUV"]}
            onChange={(val) => setVehicle(val)}
          />
        </div>
      </div>

      <div className="mb-10">
        <Table
          withTableBorder={true}
          withColumnBorders={true}
          highlightOnHover={true}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Slot Name</Table.Th>
              <Table.Th>Vehicle Number</Table.Th>
              <Table.Th>Vehicle Type</Table.Th>
              <Table.Th>Entry Time</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        {!rows.length && <p className="w-full text-center pt-5">No data</p>}
      </div>

      <div className="flex flex-col gap-3 mb-10">
        <div>
          <h2 className="text-md font-semibold">Available Slot:</h2>
        </div>
        <div>
          <Table
            variant="vertical"
            layout="fixed"
            withTableBorder={true}
            withColumnBorders={true}
          >
            <Table.Tbody>
              <Table.Tr>
                <Table.Th w={120}>Slot Name</Table.Th>
                <Table.Td>{filterSlot.join(", ")}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th w={120}>Status</Table.Th>
                <Table.Td>Available</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ViewAndManage;
