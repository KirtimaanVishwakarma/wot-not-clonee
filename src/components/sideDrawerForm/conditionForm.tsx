import React, { useState } from "react";
import Image from "next/image";
import ArrowRight from "../../../public/wotnot/arrow-right.svg";
import Pluse from "../../../public/wotnot/plus-icon.svg";
import Button from "../button";
import FormWapper from "../formWrapper";
import { conditionForm } from "@/utils/constants";
import { useForm } from "react-hook-form";

const ConditionForm = () => {
  const btns = ["ANY", "ALL"];
  const [selectedBtn, setSelectedBtn] = useState("ANY");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    // <div className="flex flex-col gap-3">
    //   {[1, 2, 3, 4]?.map((ele) => (
    //     <div className="flex flex-col gap-1" key={ele}>
    //       <header className="font-medium text-base">Branch {ele}</header>
    //       <div className="flex justify-between items-center bg-gray-200 p-3 rounded text-gray-800 cursor-pointer">
    //         <header className="font-medium text-base">Condition {ele}</header>
    //         <Image src={ArrowRight} alt="arrow" height={18} />
    //       </div>
    //     </div>
    //   ))}
    //   <Button
    //     btnName="Add Condition"
    //     btnType="secondary"
    //     icon={Pluse}
    //     className="!w-fit !text-base !border-gray-700 !text-gray-700 !p-2"
    //   />
    // </div>
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
      <div className="border-l-2 border-blue-500 pl-2">
        <header>Condition 1</header>
        <div className="grid grid-cols-1 gap-3">
          <FormWapper
            formObject={conditionForm}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default ConditionForm;
