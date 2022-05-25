import { useTable } from 'react-table';
import styled from 'styled-components';

function TableObject({ columns, data, ...props }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    const Table = styled.table`
        border-bottom: 3px solid var(--green);
        border-spacing: 0;
        font-size: 1pc;
        margin: 1pc auto;
        text-align: left;
        width: 50pc;
        border-collapse: collapse;
        box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.1);
    `
    const Thead = styled.thead`
        color: var(--white);
        background-color: var(--green);
    `
    const Th = styled.th`
        padding: 1pc;
        &:last-of-type {
          border-top-right-radius: 0.75pc;
        }
        &:first-of-type {
          border-top-left-radius: 0.75pc;
        }
    `
    const Tr = styled.tr`
        background-color: var(--white);
        border-bottom: 1px solid var(--dark-grey);
        &:hover {
          background-color: var(--grey);
          color: var(--green);
          text-shadow: 0 0 1px var(--green), 0 0 1px var(--green);
        }
    `
    const Td = styled.td`
        padding: 1pc;
        border: 1x solid var(--grey);
    `

    return (
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <Th {...column.getHeaderProps()} >{column.render('Header')}</Th>
                ))}
                </tr>
          ))}
        </Thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
                <Tr {...row.getRowProps()}
                  onMouseEnter={() => props.writeRow(row.values)} onMouseLeave={() => props.deleteRow()}
                >
                    {row.cells.map(cell => {
                    return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    })}
                </Tr>
            )
          })}
        </tbody>
      </Table>
    )
}

function Table (props) {
  return <TableObject columns={props.columns} data={props.data} writeRow={props.writeRow} deleteRow={props.deleteRow} />;
}

export { Table }