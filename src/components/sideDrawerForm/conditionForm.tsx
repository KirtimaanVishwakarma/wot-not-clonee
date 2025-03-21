import React, { useEffect, useState } from "react";
import Image from "next/image";
import ArrowRight from "../../../public/wotnot/arrow-right.svg";
import DeleteIcon from "../../../public/wotnot/delete-icon.svg";
import Pluse from "../../../public/wotnot/plus-icon.svg";
import Button from "../button";
import { conditionForm, getEdge } from "@/utils/constants";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import DynamicFormWrapper from "../dynamicFormWrapper";
import WotNotContextData from "@/context/wotnotData";

const Conditions = ({
  setSelectedBranchCondition,
  selectedBranchCondition,
  control,
  selectedNodeData,
  errors,
  register,
}: any) => {
  const btns = ["ANY", "ALL"];
  const [matchType, setMatchType] = useState("ANY");
  const [rules, setRules] = useState({});

  const {
    fields: liveStockFields,
    append: appendLiveStockFields,
    remove: removeLiveStockFields,
    replace,
  } = useFieldArray({
    control,
    name: `${selectedBranchCondition}-${selectedNodeData?.id}`,
  });

  const conditionData = useWatch({
    control,
    name: `${selectedBranchCondition}-${selectedNodeData?.id}`,
  });
  console.log("conditionData", conditionData);

  useEffect(() => {
    if (!conditionData) return;
    // setRules, selectedBtn
    const conditions = conditionData?.map((condition) => ({
      condition: `${condition?.variable} ${condition?.operator} ${condition?.value}`,
    }));
    const rules = {
      conditions,
      matchType,
    };

    console.log("rules", rules);
  }, [conditionData]);

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
                  dynamicFieldName={`${selectedBranchCondition}-${selectedNodeData?.id}`}
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
  } = WotNotContextData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {},
  });

  const handleAddNode = (activeNodes) => {
    const filteredEdge = edges?.filter(
      (fil) => fil?.source === selectedNodeData?.id
    );
    const lastEdge = filteredEdge?.[filteredEdge?.length - 1];
    const lastNode = activeNodes?.find((ele) => ele?.id === lastEdge?.id);
    setEdges((prev) => [
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
    setCurrentConditionNode((prev) => prev + 1);
  };

  const removeConditionHandler = (ele) => {
    const filteredEdge = edges?.filter((edge) => edge?.id !== ele?.id);
    const filteredNode = nodes?.filter((node) => node?.id !== ele?.id);
    setEdges(filteredEdge);
    setNodes(filteredNode);
  };
  return (
    <>
      {!selectedBranchCondition ? (
        <div className="flex flex-col gap-3">
          {edges
            ?.filter((fil) => fil?.source === selectedNodeData?.id)
            ?.map((ele, ind, arr) => (
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
                      <header className="font-medium text-xs">
                        Condition {ind + 1}
                      </header>
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
            ))}
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
        />
      )}
    </>
  );
};

export default ConditionForm;
