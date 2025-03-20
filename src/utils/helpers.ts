export const updateSelectProps = (
  formObj: any,
  id: string,
  updatedOptions: [{ label: string; value: string; details: any }]
) => {
  const newForm = JSON.parse(JSON.stringify(formObj));
  const selectObj = newForm.find((ele: any) => ele?.id === id);
  selectObj.selectProps = updatedOptions;
  return newForm;
};

export const getSelectDataObject = (e: any) => {
  const data = e.target?.selectedOptions[0]?.getAttribute("data-object");
  return JSON.parse(data);
};
