"use client";

import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  DateValue,
  TimeValue,
  useButton,
  useDatePicker,
  useInteractOutside,
} from "react-aria";
import { DatePickerStateOptions, useDatePickerState } from "react-stately";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import { DateField } from "./date-field";
import { TimeField } from "./time-field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useForwardedRef } from "@/hooks/useForwardRef";

interface CustomDatePickerStateOptions<T extends DateValue>
  extends DatePickerStateOptions<T> {
  defaultTimeValue?: TimeValue;
}

interface DateTimePickerProps extends CustomDatePickerStateOptions<DateValue> {
  error?: boolean;
  errorMessage?: React.ReactNode;
}

const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  (props, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useState(false);

    const state = useDatePickerState(props);
    const {
      groupProps,
      fieldProps,
      buttonProps: _buttonProps,
      dialogProps,
      calendarProps,
    } = useDatePicker(props, state, ref);
    const { buttonProps } = useButton(_buttonProps, buttonRef);
    useInteractOutside({
      ref: contentRef,
      onInteractOutside: (e) => {
        setOpen(false);
      },
    });

    return (
      <div
        {...groupProps}
        ref={ref}
        className={cn(
          groupProps.className,
          "flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-transparent text-white h-[60px]"
        )}
      >
        <DateField {...fieldProps} />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              {...buttonProps}
              variant="outline"
              className="rounded-l-none h-[60px] border-[#1C293A] border-2 border-l-0"
              disabled={props.isDisabled}
              onClick={() => setOpen(true)}
            >
              <CalendarIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            ref={contentRef}
            className="w-full bg-[#1C293A] border-white text-white"
          >
            <div {...dialogProps} className="space-y-3">
              <Calendar {...calendarProps} />
              {!!state.hasTime && (
                <TimeField
                  value={state.timeValue}
                  onChange={state.setTimeValue}
                />
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
