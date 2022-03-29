// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import ResponsiveGrid from "./ResponsiveGrid";

//===============================================
// Configure Story
//===============================================

const storyComponent = {
  component: ResponsiveGrid,
  title: "Components/ResponsiveGrid",
};

export default storyComponent;

//===============================================
// Configure Story Versions
//===============================================

const divChild = (props: any) => {
  const { id, label } = props;
  return <div key={id}>{label}</div>;
};

type Props = React.ComponentProps<typeof ResponsiveGrid>;
const Template: Story<Props> = (args: Props) => <ResponsiveGrid {...args} />;

export const First = Template.bind({});
First.args = {
  layoutKey: "first",
  children: ["first"].map((label, id) => divChild({ id, label })),
};

export const Second = Template.bind({});
Second.args = {
  layoutKey: "second",
  toolboxTitle: "Toggle Graphs",
  toolboxItems: [
    { id: "0", label: "first" },
    { id: "1", label: "second" },
    { id: "2", label: "third" },
    { id: "3", label: "fourth" },
    { id: "4", label: "fifth" },
    { id: "5", label: "sixth" },
  ],
  children: ["first", "second", "third", "fourth", "fifth", "sixth"].map((label, id) =>
    divChild({ id, label }),
  ),
};

export const Third = Template.bind({});
Third.args = {
  layoutKey: "third",
  toolboxTitle: "Toggle Graphs",
  toolboxItems: [
    { id: "0", label: "first" },
    { id: "1", label: "second" },
    { id: "2", label: "third" },
  ],
  children: ["first", "second", "third", "fourth", "fifth", "sixth"].map((label, id) =>
    divChild({ id, label }),
  ),
};
