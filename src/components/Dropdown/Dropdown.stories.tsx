// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Dropdown from "./Dropdown";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Dropdown,
  title: "Components/Dropdown",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Dropdown>;
const Template: Story<Props> = (args: Props) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  buttonText: "Dropdown",
  items: [
    { id: "a", label: "Option 1" },
    { id: "b", label: "Second Option" },
    { id: "c", label: "Option used Only if nothing else works" },
    { id: "d", label: "Option 4" },
  ],
};
