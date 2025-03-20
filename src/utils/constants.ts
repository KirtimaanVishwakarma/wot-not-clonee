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

export const pageFormObject = [
  {
    type: "select",
    span: "col-span-1",
    label: "select page",
    form: {
      required: "required",
    },
    id: "page",
    placeholder: "select page...",
    selectProps: [],
  },
];

export const conditionForm = [
  {
    type: "select",
    span: "col-span-1",
    // label: "select Variable",
    id: "variable",
    placeholder: "Select Variable",
    className: "!h-4",
    selectProps: [
      { label: "Total Revenue", value: "totalRevenue" },
      { label: "Net Revenue", value: "netRevenue" },
      { label: "Gross Revenue", value: "grossRevenue" },
      { label: "Revenue Growth Rate", value: "revenueGrowthRate" },
      { label: "Monthly Revenue", value: "monthlyRevenue" },
      { label: "Yearly Revenue", value: "yearlyRevenue" },
      { label: "Quarterly Revenue", value: "quarterlyRevenue" },
      { label: "Revenue Per Customer", value: "revenuePerCustomer" },
      { label: "Revenue from New Customers", value: "newCustomerRevenue" },
      {
        label: "Revenue from Returning Customers",
        value: "returningCustomerRevenue",
      },
      { label: "Projected Revenue", value: "projectedRevenue" },
    ],
  },
  {
    type: "select",
    span: "col-span-1",
    // label: "Select Operater",
    id: "operator",
    placeholder: "Select operator...",
    selectProps: [
      { label: "Equal to", value: "==" },
      { label: "Not equal to", value: "!=" },
      { label: "Greater than", value: ">" },
      { label: "Greater than or equal to", value: ">=" },
      { label: "Less than", value: "<" },
      { label: "Less than or equal to", value: "<=" },
      { label: "Logical AND", value: "&&" },
      { label: "Logical OR", value: "||" },
      { label: "Addition", value: "+" },
      { label: "Subtraction", value: "-" },
      { label: "Multiplication", value: "*" },
      { label: "Division", value: "/" },
      { label: "Modulus", value: "%" },
      { label: "Exponentiation", value: "**" },
    ],
  },
  {
    type: "text",
    span: "col-span-1",
    // label: "select page",
    id: "value",
    placeholder: "Please enter value",
  },
];
