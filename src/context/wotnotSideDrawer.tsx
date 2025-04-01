import { createContext, useContext, useState } from "react";

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
