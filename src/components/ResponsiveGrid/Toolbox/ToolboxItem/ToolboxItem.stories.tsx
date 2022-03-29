// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import ToolboxItem from "./ToolboxItem";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: ToolboxItem,
  title: "Components/ResponsiveGrid/Toolbox/ToolboxItem",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof ToolboxItem>;
const Template: Story<Props> = (args: Props) => <ToolboxItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  item: { id: "0", label: "Authors", active: true },
};
