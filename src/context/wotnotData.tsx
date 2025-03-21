import {
  InitialNodeInterface,
  WotNotDataProviderInterface,
} from "@/utils/interface";
import React, { createContext, useContext, useState } from "react";
import StartHere from "../../public/start-here.svg";
import { EdgeTypes, useEdgesState, useNodesState } from "@xyflow/react";

const WotNotData = createContext<{
  nodes: InitialNodeInterface;
  selectedNodeData: any;
  setSelectedNodeData: React.Dispatch<React.SetStateAction<any>>;
}>({
  nodes: [
    {
      id: "1",
      type: "custom",
      data: {
        start: StartHere,
      },
      position: { x: 0, y: 50 },
    },
  ],
  selectedNodeData: null,
  setSelectedNodeData: () => {},
});
export const WotNotDataProvider = ({
  children,
}: WotNotDataProviderInterface) => {
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);
  const [currentPageNode, setCurrentPageNode] = useState<Number>(1);
  const [currentConditionNode, setCurrentConditionNode] = useState<Number>(1);
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "Page",
      deletable: false,
      draggable: false,
      data: {
        start: StartHere,
      },
      position: { x: 0, y: 50 },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <WotNotData.Provider
      value={{
        selectedNodeData,
        setSelectedNodeData,
        currentPageNode,
        setCurrentPageNode,
        currentConditionNode,
        setCurrentConditionNode,
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
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
