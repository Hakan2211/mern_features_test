import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import "./selectDropdown.scss";

const SelectDropdown = ({
  label,
  name,
  values = [],
  control,
  isMulti = false,
}) => {
  const options = values.map((value) => ({
    label: value,
    value: value,
  }));

  return (
    <div className="select">
      <label>{label}</label>
      <Controller
        name={"categories"}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          console.log("categories value?", value);
          return (
            <Select
              options={options}
              placeholder={"Select a Category"}
              // onChange={() => onChange(options?.map((option) => option.value))}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              isMulti={isMulti}
              // value={options.filter((option) => value?.includes(option.value))}
            />
          );
        }}
      />
    </div>
  );
};

export default SelectDropdown;
