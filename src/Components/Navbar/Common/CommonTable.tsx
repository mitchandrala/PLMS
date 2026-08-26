import { Table, type TableProps } from "@mantine/core";
import type { ReactNode } from "react";

interface CommonTableProps extends Omit<TableProps, "data"> {
  data: ReactNode[];
  headerName: string[];
}

const CommonTable = ({ data, headerName, ...props }: CommonTableProps) => {
  return (
    <>
      <Table
        withTableBorder={true}
        withColumnBorders={true}
        highlightOnHover={true}
        {...props}
      >
        <Table.Thead>
          <Table.Tr>
            {headerName.map((name: string) => (
              <Table.Th key={name}>{name}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{data}</Table.Tbody>
      </Table>
      {!data.length && <p className="w-full text-center pt-5">No data</p>}
    </>
  );
};

export default CommonTable;
