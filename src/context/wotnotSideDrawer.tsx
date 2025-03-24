import { createContext, useContext, useState } from "react";

// const drawerHandler = (): void => {
//   const drawerInput: any = document.getElementById("my-drawer-4");
//   // console.log("drawerInput",drawerInput);

//   if (drawerInput) {
//     drawerInput.checked = false;
//   } else {
//     drawerInput.checked = true;
//   }
// };

const Drawer = createContext({ drawerHandler: () => {}, isOpen: false });

export const SideDrawer = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer.Provider value={{ isOpen, setIsOpen }}>{children}</Drawer.Provider>
  );
};

const SideDrawerProvider = () => {
  const context = useContext(Drawer);
  return context;
};
export default SideDrawerProvider;
