import WotNotContextData from "@/context/wotnotData";
import { selectionIcons } from "@/utils/constants";
import Image from "next/image";
import React from "react";
import StartIcon from "../../public/wotnot/flag.svg";

import Loader from "./loader";

interface SideDrawerInterface {
  isLoading?: boolean;
  children: React.ReactNode;
}
const SideDrawer = ({ isLoading, children }: SideDrawerInterface) => {
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
        <div className="menu text-black w-1/3 px-6 py-4 max-h-full h-full bg-white">
          <div className="flex flex-col gap-4 max-h-full h-full">
            <div className="flex items-center gap-3 h-fit">
              {/* <Image
                src={
                  selectionIcons[selectedNodeData?.data?.type]?.icon ||
                  StartIcon
                }
                alt="start here"
                height={22}
              /> */}
              <header className="font-normal text-base">Select Page</header>
            </div>
            <div className="h-full max-h-full overflow-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader />
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
        {/* </ul> */}
      </div>
    </div>
  );
};

export default SideDrawer;
