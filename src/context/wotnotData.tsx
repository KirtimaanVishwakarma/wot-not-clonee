import {
  InitialNodeInterface,
  WotNotDataProviderInterface,
} from '@/utils/interface';
import React, { createContext, useContext, useState } from 'react';
import StartHere from '../../public/start-here.svg';
import { EdgeTypes } from '@xyflow/react';

const WotNotData = createContext<{
  initNodes: InitialNodeInterface;
  setInitNodes: React.Dispatch<React.SetStateAction<InitialNodeInterface>>;
  currentNode: Number;
  setCurrentNode: React.Dispatch<React.SetStateAction<Number>>;
  initEdge: EdgeTypes;
  selectedNodeData: any;
  setSelectedNodeData: React.Dispatch<React.SetStateAction<any>>;
}>({
  initNodes: [
    {
      id: '1',
      type: 'custom',
      data: {
        start: StartHere,
      },
      position: { x: 0, y: 50 },
    },
  ],
  setInitNodes: () => {},
  initEdge: [],
  currentNode: 0,
  setCurrentNode: () => {},
  setInitEdges: () => {},
  selectedNodeData: null,
  setSelectedNodeData: () => {},
});
export const WotNotDataProvider = ({
  children,
}: WotNotDataProviderInterface) => {
  const [initNodes, setInitNodes] = useState<InitialNodeInterface>([
    {
      id: '1',
      type: 'Page',
      data: {
        start: StartHere,
      },
      position: { x: 0, y: 50 },
    },
  ]);
  const [initEdge, setInitEdge] = useState([]);
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);
  const [currentNode, setCurrentNode] = useState<Number>(1);
  
  return (
    <WotNotData.Provider
      value={{
        initNodes,
        setInitNodes,
        currentNode,
        setCurrentNode,
        initEdge,
        setInitEdge,
        selectedNodeData,
        setSelectedNodeData,
      }}
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
