// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import FloatingButton from "./FloatingButton";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: FloatingButton,
  title: "Components/FloatingButton",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof FloatingButton>;
const Template: Story<Props> = (args: Props) => <FloatingButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: "medium",
};
