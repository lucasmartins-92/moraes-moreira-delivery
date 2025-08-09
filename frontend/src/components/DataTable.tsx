import React from 'react';

export interface Column<Tabela> {
  header: string;
  accessor: keyof Tabela;

  render?: (item: Tabela) => React.ReactNode;
}

interface DataTableProps<Tabela> {
  data: Tabela[];
  columns: Column<Tabela>[];
}

function DataTable<Tabela extends { id: number }>({ data, columns }: DataTableProps<Tabela>) {
  if (!data || data.length === 0) {
    return <p>Nenhum dado encontrado.</p>;
  }

  return (
    <table border={1} style={{ borderCollapse: 'collapse', tableLayout: 'auto', width: 'auto'}}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.accessor)}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={String(column.accessor)}>
                {column.render ? column.render(item) : String(item[column.accessor])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;