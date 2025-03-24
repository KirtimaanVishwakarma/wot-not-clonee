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
    control,
    useWatch,
    watch,
  }: any = WotNotContextData();
  const { data, selected, id } = props;

  const pageData = useWatch({ control, name: `page-${id}` });

  const [addNewNode, setAddNewNode] = React.useState<string>("");
  const [copyNode, setCopyNode] = React.useState<string>("");
  const nodeId = useNodeId();
  const { setNodes } = useReactFlow();
  const { setIsOpen }: any = SideDrawerProvider();

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

  const getConditionTitles = () => {
    const filteredEdge = edges?.filter((edg) => edg?.source === id);
    const watchClone = watch();
    const conditionData = filteredEdge?.map((edg) => {
      if (
        watchClone[`condition_${edg?.id}-${edg?.source}`] &&
        watchClone[`matchType_${edg?.id}-${edg?.source}`]
      ) {
        return {
          condition: watchClone[`condition_${edg?.id}-${edg?.source}`],
          matchType: watchClone[`matchType_${edg?.id}-${edg?.source}`],
        };
      }
      return null;
    });

    return conditionData;
  };

  const NodeData = (watchedData: any, type: string) => {
    let returnData = null;
    switch (type) {
      case "Page":
        returnData = watchedData?.heading?.title || watchedData?.name;
        break;
      case "Condition":
        returnData = getConditionTitles()?.some((ele) => !!ele)
          ? getConditionTitles()
          : null;
        break;
      default:
        returnData = null;
        break;
    }

    return returnData;
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
      <div
        className="flex min-h-10 gap-3 w-36 justify-start items-center"
        onClick={() => {
          setSelectedNodeData(props);
          setIsOpen(true);
        }}
      >
        <Image
          src={data?.start ? RefFlagIcon : selectionIcons[data?.type]?.icon}
          alt="start here"
          height={22}
        />
        <div className="text-black text-xs font-normal whitespace-nowrap truncate">
          {data?.type === "Page" ? (
            <header> {NodeData(pageData, data?.type) || "Select Page"}</header>
          ) : data?.type === "Condition" ? (
            NodeData(pageData, data?.type) ? (
              // (
              // NodeData(pageData, data?.type) ? (
              //   <div className="flex flex-col gap-1">
              //     {NodeData(pageData, data?.type)?.map((ele, ind) => {
              //       if (ele) {
              //         return (
              //           <div key={ind} className="flex gap-1">
              //             <span className="text-green-500 font-medium">{ele?.matchType}</span>
              //             <div>
              //               {ele?.condition?.map((item, index) => (
              //                 <span key={index}>
              //                   {item?.variable}
              //                   {item?.operator}
              //                   {item?.value}
              //                 </span>
              //               ))}
              //             </div>
              //           </div>
              //         );
              //       }
              //       return null;
              //     })}
              //   </div>
              // ) : (
              //   <header>Select Conditions</header>
              // )
              // )
              <header>Select Conditions</header>
            ) : (
              <header>Select Conditions</header>
            )
          ) : (
            "Bot is triggered if…"
          )}
        </div>
      </div>
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

                const currNode = nodes?.find((n: any) => n.id === addNewNode);

                const nodeIndex = nodes?.findIndex(
                  (n: any) => n.id === addNewNode
                );

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
                      getPosition(ed, props)
                      // 'label'
                    )
                  );

                  setEdges((prev: any) => [
                    ...prev,
                    getEdge(
                      `cd${currentConditionNode}`,
                      `${props?.id}`,
                      `cd${currentConditionNode}`,
                      {
                        x: props?.positionAbsoluteX,
                        y: props?.positionAbsoluteY + 150,
                      }
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
                  setCurrentConditionNode((prev: any) => prev + 3);
                } else {
                  const edge = getEdge(
                    `p${currentPageNode}`,
                    `${props?.id}`,
                    `p${currentPageNode}`
                    // 'label'
                  );

                  setEdges((prev: any) => [...prev, edge]);

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
                  setCurrentPageNode((prev: any) => prev + 1);
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
