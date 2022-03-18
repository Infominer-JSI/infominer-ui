// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Pill from "./Pill";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Pill,
  title: "Components/Pill",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Pill>;
const Template: Story<Props> = (args: Props) => <Pill {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Badge",
};
