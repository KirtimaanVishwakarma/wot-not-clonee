import React, { useEffect, useState } from "react";
import FormWapper from "../formWrapper";
import { getSelectDataObject, updateSelectProps } from "@/utils/helpers";
import { pageFormObject } from "@/utils/constants";

const Pageform = ({
  selectedNodeData,
  data,
  register,
  errors,
  setValue,
  useWatch,
  control,
}: any) => {
  const [formObject, setFormObject] = useState(pageFormObject);
  const [pageObjectData, setPageObjectData] = useState<any>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataObject = getSelectDataObject(e);
    setValue(`page-${selectedNodeData?.id}`, dataObject);
    setPageObjectData(dataObject);
  };

  const pageData = useWatch({ control, name: `page-${selectedNodeData?.id}` });

  useEffect(() => {
    if (!data?.payload) return;
    const options = data?.payload?.map((ele: any) => ({
      label: ele?.name,
      value: ele?.id,
      details: ele,
    }));

    const newForm = updateSelectProps(
      pageFormObject,
      "page",
      options,
      selectedNodeData?.id
    );
    setFormObject(newForm);
  }, [data, selectedNodeData?.id]);

  return (
    <>
      {/* <form onSubmit={handleSubmit(submitForm)}> */}
      <div className="grid grid-cols-1 w-full gap-4">
        {selectedNodeData?.id && (
          <FormWapper
            formObject={formObject}
            register={register}
            errors={errors}
            onChange={onChange}
            className="!h-8 !text-xs"
          />
        )}
      </div>
      {(pageObjectData || pageData) && (
        <div className="flex flex-col gap-1 mt-4">
          <div className="flex items-center gap-4 justify-between">
            <header className="text-sm font-semibold">Title:</header>
            <header className="text-sm font-normal">
              {pageObjectData?.heading?.title || pageData?.heading?.title}
            </header>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <header className="text-sm font-semibold">Sub Title:</header>
            <header className="text-sm font-normal">
              {pageObjectData?.heading?.subTitle || pageData?.heading?.subTitle}
            </header>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <header className="text-sm font-semibold">Code:</header>
            <header className="text-sm font-normal">
              {pageObjectData?.code || pageData?.code}
            </header>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <header className="text-sm font-semibold">Allow Skip:</header>
            <header className="text-sm font-normal">
              {pageObjectData?.allowSkip || pageData?.allowSkip
                ? "True"
                : "False"}
            </header>
          </div>
        </div>
      )}
    </>
  );
};

export default Pageform;
