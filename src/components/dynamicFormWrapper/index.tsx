import React from "react";
// import Select from "./select";
// import Input from "./input";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FormFieldInterface } from "../formWrapper";
import Select from "./select";
import Input from "./input";

interface DynamicFormInterface {
  formObject: any;
  register: UseFormRegister<FieldValues>;
  errors: any;
  index: number;
  dynamicFieldName: string;
  formDisabled?: boolean;
  control?: any;
  useWatch?: any;
  setValue?: any;
  onChange?: (value: any) => void;
}

const DynamicFormWrapper = ({
  formObject,
  register,
  index,
  errors,
  dynamicFieldName,
  formDisabled,
  onChange,
}: DynamicFormInterface) => {
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
              id={`${dynamicFieldName}.${index}.${item?.id}`}
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
            id={`${dynamicFieldName}.${index}.${item?.id}`}
            errorFields={errorById}
            formDisabled={!!formDisabled}
            onChange={onChange}
          />
        );
      })}
    </>
  );
};

export default DynamicFormWrapper;
