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
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { LocaleTranslations } from "@/constants/BudgetOptions";

interface IComboBox {
  title?: string;
  options?: Array<Option>;
  extraStyle?: string;
  callback?: Function;
  defaultValue?: string;
  filterKey?: string;
  searchable?: boolean;
}
type Option = {
  value: string | number;
  label: string | LocaleTranslations;
};

export function Combobox({
  title,
  options,
  extraStyle,
  callback,
  defaultValue,
  filterKey,
  searchable = true,
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

  const doesValueMatchAnything = options?.find(
    (el) => el.label === capitalizeFirstLetter(value) || el.value === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between py-[1.5rem] border-2 ${extraStyle}`}
        >
          {value ? String(doesValueMatchAnything?.label) : title}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {searchable && <CommandInput placeholder="Search..." />}
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
                    doesValueMatchAnything?.label === option?.label
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option?.label as string}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
