import { Table } from "@mantine/core";
import { useSlots } from "../Hooks/useSlots";
import type { SlotHistory } from "../Types/slotType";

const ParkingHistory = () => {
  const { slotHistoryData } = useSlots();

  const rows = slotHistoryData.map((slot: SlotHistory) => (
    <Table.Tr key={slot.entryTime}>
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
    <div className="max-h-screen h-170 w-full flex flex-col p-10 gap-10">
      <div>
        <h1 className="text-lg font-semibold text-center">Slot History</h1>
      </div>
      <div>
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
              <Table.Th>Exit Time</Table.Th>
              <Table.Th>Duration</Table.Th>
              <Table.Th>Charge</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default ParkingHistory;
