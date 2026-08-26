import { Button, Select, Table, TextInput } from "@mantine/core";
import { useSlots } from "../Hooks/useSlots";
import {
  type ActiveSlot,
  type ActiveSlotTable,
  type Slot,
  type SlotHistory,
  type SlotName,
  type Status,
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
  const [status, setStatus] = useState<Status | null>(null);
  const navigate = useNavigate();

  const { activeSlots, slots, releaseSlot } = useSlots();

  const activeSlotName = activeSlots.map(
    (activeSlot: ActiveSlot) => activeSlot.slotName,
  );

  const filterSlot = slots
    .filter((slot: Slot) => !activeSlotName.includes(slot.slotName))
    .map((slot: Slot) => slot.slotName);

  const tableData: ActiveSlotTable[] = slots.map((slot: Slot) => {
    const activeSlot = activeSlots.find(
      (activeSlot: ActiveSlot) => slot.slotName === activeSlot.slotName,
    );
    if (activeSlot) {
      return { ...activeSlot, slotStatus: "OCCUPIED" };
    } else {
      return { slotName: slot.slotName, slotStatus: "AVAILABLE" };
    }
  });

  const searchList = useMemo(() => {
    return tableData.filter((slot: ActiveSlotTable) => {
      if (search && vehicle && status) {
        return (
          slot.vehicleNumber?.match(search) &&
          slot.vehicleType?.match(vehicle) &&
          slot.slotStatus?.match(status)
        );
      } else if (vehicle && search) {
        return (
          slot.vehicleType?.match(vehicle) && slot.vehicleNumber?.match(search)
        );
      } else if (status && vehicle) {
        return (
          slot.slotStatus?.match(status) && slot.vehicleType?.match(vehicle)
        );
      } else if (status && search) {
        return (
          slot.slotStatus?.match(status) && slot.vehicleNumber?.match(search)
        );
      } else if (vehicle) {
        return slot.vehicleType?.match(vehicle);
      } else if (status) {
        return slot.slotStatus?.match(status);
      } else {
        return slot.vehicleNumber?.match(search);
      }
    });
  }, [search, vehicle, status]);

  const handleRelease = (slotName: SlotName) => {
    const slotData = activeSlots.find(
      (activeSlot: ActiveSlot) => activeSlot.slotName === slotName,
    );

    if (!slotData) return;
    const evalue = entryTime(slotData.entryTime);
    const exitTime = new Date();

    const min = countMinute(evalue, exitTime);
    if (min <= 0) {
      alert("Could't Release");
      return;
    }
    const charge = countCharges(slotData.vehicleType, min);
    const duration = showDuration(min);

    const data: SlotHistory = {
      ...slotData,
      charge: charge,
      duration: duration,
      exitTime: String(exitTime).slice(4, 24),
    };

    releaseSlot(slotData, data);
    alert(
      `Pay Charge: ₹${charge?.toLocaleString()} for ${duration} of parking`,
    );

    navigate(ROUTES.PARKING_HISTORY);
  };

  const rows = (search || vehicle || status ? searchList : tableData).map(
    (slot: ActiveSlotTable) => (
      <Table.Tr key={slot.slotName}>
        <Table.Td>{slot.slotName}</Table.Td>
        <Table.Td>
          <p
            className={`${slot.slotStatus === "OCCUPIED" ? "text-red-600" : "text-green-600"}`}
          >
            {slot.slotStatus === "OCCUPIED" ? "Occupied" : "Available"}
          </p>
        </Table.Td>
        <Table.Td>
          {slot.slotStatus === "OCCUPIED" ? slot.vehicleNumber : "-"}
        </Table.Td>
        <Table.Td>
          {slot.slotStatus === "OCCUPIED" ? slot.vehicleType : "-"}
        </Table.Td>
        <Table.Td>
          {slot.slotStatus === "OCCUPIED" ? slot.entryTime : "-"}
        </Table.Td>
        <Table.Td>
          <>
            {slot.slotStatus === "OCCUPIED" ? (
              <Button
                size="xs"
                variant="light"
                onClick={() => handleRelease(slot?.slotName)}
              >
                Release
              </Button>
            ) : (
              <Button
                size="xs"
                variant="light"
                onClick={() => navigate(ROUTES.BOOK_SLOT)}
              >
                Book slot
              </Button>
            )}
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

      <div className="flex gap-10 justify-center">
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
        <div>
          <Select
            placeholder="Select Vehicle Type"
            data={[
              { value: "AVAILABLE", label: "Available" },
              { value: "OCCUPIED", label: "Occupied" },
            ]}
            onChange={(val) => {
              val === "AVAILABLE"
                ? setStatus("AVAILABLE")
                : setStatus("OCCUPIED");
            }}
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
              <Table.Th>Slot Status</Table.Th>
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
