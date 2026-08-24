import { Button, Table } from "@mantine/core";
import { useSlots } from "../Hooks/useSlots";
import type { ActiveSlot, Slot, SlotName } from "../Types/slotType";

const ViewAndManage = () => {
  const { activeSlots, slots } = useSlots();
  console.log(activeSlots);

  const activeSlotName = activeSlots.map(
    (activeSlot: ActiveSlot) => activeSlot.slotName,
  );

  const filterSlot = slots
    .filter((slot: Slot) => !activeSlotName.includes(slot.slotName))
    .map((slot: Slot) => slot.slotName);

  const hanldeRelease = (value) => {
    console.log(value);
  };

  const rows = activeSlots.map((slot) => (
    <Table.Tr key={slot.slotName}>
      <Table.Td>{slot?.slotName}</Table.Td>
      <Table.Td>{slot?.vehicleNumber}</Table.Td>
      <Table.Td>{slot?.vehicleType}</Table.Td>
      <Table.Td>{slot?.entryTime}</Table.Td>
      <Table.Td>
        <>
          <Button size="sm" onClick={() => hanldeRelease(slot)}>
            Release
          </Button>
        </>
      </Table.Td>
    </Table.Tr>
  ));

  const availableSlotRaw = filterSlot.map((val: SlotName) => (
    <Table.Tr key={val}>
      <Table.Td>{val}</Table.Td>
      <Table.Td>Available</Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="max-h-screen h-170 w-full flex flex-col p-10 gap-10">
      <div>
        <h1 className="text-lg font-semibold text-center">View And Manage</h1>
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
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>

      <div className="flex flex-col gap-3">
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
