"use client";

import { Box } from "@/shared/layout/box";

import {
  type ColumnDef,
  type RowData,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";

import { Button } from "@/shared/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Typography } from "@/shared/ui/typography";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    classNames?: {
      head?: string;
      cell?: string;
    };
  }
}

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyMessage?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    pageSizeOptions?: number[];
    isLoading?: boolean;
    onPageChange?: (page: number) => void | Promise<void>;
    onPageSizeChange?: (pageSize: number) => void | Promise<void>;
  };
};

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = "No results.",
  pagination
}: DataTableProps<TData, TValue>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const totalPages = pagination ? Math.max(1, Math.ceil(pagination.total / pagination.pageSize)) : 1;
  const canGoPrev = pagination ? pagination.page > 1 : false;
  const canGoNext = pagination ? pagination.page < totalPages : false;
  const startIndex =
    pagination ?
      pagination.total === 0 ?
        0
      : (pagination.page - 1) * pagination.pageSize + 1
    : 0;
  const endIndex = pagination ? Math.min(pagination.page * pagination.pageSize, pagination.total) : 0;
  const pageSizeOptions = pagination?.pageSizeOptions ?? [5, 10, 20, 50];

  return (
    <Box className="space-y-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={header.column.columnDef.meta?.classNames?.head}>
                  {header.isPlaceholder ? null : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ?
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cell.column.columnDef.meta?.classNames?.cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          : <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>

      {pagination && (
        <Box className="flex flex-col md:flex-row items-center justify-between gap-4 border-t p-4">
          <Typography as="p" className="text-xs text-muted-foreground">
            Showing {startIndex}-{endIndex} of {pagination.total}
          </Typography>

          <Box className="flex items-center gap-4">
            <Box className="flex items-center gap-2">
              <Typography as="p" className="text-sm font-medium whitespace-nowrap">
                Rows per page
              </Typography>
              <Select
                value={String(pagination.pageSize)}
                onValueChange={(value) => {
                  pagination.onPageSizeChange?.(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-[76px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Box>

            <Box className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!canGoPrev || pagination.isLoading}
                onClick={() => pagination.onPageChange?.(pagination.page - 1)}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <Button
                  key={page}
                  type="button"
                  variant={page === pagination.page ? "default" : "outline"}
                  size="sm"
                  className="hidden sm:inline-flex"
                  disabled={pagination.isLoading}
                  onClick={() => pagination.onPageChange?.(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!canGoNext || pagination.isLoading}
                onClick={() => pagination.onPageChange?.(pagination.page + 1)}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
