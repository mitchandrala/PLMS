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
import CommonTable from "../Components/Navbar/Common/CommonTable";

const ViewAndManage = () => {
  const [search, setSearch] = useState<string>("");
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const navigate = useNavigate();

  const { activeSlots, slots, releaseSlot } = useSlots();

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
              "-"
            )}
          </>
        </Table.Td>
      </Table.Tr>
    ),
  );

  return (
    <div className="max-h-screen h-170 w-full flex flex-col items-center p-10 gap-5">
      <div className="mb-10">
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
            placeholder="Filter by Vehicle Type"
            data={["BIKE", "CAR", "SUV"]}
            onChange={(val) => setVehicle(val)}
          />
        </div>
        <div>
          <Select
            placeholder="Filter by Slot Status"
            data={[
              { value: "AVAILABLE", label: "Available" },
              { value: "OCCUPIED", label: "Occupied" },
            ]}
            onChange={(val) => setStatus(val)}
          />
        </div>
      </div>

      <div className="pb-15 lg:w-210">
        <CommonTable
          data={rows}
          headerName={[
            "Slot Name",
            "Slot Status",
            "Vehicle Number",
            "Vehicle Type",
            "Entry Time",
            "Action",
          ]}
        />
      </div>
    </div>
  );
};

export default ViewAndManage;
