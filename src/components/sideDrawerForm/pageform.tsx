import React from "react";
import FormWapper from "../formWrapper";
import Button from "../button";

const Pageform = ({
  handleSubmit,
  submitForm,
  formObject,
  register,
  errors,
  onChange,
  pageObjectData,
}: any) => {
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="grid grid-cols-1 w-full gap-4">
          <FormWapper
            formObject={formObject}
            register={register}
            errors={errors}
            onChange={onChange}
            className="!h-8 !text-xs"
          />
        </div>
        <div className="mt-2">
          <Button btnName="Submit" btnType="primary" type="submit" />
        </div>
      </form>
      {pageObjectData && (
        <div className="flex flex-col gap-1 mt-4">
          <div className="flex items-center gap-4 justify-between">
            <header className="text-sm font-semibold">Title:</header>
            <header className="text-sm font-normal">
              {pageObjectData?.heading?.title}
            </header>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <header className="text-sm font-semibold">Sub Title:</header>
            <header className="text-sm font-normal">
              {pageObjectData?.heading?.subTitle}
            </header>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <header className="text-sm font-semibold">Code:</header>
            <header className="text-sm font-normal">
              {pageObjectData?.code}
            </header>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <header className="text-sm font-semibold">Allow Skip:</header>
            <header className="text-sm font-normal">
              {pageObjectData?.allowSkip ? "True" : "False"}
            </header>
          </div>
        </div>
      )}
    </>
  );
};

export default Pageform;
