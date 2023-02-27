import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

type InputProps = {
  name: string;
  type?: string;
  label: string;
  autoComplete?: string;
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};
export default function InputSimple({
  name,
  type = "text",
  label,
  autoComplete,
  value,
  handleChange,
}: InputProps) {
  return (
    <FormControl fullWidth>
      <InputLabel
        htmlFor={name}
        shrink={true}
        sx={{
          position: "relative",
          transformOrigin: "initial",
          transform: "initial",
        }}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        type={type}
        autoComplete={autoComplete}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </FormControl>
  );
}
