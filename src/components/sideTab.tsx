import SideDrawerProvider from "@/context/wotnotSideDrawer";
import { useEffect } from "react";
import Loader from "./loader";
import WotNotContextData from "@/context/wotnotData";

export default function SideDrawer({ isLoading, children }) {
  const { isOpen, setIsOpen } = SideDrawerProvider();

  const { setSelectedNodeData } = WotNotContextData();

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSelectedNodeData(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-1/3 px-6 py-4  bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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
    </>
  );
}
