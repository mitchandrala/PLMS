import { Table } from "@mantine/core";
import { useSlots } from "../Hooks/useSlots";
import type {
  ActiveSlot,
  Slot,
  SlotHistory,
  SlotName,
  TotalVehicle,
} from "../Types/slotType";

const Dashboard = () => {
  const { activeSlots, slots, slotHistoryData } = useSlots();

  const occupiedSlot = activeSlots.map((slot: ActiveSlot) => slot.slotName);
  const totalSlot = slots.map((slot: Slot) => slot.slotName);

  const availabaleSlot = totalSlot.filter(
    (slot: SlotName) => !occupiedSlot.includes(slot),
  );

  const totalVehicle: TotalVehicle = {
    BIKE: 0,
    CAR: 0,
    SUV: 0,
  };

  activeSlots.map((slot: ActiveSlot) => {
    if (slot.vehicleType === "BIKE") {
      totalVehicle.BIKE += 1;
    } else if (slot.vehicleType === "CAR") {
      totalVehicle.CAR += 1;
    } else {
      totalVehicle.SUV += 1;
    }
  });

  const totalRevenue = () => {
    let totalRevenue = 0;
    slotHistoryData.map((slot: SlotHistory) => (totalRevenue += slot.charge));
    return totalRevenue;
  };

  return (
    <div className="max-h-screen h-170 w-full flex flex-col items-center p-10 gap-10">
      <h1 className="text-lg font-semibold text-center">Dashboard</h1>
      <div className="lg:w-200">
        <Table
          variant="vertical"
          layout="fixed"
          withTableBorder={true}
          withColumnBorders={true}
        >
          <Table.Tbody>
            <Table.Tr>
              <Table.Th w={120}>Total Slot</Table.Th>
              <Table.Td>{totalSlot.length}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th w={120}>Available Slot</Table.Th>
              <Table.Td>
                {availabaleSlot.length ? availabaleSlot.join(", ") : "No slot"}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th w={120}>Occupied Slot</Table.Th>
              <Table.Td>
                {occupiedSlot.length ? occupiedSlot.join(", ") : "No slot"}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th w={120}>Total Bike</Table.Th>
              <Table.Td>{totalVehicle.BIKE}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th w={120}>Total SUV</Table.Th>
              <Table.Td>{totalVehicle.SUV}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th w={120}>Total CAR</Table.Th>
              <Table.Td>{totalVehicle.CAR}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th w={120}>Total Revenue</Table.Th>
              <Table.Td>{`₹${totalRevenue().toLocaleString()} `}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
