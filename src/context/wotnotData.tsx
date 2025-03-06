import {
  InitialNodeInterface,
  WotNotDataProviderInterface,
} from '@/utils/interface';
import React, { createContext, useContext, useState } from 'react';
import StartHere from '../../public/start-here.svg';

const WotNotData = createContext<{
  initNodes: InitialNodeInterface;
  setInitNodes: React.Dispatch<React.SetStateAction<InitialNodeInterface>>;
  currentNode: Number;
  setCurrentNode: React.Dispatch<React.SetStateAction<Number>>;
}>({
  initNodes: [
    {
      id: '1',
      type: 'custom',
      data: {
        start: StartHere,
        targetIds: ['2', '3'],
      },
      position: { x: 0, y: 50 },
    },
  ],
  setInitNodes: () => {},
  currentNode: 0,
  setCurrentNode: () => {},
});
export const WotNotDataProvider = ({
  children,
}: WotNotDataProviderInterface) => {
  const [initNodes, setInitNodes] = useState<InitialNodeInterface>([
    {
      id: '1',
      type: 'custom',
      data: {
        start: StartHere,
        targetIds: ['2', '3'],
      },
      position: { x: 0, y: 50 },
    },
    {
      id: '2',
      type: 'custom',
      data: { type: 'Page' },
      position: { x: -100, y: 200 },
    },
    {
      id: '3',
      type: 'custom',
      data: {
        type: 'Condition',
      },
      position: { x: 100, y: 200 },
    },
    {
      id: '4',
      type: 'custom',
      data: {
        type: 'Condition',
      },
      position: { x: 300, y: 200 },
    },
  ]);
  const [currentNode, setCurrentNode] = useState<Number>(4);
  return (
    <WotNotData.Provider
      value={{ initNodes, setInitNodes, currentNode, setCurrentNode }}
    >
      {children}
    </WotNotData.Provider>
  );
};

const WotNotContextData = () => {
  const context = useContext(WotNotData);
  if (!context) return;
  return context;
};

export default WotNotContextData;
