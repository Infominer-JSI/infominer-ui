// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Button from "./Button";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Button,
  title: "Components/Button",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Button>;
const Template: Story<Props> = (args: Props) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "full",
  variant: "base",
  children: "Click me!",
};

export const WithNumber = Template.bind({});
WithNumber.args = {
  type: "outline",
  icon: "angle-down",
  iconPosition: "right",
  variant: "base",
  children: "Click me!",
  number: 3,
};
