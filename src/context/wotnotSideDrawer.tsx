import { createContext, useContext } from 'react';

const drawerHandler = (): void => {
  const drawerInput: any = document.getElementById('my-drawer-4');
  // console.log("drawerInput",drawerInput);
  
  if (drawerInput) {
    drawerInput.checked = false;
  } else {
    drawerInput.checked = true;
  }
};

const Drawer = createContext({ drawerHandler: () => {} });

export const SideDrawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Drawer.Provider value={{ drawerHandler }}>
      {children}
    </Drawer.Provider>
  );
};

const SideDrawerProvider = () => {
  const context = useContext(Drawer);
  return context;
};
export default SideDrawerProvider;
