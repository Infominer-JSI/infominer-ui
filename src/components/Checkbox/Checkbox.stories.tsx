// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Checkbox from "./Checkbox";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Checkbox,
  title: "Components/Checkbox",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Checkbox>;
const Template: Story<Props> = (args: Props) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Label Name",
};
