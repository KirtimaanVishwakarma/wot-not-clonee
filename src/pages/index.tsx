import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  BackgroundVariant,
  Panel,
  EdgeTypes,
} from "@xyflow/react";
import CustomNode from "@/components/CustomNode";
import Button from "@/components/button";
import CustomEdge from "@/components/customEdge";
import WotNotContextData from "@/context/wotnotData";
import conditionNode from "@/components/conditionNode";
import SideTab from "@/components/sideTab";
import { useFetch } from "@/hooks/useFetch";
import FetchApi from "@/utils/apiUtils";
import { FIELD_CONDITION, PAGE_LIST } from "@/utils/ApiConstants";
import ConditionForm from "@/components/sideDrawerForm/conditionForm";
import Pageform from "@/components/sideDrawerForm/pageform";
import SideDrawerProvider from "@/context/wotnotSideDrawer";
import { useForm, useWatch } from "react-hook-form";

const nodeTypes = {
  Page: CustomNode,
  Condition: CustomNode,
  Conditions: conditionNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};
const Index = () => {
  const {
    nodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    selectedNodeData,
    register,
    handleSubmit,
    errors,
    control,
    useWatch,
    setValue,
  }: any = WotNotContextData();

  const { isOpen } = SideDrawerProvider();

  // const {
  //   register,
  //   formState: { errors },
  //   setValue,
  //   control,
  // } = useForm();

  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges]
  );

  const fetchPageList = async () => {
    const res = await FetchApi(PAGE_LIST, "GET", {
      authorization: "Basic b2F1dGhfY2xpZW50X2lkOnNlY3JldC1hcHA=",
    });
    return res;
  };

  const { data, isError, isFetching, isLoading } = useFetch({
    name: ["fetchPageList"],
    fn: () => fetchPageList(),
  });

  const fetchFieldCondition = async () => {
    const res = await FetchApi(FIELD_CONDITION, "GET", {
      authorization: "Basic b2F1dGhfY2xpZW50X2lkOnNlY3JldC1hcHA=",
    });
    return res;
  };

  const {
    data: FieldConditions,
    isError: isErrorFieldConditions,
    isFetching: isFetchingFieldConditions,
    isLoading: isLoadingFieldConditions,
  } = useFetch({
    name: ["fetchFieldCondition"],
    fn: () => fetchFieldCondition(),
  });

  const submitForm = async (formData) => {
    console.log(formData);

    // console.log("nodes", nodes);
    console.log("edges", edges);
  };

  return (
    // <div className="flex flex-col h-screen">
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col h-screen"
    >
      <div className="flex gap-4 justify-end bg-white p-4 h-fit">
        <Button
          btnName="Save"
          btnType="primary"
          // onClick={() => console.log("test")}
        />
        <Button btnName="Publish" btnType="secondary" type="submit" />
      </div>

      <div className="h-full w-screen bg-[#E5E4E2]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        >
          <MiniMap />
          <Controls />
          <Panel position="top-left" className="text-blue-400">
            Flow
          </Panel>
          <Panel position="bottom-center">
            <Controls
              orientation="horizontal"
              className="border border-red-500 center text-xl"
            />
          </Panel>
          <Background color="blue" variant={BackgroundVariant.Dots} gap={12} />
        </ReactFlow>
      </div>
      <SideTab
        isLoading={
          !isOpen ||
          isFetching ||
          isLoading ||
          isFetchingFieldConditions ||
          isLoadingFieldConditions
        }
      >
        {selectedNodeData?.data?.type === "Page" ? (
          <Pageform
            selectedNodeData={selectedNodeData}
            data={data}
            register={register}
            errors={errors}
            setValue={setValue}
            useWatch={useWatch}
            control={control}
          />
        ) : (
          <ConditionForm selectedNodeData={selectedNodeData} />
        )}
      </SideTab>
    </form>
  );
};

export default Index;
