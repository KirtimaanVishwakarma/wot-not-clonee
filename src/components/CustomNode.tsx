import React, { memo, useCallback, useEffect } from "react";
import {
  Handle,
  Position,
  useNodeId,
  useReactFlow,
  ViewportPortal,
} from "@xyflow/react";
import Image from "next/image";
import { getEdge, selectionIcons, selectionType } from "@/utils/constants";
import RefFlagIcon from "../../public/wotnot/flag.svg";
import DeleteIcon from "../../public/wotnot/delete-icon.svg";
import CopyIcon from "../../public/wotnot/copy.svg";
import SideDrawerProvider from "@/context/wotnotSideDrawer";
import WotNotContextData from "@/context/wotnotData";

function CustomNode(props: any) {
  const {
    nodes,
    edges,
    setEdges,
    setSelectedNodeData,
    currentPageNode,
    setCurrentPageNode,
    currentConditionNode,
    setCurrentConditionNode,
  } = WotNotContextData();
  const { data, selected, id } = props;

  const [addNewNode, setAddNewNode] = React.useState<string>("");
  const [copyNode, setCopyNode] = React.useState<string>("");
  const nodeId = useNodeId();
  const { setNodes } = useReactFlow();
  const { drawerHandler } = SideDrawerProvider();

  const handleDeleteNode = () => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  };

  useEffect(() => {
    if (!copyNode) return;
    setTimeout(() => {
      setCopyNode("");
    }, 2000);
  }, [copyNode]);

  const getPosition = (ind: number, prop: any) => {
    let position;
    switch (ind) {
      // case 1:
      //   position = {
      //     x: prop?.positionAbsoluteX - 300,
      //     y: prop?.positionAbsoluteY + 300,
      //   };
      //   break;
      case 1:
        position = {
          x: prop?.positionAbsoluteX - 100,
          y: prop?.positionAbsoluteY + 300,
        };
        break;
      case 2:
        position = {
          x: prop?.positionAbsoluteX + 100,
          y: prop?.positionAbsoluteY + 300,
        };
        break;
      // case 4:
      //   position = {
      //     x: prop?.positionAbsoluteX + 300,
      //     y: prop?.positionAbsoluteY + 300,
      //   };
      //   break;

      default:
        position = {
          x: prop?.positionAbsoluteX - 300,
          y: prop?.positionAbsoluteY + 300,
        };
        break;
    }
    return position;
  };

  return (
    <div
      onMouseEnter={() => setCopyNode(id)}
      className={`px-2 border-y border-r ${
        selected ? "border-blue-600" : ""
      } py-2 shadow-md cursor-pointer rounded bg-white relative before:content-[""] before:absolute before:h-full before:w-2 before:rounded-l ${
        data?.type === "Page"
          ? "before:!bg-blue-400"
          : data?.type === "Condition"
          ? "before:!bg-yellow-400"
          : "before:bg-red-500"
      }  before:top-0 before:-left-1 before:-z-10`}
    >
      {data?.start && (
        <div
          style={{
            transform: "translate(-8rem, -3rem)",
            position: "absolute",
          }}
        >
          <Image src={data?.start} alt="start here" />
        </div>
      )}
      <label
        htmlFor="my-drawer-4"
        className="drawer-button"
        onClick={() => setSelectedNodeData(props)}
      >
        <div className="flex min-h-10 gap-3 justify-start items-center">
          <Image
            src={data?.start ? RefFlagIcon : selectionIcons[data?.type]?.icon}
            alt="start here"
            height={22}
          />
          <header className="text-black text-xs font-normal whitespace-nowrap truncate">
            Bot is triggered if…
          </header>
        </div>
      </label>
      {!data?.start && (
        <Handle
          type="target"
          position={Position.Top}
          className="h-3 w-3 rounded-full !bg-blue-500"
        ></Handle>
      )}
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
          {selectionType?.map((type, ind) => (
            <div
              key={ind}
              className="flex gap-2 items-center py-2 cursor-pointer"
              onClick={() => {
                setAddNewNode("");

                const currNode = nodes?.find((n) => n.id === addNewNode);

                const nodeIndex = nodes?.findIndex((n) => n.id === addNewNode);

                const connectedNode = {
                  ...currNode,
                  data,
                };
                const prevInitNodes = JSON.parse(JSON.stringify(nodes));
                prevInitNodes[nodeIndex] = connectedNode;

                if (type?.type === "Condition") {
                  const arr = [1, 2];

                  const conditionEdge = arr?.map((ed) =>
                    getEdge(
                      `cd${currentConditionNode + ed}`,
                      `cd${currentConditionNode}`,
                      `cd${currentConditionNode + ed}`,
                      getPosition(ed, props),
                      // 'label'
                    )
                  );

                  setEdges((prev) => [
                    ...prev,
                    getEdge(
                      `cd${currentConditionNode}`,
                      `${props?.id}`,
                      `cd${currentConditionNode}`,
                      {
                        x: props?.positionAbsoluteX,
                        y: props?.positionAbsoluteY + 150,
                      },
                      // 'label'
                    ),
                    ...conditionEdge,
                  ]);

                  const conditionNode = arr?.map((ed) => {
                    return {
                      id: `cd${currentConditionNode + ed}`,
                      type: "Conditions",
                      data: { type: "Conditions" },
                      position: getPosition(ed, props),
                      deletable: false,
                    };
                  });
                  setNodes([
                    ...prevInitNodes,
                    {
                      id: `cd${currentConditionNode}`,
                      type: type?.type,
                      deletable: false,
                      data: { type: type?.type },
                      position: {
                        x: props?.positionAbsoluteX,
                        y: props?.positionAbsoluteY + 150,
                      },
                    },
                    ...conditionNode,
                  ]);
                  setCurrentConditionNode((prev) => prev + 3);
                } else {
                  const edge = getEdge(
                    `p${currentPageNode}`,
                    `${props?.id}`,
                    `p${currentPageNode}`
                    // 'label'
                  );

                  setEdges((prev) => [...prev, edge]);

                  setNodes([
                    ...prevInitNodes,
                    {
                      id: `p${currentPageNode}`,
                      type: type?.type,
                      data: { type: type?.type },
                      deletable: false,
                      position: {
                        x: props?.positionAbsoluteX,
                        y: props?.positionAbsoluteY + 150,
                      },
                    },
                  ]);
                  setCurrentPageNode((prev) => prev + 1);
                }
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
      {copyNode === props?.id && copyNode !== "1" && (
        <div
          style={{
            position: "absolute",
          }}
          className="top-0 flex flex-col gap-2  ml-1 bg-white h-full w-8 items-center p-2 left-full rounded justify-between"
        >
          <Image src={CopyIcon} alt="copy" height={12} width={12} />
          <Image
            src={DeleteIcon}
            alt="delete"
            height={12}
            onClick={handleDeleteNode}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}

export default memo(CustomNode);
