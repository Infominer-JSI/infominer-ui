// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Input from "./Input";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Input,
  title: "Components/Input",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Input>;
const Template: Story<Props> = (args: Props) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Subset Name",
  placeholder: "Insert name",
  validate: (input: string) => (input.includes("a") ? "Invalid Character: a" : null),
};
