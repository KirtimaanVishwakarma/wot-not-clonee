import React, { useEffect, useState } from "react";
import Image from "next/image";
import ArrowRight from "../../../public/wotnot/arrow-right.svg";
import DeleteIcon from "../../../public/wotnot/delete-icon.svg";
import Pluse from "../../../public/wotnot/plus-icon.svg";
import Button from "../button";
import { conditionForm, getEdge } from "@/utils/constants";
import { useFieldArray } from "react-hook-form";
import DynamicFormWrapper from "../dynamicFormWrapper";
import WotNotContextData from "@/context/wotnotData";

const Conditions = ({
  setSelectedBranchCondition,
  selectedBranchCondition,
  control,
  selectedNodeData,
  errors,
  register,
  setValue,
  useWatch,
  watch,
}: any) => {
  const btns = ["ANY", "ALL"];
  const [matchType, setMatchType] = useState(
    watch()[`matchType_${selectedBranchCondition}-${selectedNodeData?.id}`] ||
      "ANY"
  );

  const {
    fields: liveStockFields,
    append: appendLiveStockFields,
    remove: removeLiveStockFields,
    replace,
  } = useFieldArray({
    control,
    name: `condition_${selectedBranchCondition}-${selectedNodeData?.id}`,
  });

  const conditionData = useWatch({
    control,
    name: `condition_${selectedBranchCondition}-${selectedNodeData?.id}`,
  });

  useEffect(() => {
    // if (!conditionData) return;
    setValue(
      `matchType_${selectedBranchCondition}-${selectedNodeData?.id}`,
      matchType
    );
  }, [matchType]);

  useEffect(() => {
    if (selectedNodeData?.id) {
      const newValues = conditionData || [
        { variable: "", operator: "", value: "" },
      ];
      replace(newValues);
    }
  }, [`${selectedBranchCondition}-${selectedNodeData?.id}`]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={ArrowRight}
          alt="arrow"
          height={12}
          className="rotate-180 cursor-pointer"
          onClick={() => setSelectedBranchCondition("")}
        />
        <header>Condition {selectedBranchCondition}</header>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span>if</span>
          <div className="flex items-center border border-gray-700 rounded overflow-hidden">
            {btns?.map((btn) => (
              <span
                className={`px-4 flex-1 cursor-pointer ${
                  matchType === btn
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
                key={btn}
                onClick={() => setMatchType(btn)}
              >
                {btn}
              </span>
            ))}
          </div>
          <span>condition are met</span>
        </div>
        {liveStockFields?.length > 0 &&
          liveStockFields?.map((form, index) => (
            <div className="border-l-2 border-blue-500 pl-2" key={form?.id}>
              <div className="flex justify-between mb-2">
                <header>Condition {index + 1}</header>
                {liveStockFields?.length !== 1 && (
                  <Image
                    src={DeleteIcon}
                    alt="delete"
                    height={18}
                    className="cursor-pointer"
                    onClick={() => removeLiveStockFields(index)}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 gap-1 w-full">
                <DynamicFormWrapper
                  dynamicFieldName={`condition_${selectedBranchCondition}-${selectedNodeData?.id}`}
                  errors={errors}
                  formObject={conditionForm}
                  index={index}
                  register={register}
                  className="!h-8 !text-xs"
                />
              </div>
            </div>
          ))}
        <Button
          btnName="Add Condition"
          btnType="custom"
          icon={Pluse}
          className="!w-fit !text-xs border !border-gray-700 !text-gray-700 !p-2"
          onClick={() =>
            appendLiveStockFields({
              variable: "",
              operator: "",
              value: "",
            })
          }
        />
      </div>
    </div>
  );
};

const ConditionForm = ({ selectedNodeData }: any) => {
  const [selectedBranchCondition, setSelectedBranchCondition] = useState("");
  const {
    nodes,
    edges,
    setEdges,
    setNodes,
    currentConditionNode,
    setCurrentConditionNode,
    register,
    handleSubmit,
    errors,
    control,
    getValues,
    setValue,
    watch,
    useWatch,
  }: any = WotNotContextData();

  const handleAddNode = (activeNodes: any) => {
    const filteredEdge = edges?.filter(
      (fil: any) => fil?.source === selectedNodeData?.id
    );
    const lastEdge = filteredEdge?.[filteredEdge?.length - 1];
    const lastNode = activeNodes?.find((ele: any) => ele?.id === lastEdge?.id);
    setEdges((prev: any) => [
      ...prev,
      getEdge(
        `cd${currentConditionNode}`,
        `${selectedNodeData?.id}`,
        `cd${currentConditionNode}`,
        {
          x: lastNode?.position?.x + 200,
          y: lastNode?.position?.y,
        }
      ),
    ]);

    setNodes([
      ...activeNodes,
      {
        id: `cd${currentConditionNode}`,
        type: "Conditions",
        deletable: false,
        data: { type: "Conditions" },
        position: {
          x: lastEdge?.position?.x + 200,
          y: lastEdge?.position?.y,
        },
      },
    ]);
    setCurrentConditionNode((prev: any) => prev + 1);
  };

  const removeConditionHandler = (ele: any) => {
    const filteredEdge = edges?.filter((edge: any) => edge?.id !== ele?.id);
    const filteredNode = nodes?.filter((node: any) => node?.id !== ele?.id);
    setEdges(filteredEdge);
    setNodes(filteredNode);
  };

  const conditionDetail = (ele: any) => {
    const watchData = watch();

    const conditionData = watchData?.[`condition_${ele?.id}-${ele?.source}`];
    const matchType = watchData?.[`matchType_${ele?.id}-${ele?.source}`];
    if (conditionData && matchType) {
      return {
        conditionData,
        matchType,
      };
    }
    return null;
  };
  return (
    <>
      {!selectedBranchCondition ? (
        <div className="flex flex-col gap-3">
          {edges
            ?.filter((fil: any) => fil?.source === selectedNodeData?.id)
            ?.map((ele: any, ind: number, arr: any) => {
              const conditions = conditionDetail(ele);
              return (
                <div key={ele?.id}>
                  <header className="font-medium text-sm mb-2">
                    Branch {ind + 1}
                  </header>
                  <div className="flex justify-between gap-3 items-center">
                    <div
                      className="flex w-full flex-col gap-1"
                      onClick={() => setSelectedBranchCondition(ele?.id)}
                    >
                      <div className="flex justify-between items-center bg-gray-200 p-3 rounded text-gray-800 cursor-pointer">
                        <div className="font-medium text-xs">
                          {conditions ? (
                            <div className="flex items-center gap-2">
                              <header className="font-semibold text-base text-green-500">
                                {conditions?.matchType}
                              </header>
                              <div className=" flex-wrap flex gap-x-2 text-blue-500">
                                {conditions?.conditionData?.map(
                                  (condition: any, ind: number) => (
                                    <span
                                      className="bg-gray-400 p-1 text-sm text-white rounded"
                                      key={ind}
                                    >
                                      {`${condition?.variable} ${condition?.operator} ${condition?.value}`}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          ) : (
                            <header>Condition {ind + 1}</header>
                          )}
                        </div>
                        <Image src={ArrowRight} alt="arrow" height={12} />
                      </div>
                    </div>
                    {arr?.length !== 1 ? (
                      <Image
                        src={DeleteIcon}
                        alt="delete"
                        height={18}
                        className="cursor-pointer"
                        onClick={() => removeConditionHandler(ele)}
                      />
                    ) : (
                      <div className="w-5" />
                    )}
                  </div>
                </div>
              );
            })}
          <Button
            btnName="Add Condition"
            btnType="custom"
            icon={Pluse}
            className="!w-fit !text-xs border !border-gray-700 !text-gray-700 !p-2"
            onClick={() => handleAddNode(nodes)}
          />
        </div>
      ) : (
        <Conditions
          setSelectedBranchCondition={setSelectedBranchCondition}
          selectedBranchCondition={selectedBranchCondition}
          control={control}
          selectedNodeData={selectedNodeData}
          errors={errors}
          register={register}
          setValue={setValue}
          useWatch={useWatch}
          watch={watch}
        />
      )}
    </>
  );
};

export default ConditionForm;
