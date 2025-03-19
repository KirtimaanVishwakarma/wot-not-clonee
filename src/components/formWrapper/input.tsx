import React from "react";

import type { FormFieldInterface } from "./index";

const Input = ({
  span,
  label,
  form,
  errorFields,
  className,
  type,
  disabled,
  id,
  register,
  placeholder,
  errors,
  errorsMsg,
  min,
  max,
  formDisabled,
  onChange,
}: FormFieldInterface) => {
  return (
    <div className={`relative mb-2 self-start ${span || "col-span-1"}`}>
      <label
        htmlFor={id}
        className=" mb-2 block whitespace-nowrap text-base font-medium text-black"
      >
        {label} {form?.required && <span className="text-rose-800">*</span>}
      </label>
      <input
        className={`mx-0 bg-white h-12 truncate rounded border border-solid p-2 px-3 ${
          errorFields ? "border-red-700" : "border-gray-400"
        } bg-white-0 text-base font-normal text-black outline-none ${
          label && "w-full"
        }
    ${formDisabled || disabled ? "bg-white-200" : "bg-white-0"}
   placeholder:text-black `}
        type={type}
        disabled={formDisabled || disabled}
        placeholder={placeholder}
        id={id}
        step="any"
        min={min && new Date().toISOString().split("T")[0]}
        max={max && new Date().toISOString().split("T")[0]}
        onWheel={(e: any) => e.target.blur()}
        {...register(id, {
          ...form,
          onChange: (e: React.FormEvent<HTMLSelectElement>) => {
            onChange ? onChange(e) : void 0;
          },
        })}
      />
      <div className="mt-2 text-xs text-red-700">
        {errors[id]?.message && errors[id]?.message}
      </div>
    </div>
  );
};

export default Input;
