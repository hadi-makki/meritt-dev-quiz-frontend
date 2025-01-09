"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Props for the ValidatedInput component
 */
interface ValidatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  name: string;
  label: string;
  error?: string;

  as?: "input" | "textarea";
  rows?: number;
}

export function ValidatedInput({
  id,
  name,
  label,
  error,
  as = "input",
  rows = 4,
  ...props
}: ValidatedInputProps) {
  return (
    <div>
      {/* Label */}
      <Label htmlFor={id} className="block text-sm font-medium">
        {label}
      </Label>

      {/* Conditional rendering based on `as` prop */}
      {as === "input" ? (
        <Input id={id} name={name} {...props} className="mt-1" />
      ) : (
        <textarea
          id={id}
          name={name}
          rows={rows}
          {...props}
          className="mt-1 w-full p-2 border rounded-md"
        />
      )}

      {/* Error message */}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
