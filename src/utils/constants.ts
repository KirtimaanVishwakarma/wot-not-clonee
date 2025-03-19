import NodeIcon from "../../public/wotnot/node-tree.svg";
import PageIcon from "../../public/wotnot/pages.svg";
import { SelectionTypeInterface } from "./interface";

export const selectionType: SelectionTypeInterface = [
  { type: "Page", icon: PageIcon, bgColor: "#F0FFFF" },
  { type: "Condition", icon: NodeIcon, bgColor: "#FFF8DC" },
];

export const selectionIcons: any = {
  Page: { icon: PageIcon, bgColor: "before:!bg-blue-400" },
  Condition: { icon: NodeIcon, bgColor: "before:!bg-yellow-400" },
};
export type EdgeType = {
  id: string;
  source: string;
  target: string;
  label: string;
  type: "custom" | "straight";
  deletable: boolean;
};

export const getEdge = (
  id = "",
  source = "",
  target = "",
  label = "",
  type = "custom",
  deletable = false
) => {
  return {
    id,
    source,
    target,
    label,
    type,
    deletable,
  };
};

export const FormObject = [
  {
    type: "text",
    span: "col-span-1",
    label: "select text",
    form: {
      required: "required",
    },
    id: "check",
    placeholder: "select page...",
  },
  {
    type: "select",
    span: "col-span-1",
    label: "select page",
    form: {
      required: "required",
    },
    id: "page",
    placeholder: "select page...",
    selectProps: [
      { label: "test1", value: "test1" },
      { label: "test2", value: "test2" },
      { label: "test3", value: "test3" },
      { label: "test4", value: "test4" },
    ],
  },
];
