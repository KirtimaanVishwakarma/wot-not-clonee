import Image from "next/image";
import React, { useMemo } from "react";

type BtnType = {
  className?: string;
  type?: "button" | "submit";
  btnType?: "primary" | "secondary" | "custom";
  btnName: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: any;
};
const Button = ({
  className = "",
  type = "button",
  btnType,
  btnName,
  onClick,
  disabled = false,
  icon,
}: BtnType) => {
  const style = useMemo(() => {
    if (btnType === "primary") {
      return "bg-blue-500 text-white";
    }
    if (btnType === "secondary") {
      return "bg-white text-blue-500 border border-blue-500 ";
    }
    if (btnType === "custom") {
      return "";
    }
  }, [btnType, className, disabled]);
  return (
    <button
      className={`${style} ${className} ${
        disabled
          ? "!bg-gray-300 !text-gray-500 !border-none cursor-not-allowed"
          : ""
      } py-1 px-4 rounded text-base font-normal`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon ? (
        <div className="flex justify-between gap-2">
          <Image src={icon} alt="icon" height={20} />{" "}
          <span className="flex items-center"> {btnName}</span>
        </div>
      ) : (
        btnName
      )}
    </button>
  );
};

export default Button;
