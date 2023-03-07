import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { nanoid } from "nanoid";

type MenuItemType = {
  // Representing each item of the select field
  value: string | number | readonly string[] | undefined; // The value of the item
  component: React.ReactNode; // The component to be displayed... Probably string
};

type SelectProps = {
  label: string;
  name: string;
  items: MenuItemType[];
  value: string;
  className?: string;
  handleChange: (e: SelectChangeEvent<string>) => void;
};
export default function SelectSimple({
  name,
  label,
  items,
  value,
  handleChange,
  className,
}: SelectProps) {
  return (
    <FormControl fullWidth className={className}>
      <InputLabel
        id={`${name}-label`}
        shrink={true}
        sx={{
          position: "relative",
          transformOrigin: "initial",
          transform: "initial",
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownRoundedIcon}
      >
        {items.map((item) => (
          <MenuItem value={item.value} key={nanoid()}>
            {item.component}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
