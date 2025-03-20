import React, { useCallback, useEffect, useState } from "react";
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
import StartHere from "../../public/start-here.svg";
import CustomNode from "@/components/CustomNode";
import Button from "@/components/button";
import CustomEdge from "@/components/customEdge";
import WotNotContextData from "@/context/wotnotData";
import conditionNode from "@/components/conditionNode";
import SideDrawer from "@/components/sideDrawer";
import { useFetch } from "@/hooks/useFetch";
import FetchApi from "@/utils/apiUtils";
import { FIELD_CONDITION, PAGE_LIST } from "@/utils/ApiConstants";
import { pageFormObject } from "@/utils/constants";
import { register } from "module";
import { useForm } from "react-hook-form";
import FormWapper from "@/components/formWrapper";
import { getSelectDataObject, updateSelectProps } from "@/utils/helpers";
import ConditionForm from "@/components/sideDrawerForm/conditionForm";
import Pageform from "@/components/sideDrawerForm/pageform";

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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    nodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    selectedNodeData,
  } = WotNotContextData();

  console.log("selectedNodeData", selectedNodeData?.data?.type);

  const [formObject, setFormObject] = useState(pageFormObject);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
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

  useEffect(() => {
    if (!data?.payload) return;

    const options = data?.payload?.map((ele: any) => ({
      label: ele?.name,
      value: ele?.id,
      details: ele,
    }));

    const newForm = updateSelectProps(pageFormObject, "page", options);
    setFormObject(newForm);
  }, [data]);
  const [pageObjectData, setPageObjectData] = useState(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataObject = getSelectDataObject(e);
    setPageObjectData(dataObject);
  };

  const submitForm = async (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex gap-4 justify-end bg-white p-4 h-fit">
        <Button
          btnName="Save"
          btnType="primary"
          onClick={() => console.log("test")}
        />
        <Button
          btnName="Publish"
          btnType="secondary"
          onClick={() => console.log("test")}
        />
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
      <SideDrawer isLoading={isFetching || isLoading}>
        {selectedNodeData?.data?.type === "Page" ? (
          <Pageform
            handleSubmit={handleSubmit}
            submitForm={submitForm}
            formObject={formObject}
            register={register}
            errors={errors}
            onChange={onChange}
            pageObjectData={pageObjectData}
          />
        ) : (
          <ConditionForm />
        )}
      </SideDrawer>
    </div>
  );
};

export default Index;
