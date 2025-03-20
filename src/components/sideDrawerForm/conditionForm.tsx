import React, { useState } from "react";
import Image from "next/image";
import ArrowRight from "../../../public/wotnot/arrow-right.svg";
import DeleteIcon from "../../../public/wotnot/delete-icon.svg";
import Pluse from "../../../public/wotnot/plus-icon.svg";
import Button from "../button";
import FormWapper from "../formWrapper";
import { conditionForm } from "@/utils/constants";
import { useFieldArray, useForm } from "react-hook-form";
import DynamicFormWrapper from "../dynamicFormWrapper";

const ConditionForm = () => {
  const btns = ["ANY", "ALL"];
  const [selectedBranchCondition, setSelectedBranchCondition] = useState(0);
  const [selectedBtn, setSelectedBtn] = useState("ANY");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { liveStock: [{ variable: "", operator: "", value: "" }] },
  });
  const {
    fields: liveStockFields,
    append: appendLiveStockFields,
    remove: removeLiveStockFields,
  } = useFieldArray({
    control,
    name: "liveStock",
  });
  return (
    <>
      {selectedBranchCondition == 0 ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4]?.map((ele) => (
            <div
              className="flex flex-col gap-1"
              key={ele}
              onClick={() => setSelectedBranchCondition(ele)}
            >
              <header className="font-medium text-sm">Branch {ele}</header>
              <div className="flex justify-between items-center bg-gray-200 p-3 rounded text-gray-800 cursor-pointer">
                <header className="font-medium text-xs">Condition {ele}</header>
                <Image src={ArrowRight} alt="arrow" height={12} />
              </div>
            </div>
          ))}
          <Button
            btnName="Add Condition"
            btnType="custom"
            icon={Pluse}
            className="!w-fit !text-xs border !border-gray-700 !text-gray-700 !p-2"
          />
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={ArrowRight}
              alt="arrow"
              height={12}
              className="rotate-180 cursor-pointer"
              onClick={() => setSelectedBranchCondition(0)}
            />
            <header>Condition {selectedBranchCondition}</header>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span>if</span>
              <div className="flex items-center border border-gray-700 rounded overflow-hidden">
                {btns?.map((btn) => (
                  <span
                    className={`px-4 flex-1 cursor-pointer ${
                      selectedBtn === btn
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    key={btn}
                    onClick={() => setSelectedBtn(btn)}
                  >
                    {btn}
                  </span>
                ))}
              </div>
              <span>condition are met</span>
            </div>
            {liveStockFields?.length > 0 &&
              liveStockFields?.map((form, index) => (
                <div className="border-l-2 border-blue-500 pl-2" key={form?.id}>
                  <div className="flex justify-between mb-2">
                    <header>Condition {index + 1}</header>
                    {liveStockFields?.length !== 1 && (
                      <Image
                        src={DeleteIcon}
                        alt="delete"
                        height={18}
                        className="cursor-pointer"
                        onClick={() => removeLiveStockFields(index)}
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-1 w-full">
                    <DynamicFormWrapper
                      dynamicFieldName="liveStock"
                      errors={errors}
                      formObject={conditionForm}
                      index={index}
                      register={register}
                      className="!h-8 !text-xs"
                    />
                  </div>
                </div>
              ))}
            <Button
              btnName="Add Condition"
              btnType="custom"
              icon={Pluse}
              className="!w-fit !text-xs border !border-gray-700 !text-gray-700 !p-2"
              onClick={() =>
                appendLiveStockFields({
                  variable: "",
                  operator: "",
                  value: "",
                })
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ConditionForm;
