import React, { useMemo } from "react";
import { FormFieldInterface } from "../formWrapper";

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
  const [fieldName, index, fieldId] = useMemo(() => id.split("."), [id]);

  const error = errors?.[fieldName]?.[index]?.[fieldId];

  return (
    <div className={`relative mb-2 self-start ${span || "col-span-1"}`}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-base font-medium text-black whitespace-nowrap"
        >
          {label} {form?.required && <span className="text-rose-800">*</span>}
        </label>
      )}
      <select
        className={`mx-0 h-12 truncate rounded border border-solid p-2 pr-6 ${
          error?.message || errorsMsg ? "border-red-100" : "border-gray-400"
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
      <div className="mt-2 text-xs text-red-100">
        {error?.message ||
          (typeof errorsMsg === "string"
            ? errorsMsg
            : errorsMsg?.message
            ? errorsMsg?.message
            : "") ||
          ""}
      </div>
    </div>
  );
};

export default Select;
