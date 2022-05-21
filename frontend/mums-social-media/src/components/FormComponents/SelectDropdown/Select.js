import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import "./selectDropdown.scss";

const customStyles = {
  option: (provided) => ({
    ...provided,
    padding: 20,
  }),
  control: (provided) => ({
    ...provided,
    "&:hover": { borderColor: "transparent" },
    border: "0.1rem solid #ebe1c1",
    borderRadius: "0.8rem",
    boxShadow: "none",
  }),
};
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
    <div className="select-wrapper">
      <label className="select-label">{label}</label>
      <div className="select">
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
                styles={customStyles}
                // value={options.filter((option) => value?.includes(option.value))}
              />
            );
          }}
        />
      </div>
    </div>
  );
};
export default SelectDropdown;
