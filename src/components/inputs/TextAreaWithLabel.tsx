"use client";

import { useFormContext } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type Props<TSchema> = {
  fieldTitle: string;
  nameInSchema: keyof TSchema & string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaWithLabel = <TSchema,>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<TSchema>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base mb-2" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <FormControl>
            <Textarea
              id={nameInSchema}
              className={className}
              {...props}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
