import WotNotContextData from "@/context/wotnotData";
import { FormObject, selectionIcons } from "@/utils/constants";
import Image from "next/image";
import React from "react";
import StartIcon from "../../public/wotnot/flag.svg";
import Select from "./formWrapper/select";
import FormWapper from "./formWrapper";
import { useForm } from "react-hook-form";
import Button from "./button";

const SideDrawer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { selectedNodeData } = WotNotContextData();
  // console.log("selectedNodeData", selectedNodeData);

  const submitForm = async (data) => {
    console.log(data);
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side  ">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* <ul className=''> */}
        {/* Sidebar content here */}
        <div className="menu text-black w-1/2 p-4 max-h-full h-full bg-white">
          <div className="flex flex-col gap-4 max-h-full h-full">
            <div className="flex items-center gap-3 h-fit">
              <Image
                src={
                  selectionIcons[selectedNodeData?.data?.type]?.icon ||
                  StartIcon
                }
                alt="start here"
                height={22}
              />
              <header className="font-normal text-base">Select Page</header>
            </div>
            <div className="h-full max-h-full overflow-auto">
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="grid grid-cols-2 w-full gap-4">
                  <FormWapper
                    formObject={FormObject}
                    register={register}
                    errors={errors}
                  />
                </div>
                <Button btnName="Submit" btnType="primary" type="submit" />
              </form>
            </div>
          </div>
        </div>
        {/* </ul> */}
      </div>
    </div>
  );
};

export default SideDrawer;
