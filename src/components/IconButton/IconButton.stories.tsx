// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import IconButton from "./IconButton";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: IconButton,
  title: "Components/IconButton",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof IconButton>;
const Template: Story<Props> = (args: Props) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "full",
};
