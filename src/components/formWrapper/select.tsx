import React, { useMemo } from "react";
import { FormFieldInterface } from "./index";

const Select = ({
  span,
  label,
  form,
  errorFields,
  className,
  errorsMsg,
  disabled,
  id,
  register,
  placeholder,
  errors,
  selectProps,
  formDisabled,
  onChange,
}: FormFieldInterface) => {
  return (
    <div
      className={`relative mb-2 bg-white self-start ${span || "col-span-1"}`}
    >
      <label
        htmlFor={id}
        className="block mb-2 text-base font-medium text-black whitespace-nowrap"
      >
        {label} {form?.required && <span className="text-rose-800">*</span>}
      </label>
      <select
        className={`mx-0 bg-white h-12 truncate rounded border border-solid p-2 pr-6 ${
          errorFields ? "border-red-700" : "border-gray-400"
        } bg-white-0 text-base font-normal text-black outline-none ${
          label && "w-full"
        }
      ${formDisabled || disabled ? "bg-white-200" : "bg-white-0"}
      `}
        disabled={formDisabled || disabled}
        id={id}
        // step='any'
        onWheel={(e: any) => e.target.blur()}
        {...register(id, {
          ...form,
          onChange: (e: React.FormEvent<HTMLSelectElement>) => {
            onChange ? onChange(e) : void 0;
          },
        })}
      >
        {placeholder && (
          <option selected value="" disabled>
            {placeholder}
          </option>
        )}
        {selectProps?.map((ele, index: number) => {
          return (
            <option
              key={index}
              value={ele.value}
              disabled={ele.value === "" || ele?.disabled}
              className="text-black"
            >
              {ele.label}
            </option>
          );
        })}
      </select>
      <div className="mt-2 text-xs text-red-700">
        {errors[id]?.message && errors[id]?.message}
      </div>
    </div>
  );
};

export default Select;
