// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Action from "./Action";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Action,
  title: "Components/Action",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Action>;
const Template: Story<Props> = (args: Props) => <Action {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Click me!",
  icon: "dashboard",
  active: true,
};
