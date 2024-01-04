"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/DataTablePagination";
import { Record } from "./columns";
import { useEffect } from "react";

interface DataTableProps {
  columns: ColumnDef<Record>[];
  data: Record[];
  highlightedRowId: string;
  highlightedRowIndex?: number;
}

export function DataTable({
  columns,
  data,
  highlightedRowId,
  highlightedRowIndex,
}: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Go to highlighted row page
  useEffect(() => {
    if (highlightedRowIndex) {
      const pageSize = table.getState().pagination.pageSize;
      table.setPageIndex(Math.ceil(highlightedRowIndex / pageSize) - 1);
    }
  }, [highlightedRowIndex, table]);

  return (
    <>
      <div className="rounded-md border font-StarJedi text-5xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={`${
                    row.original.id === highlightedRowId
                      ? "bg-cyan-300 bg-opacity-25 border-2 border-cyan-300"
                      : ""
                  }`}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
