// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Textarea from "./Textarea";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Textarea,
  title: "Components/Textarea",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Textarea>;
const Template: Story<Props> = (args: Props) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Subset Description",
  placeholder: "Insert description",
  validate: (input: string) => (input.includes("a") ? "Invalid Character: a" : null),
  rows: 5,
};
