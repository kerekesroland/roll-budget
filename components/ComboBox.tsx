"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface IComboBox {
  title?: string;
  options?: Array<Option>;
  extraStyle?: string;
  callback?: Function;
  defaultValue?: string;
  filterKey?: string;
}
type Option = {
  value: string;
  label: string;
};

export function Combobox({
  title,
  options,
  extraStyle,
  callback,
  defaultValue,
  filterKey,
}: IComboBox) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue || "");

  const handleSelect = (data: any) => {
    setValue((prevValue) => (prevValue === data ? "" : data));
    if (filterKey) {
      callback?.(filterKey, data);
    } else {
      callback?.(data);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between py-[1.5rem] border-2 ${extraStyle}`}
        >
          {value
            ? options?.find((option) => option.value === value)?.label
            : title}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup>
            {options?.map((option) => (
              <CommandItem
                key={option?.value}
                onSelect={(currentValue) => {
                  handleSelect(currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option?.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {option?.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
