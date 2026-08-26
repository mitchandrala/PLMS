import { Table } from "@mantine/core";
import { useSlots } from "../Hooks/useSlots";
import type { SlotHistory } from "../Types/slotType";
import CommonTable from "../Components/Navbar/Common/CommonTable";

const ParkingHistory = () => {
  const { slotHistoryData } = useSlots();

  const rows = slotHistoryData.map((slot: SlotHistory) => (
    <Table.Tr key={slot.exitTime}>
      <Table.Td>{slot?.slotName}</Table.Td>
      <Table.Td>{slot?.vehicleNumber}</Table.Td>
      <Table.Td>{slot?.vehicleType}</Table.Td>
      <Table.Td>{slot?.entryTime}</Table.Td>
      <Table.Td>{slot?.exitTime}</Table.Td>
      <Table.Td>{slot?.duration}</Table.Td>
      <Table.Td>{`₹${slot?.charge.toLocaleString()}`}</Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="max-h-screen h-170 w-full flex flex-col items-center p-10 gap-10">
      <div>
        <h1 className="text-lg font-semibold text-center">Slot History</h1>
      </div>
      <div className="w-full pb-15 lg:w-250">
        <CommonTable
          data={rows}
          headerName={[
            "Slot Name",
            "Vehicle Number",
            "Vehicle Type",
            "Entry Time",
            "Exit Time",
            "Duration",
            "Charge",
          ]}
        />
      </div>
    </div>
  );
};

export default ParkingHistory;
