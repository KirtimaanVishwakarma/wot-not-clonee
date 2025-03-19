import React, { memo, useEffect } from "react";
import { Handle, Position, ViewportPortal } from "@xyflow/react";
import Image from "next/image";
import { getEdge, selectionIcons, selectionType } from "@/utils/constants";
import RefFlagIcon from "../../public/wotnot/flag.svg";
import DeleteIcon from "../../public/wotnot/delete-icon.svg";
import CopyIcon from "../../public/wotnot/copy.svg";
import SideDrawerProvider from "@/context/wotnotSideDrawer";
import WotNotContextData from "@/context/wotnotData";

function ConditionNode(props: any) {
  const { nodes, setEdges, currentPageNode, setNodes, setCurrentPageNode } =
    WotNotContextData();
  const { data, selected, id } = props;
  const [addNewNode, setAddNewNode] = React.useState<string>("");

  return (
    <div className={`px-2 min-w-36 py-4 shadow-md rounded bg-gray-500 `}>
      <header className="text-white text-xs font-normal whitespace-nowrap truncate text-center">
        Condition
      </header>

      <Handle
        type="target"
        position={Position.Top}
        className="h-3 w-3 rounded-full !bg-blue-500"
      ></Handle>
      {data?.targetIds ? (
        <Handle
          type="source"
          position={Position.Bottom}
          className="h-3 w-3 rounded-full !bg-blue-500"
        ></Handle>
      ) : (
        <Handle
          // isConnectable={false} //to prevent connection
          onClick={() => setAddNewNode((prev) => (prev ? "" : props?.id))}
          type="source"
          position={Position.Bottom}
          className="w-6 h-6 rounded-full cursor-pointer flex justify-center items-center border-none !bg-blue-500"
        >
          <div
            className={`text-white transition-all`}
            style={{
              rotate: props?.id === addNewNode ? "225deg" : "",
            }}
          >
            +
          </div>
        </Handle>
      )}

      {props?.id === addNewNode && (
        <div
          style={{
            position: "absolute",
          }}
          className="top-full border border-gray-400 divide-y flex flex-col mt-4 bg-white w-full left-0 p-3 rounded-lg"
        >
          {[selectionType[0]]?.map((type, ind) => (
            <div
              key={ind}
              className="flex gap-2 items-center py-2 cursor-pointer"
              onClick={() => {
                setAddNewNode("");
                const edge = getEdge(
                  `p${currentPageNode}`,
                  `${props?.id}`,
                  `p${currentPageNode}`
                  // 'label'
                );

                setEdges((prev) => [...prev, edge]);

                const currNode = nodes?.find((n) => n.id === addNewNode);

                const nodeIndex = nodes?.findIndex((n) => n.id === addNewNode);

                const connectedNode = {
                  ...currNode,
                  data,
                };
                const prevInitEdge = JSON.parse(JSON.stringify(nodes));
                prevInitEdge[nodeIndex] = connectedNode;

                setNodes([
                  ...prevInitEdge,
                  {
                    id: `p${currentPageNode}`,
                    type: type?.type,
                    data: { type: type?.type },
                    position: {
                      x: props?.positionAbsoluteX - 4,
                      y: props?.positionAbsoluteY + 150,
                    },
                  },
                ]);
                setCurrentPageNode((prev) => prev + 1);
              }}
            >
              <div
                className="p-1 rounded-full"
                style={{ backgroundColor: type.bgColor }}
              >
                <Image src={type.icon} alt="icon" height={22} />
              </div>
              <header className="text-sm text-gray-500">{type.type}</header>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(ConditionNode);
