import React, {useMemo }from 'react'
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
            <table className='w-full'>
                <thead className='bg-black text-white'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                        {
                            <th>Serial No.
                            </th>
                        }
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className='border'>
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
                <tbody >
                    {table.getRowModel().rows.map((row,index) => (
                        <tr key={row.id}>
                        <td className='border px-2 py-1'>{index+1}</td>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className='border px-2 py-1'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
               
            </table>
            <div className="h-4" />
 
        </div>
    )
}

export default DisplayTable
