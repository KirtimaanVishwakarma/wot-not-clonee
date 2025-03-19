import React from "react";
import { useForm } from "react-hook-form";
import Select from "./select";
import Input from "./input";

export interface FormFieldInterface {
  index: number;
  span: string;
  label: string;
  form: any;
  errorFields: boolean;
  className?: string;
  type: string;
  disabled: boolean;
  id: string;
  options?: [{ label?: string; value: string; name?: string }];
  selectProps?: [
    { label?: string; value: string; name?: string; disabled?: boolean }
  ];
  register: UseFormRegister<FieldValues>;
  placeholder: string;
  errors:
    | Partial<
        FieldErrorsImpl<{
          [x: string]: any;
        }>
      >
    | any;
  closeMenuOnSelect?: boolean;
  control?: any;
  min?: boolean;
  max?: boolean;
  errorsMsg?: string | null | undefined;
  formDisabled?: boolean;
  isMulti?: boolean;
  dynamicFieldName: string;
  onChange?: (value: any) => void;
}

const FormWapper = ({
  formObject,
  register,
  errors,
  // dynamicFieldName,
  formDisabled,
  onChange,
}: any) => {
  return (
    <>
      {formObject?.map((item: FormFieldInterface, ind: number) => {
        const errorById = !!errors[item?.id];

        if (item?.type === "select") {
          return (
            <Select
              key={ind}
              register={register}
              {...item}
              errors={errors}
              errorFields={errorById}
              formDisabled={!!formDisabled}
              onChange={onChange}
            />
          );
        }
        return (
          <Input
            key={ind}
            register={register}
            {...item}
            errors={errors}
            // id={`${dynamicFieldName}.${index}.${item?.id}`}
            errorFields={errorById}
            formDisabled={!!formDisabled}
            onChange={onChange}
          />
        );
      })}
    </>
  );
};

export default FormWapper;
