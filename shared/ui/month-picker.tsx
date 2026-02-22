"use client";

import * as React from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/ui/class-merge";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

type MonthCell = {
  number: number;
  name: string;
};

const MONTH_ROWS: MonthCell[][] = [
  [
    { number: 0, name: "Jan" },
    { number: 1, name: "Feb" },
    { number: 2, name: "Mar" },
    { number: 3, name: "Apr" }
  ],
  [
    { number: 4, name: "May" },
    { number: 5, name: "Jun" },
    { number: 6, name: "Jul" },
    { number: 7, name: "Aug" }
  ],
  [
    { number: 8, name: "Sep" },
    { number: 9, name: "Oct" },
    { number: 10, name: "Nov" },
    { number: 11, name: "Dec" }
  ]
];

function parseMonthValue(value?: string): { year: number; month: number } | null {
  if (!value) {
    return null;
  }

  const [yearRaw, monthRaw] = value.split("-");
  const year = Number(yearRaw);
  const month = Number(monthRaw);

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return null;
  }

  return { year, month: month - 1 };
}

function toMonthValue(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

function formatTriggerValue(value?: string): string {
  const parsed = parseMonthValue(value);
  if (!parsed) {
    return "Pick month";
  }

  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(
    new Date(parsed.year, parsed.month, 1)
  );
}

export type MonthPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  className?: string;
};

export function MonthPicker({
  value,
  onChange,
  placeholder = "Pick month",
  disabled,
  minDate,
  maxDate,
  disabledDates,
  className
}: MonthPickerProps) {
  const now = React.useMemo(() => new Date(), []);
  const selected = parseMonthValue(value);
  const [open, setOpen] = React.useState(false);
  const [menuYear, setMenuYear] = React.useState<number>(selected?.year ?? now.getFullYear());

  React.useEffect(() => {
    if (selected?.year) {
      setMenuYear(selected.year);
    }
  }, [selected?.year]);

  const disabledDatesMapped = React.useMemo(
    () =>
      (disabledDates ?? []).map((d) => ({
        year: d.getFullYear(),
        month: d.getMonth()
      })),
    [disabledDates]
  );

  const triggerLabel = selected ? formatTriggerValue(value) : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn("w-full justify-between font-normal", !selected && "text-muted-foreground", className)}
          disabled={disabled}
        >
          {triggerLabel}
          <ChevronDown className="h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-3" align="start">
        <div className="flex justify-center pt-1 relative items-center">
          <div className="text-sm font-medium">{menuYear}</div>
          <div className="space-x-1 flex items-center">
            <button
              type="button"
              onClick={() => setMenuYear((prev) => prev - 1)}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "h-7 w-7 p-0 absolute left-1"
              )}
            >
              <ChevronLeft className="opacity-50 h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setMenuYear((prev) => prev + 1)}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "h-7 w-7 p-0 absolute right-1"
              )}
            >
              <ChevronRight className="opacity-50 h-4 w-4" />
            </button>
          </div>
        </div>

        <table className="w-full border-collapse space-y-1 mt-2">
          <tbody>
            {MONTH_ROWS.map((monthRow) => (
              <tr key={`row-${monthRow[0].number}`} className="flex w-full mt-2">
                {monthRow.map((m) => {
                  const isSelected = selected?.month === m.number && selected?.year === menuYear;
                  const isDisabledByMax =
                    !!maxDate &&
                    (menuYear > maxDate.getFullYear() ||
                      (menuYear === maxDate.getFullYear() && m.number > maxDate.getMonth()));
                  const isDisabledByMin =
                    !!minDate &&
                    (menuYear < minDate.getFullYear() ||
                      (menuYear === minDate.getFullYear() && m.number < minDate.getMonth()));
                  const isDisabledByList = disabledDatesMapped.some(
                    (d) => d.year === menuYear && d.month === m.number
                  );
                  const isDisabled = isDisabledByMax || isDisabledByMin || isDisabledByList;

                  return (
                    <td key={m.number} className="h-10 w-1/4 text-center text-sm p-0">
                      <button
                        type="button"
                        onClick={() => {
                          onChange?.(toMonthValue(menuYear, m.number));
                          setOpen(false);
                        }}
                        disabled={isDisabled}
                        className={cn(
                          buttonVariants({ variant: isSelected ? "default" : "ghost" }),
                          "h-full w-full p-0 font-normal"
                        )}
                      >
                        {m.name}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </PopoverContent>
    </Popover>
  );
}
