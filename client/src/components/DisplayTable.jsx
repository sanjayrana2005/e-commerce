import React from 'react'
import {
    createColumnHelper, flexRender, getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

const DisplayTable = ({ data, column }) => {
    const table = useReactTable({
        data,
        columns: column,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className="p-2">
      {/* Responsive wrapper */}
      <div className="w-full overflow-x-auto max-w-full">
        <table className="lg:w-full text-xs lg:text-sm md:text-sm  border-collapse table-auto">
          <thead className="bg-black text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th className="border px-2 py-1 text-left">Serial No.</th>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border px-2 whitespace-nowrap py-1 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id}>
                <td className="border px-2 py-1">{index + 1}</td>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border px-2 py-1 whitespace-nowrap">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-4" />
    </div>
  )
}

export default DisplayTable
