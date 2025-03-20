import React, { useMemo } from "react";
import { FormFieldInterface } from "../formWrapper";

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
  const [fieldName, index, fieldId] = useMemo(() => id.split("."), [id]);

  const error = errors?.[fieldName]?.[index]?.[fieldId];

  return (
    <div className={`relative mb-2 self-start w-full ${span || "col-span-1"}`}>
      {label && (
        <label
          htmlFor={id}
          className=" mb-2 block whitespace-nowrap text-base font-medium text-black"
        >
          {label} {form?.required && <span className="text-rose-800">*</span>}
        </label>
      )}
      <input
        className={`mx-0 h-12 truncate w-full rounded border border-solid p-2 px-3 ${
          error ? "border-red-100" : "border-gray-400"
        } bg-white text-base font-normal text-black outline-none ${
          label && "w-full"
        } ${className || ""}
    ${formDisabled || disabled ? "bg-white-200" : "bg-white"}
    `}
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

export default Input;
