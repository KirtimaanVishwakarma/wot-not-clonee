import { WotNotDataProviderInterface } from '@/utils/interface';
import { createContext, useContext } from 'react';

const WotNotData = createContext(null);
export const WotNotDataProvider = ({
  children,
}: WotNotDataProviderInterface) => {
  return <WotNotData.Provider value={null}>{children}</WotNotData.Provider>;
};

const WotNotContextData = () => {
  const context = useContext(WotNotData);
  if (!context) return;
  return context;
};

export default WotNotContextData;
