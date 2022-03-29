// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Toolbox from "./Toolbox";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Toolbox,
  title: "Components/ResponsiveGrid/Toolbox",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Toolbox>;
const Template: Story<Props> = (args: Props) => <Toolbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Show Selected Graphs",
  items: [
    { id: "0", label: "Authors", active: true },
    { id: "1", label: "Title", active: true },
    { id: "2", label: "Abstract", active: false },
    { id: "3", label: "Age", active: false },
    { id: "4", label: "This is a Longer Label", active: true },
  ],
};
