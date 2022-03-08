// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Icon from "./Icon";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Icon,
  title: "Components/Icon",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Icon>;
const Template: Story<Props> = (args: Props) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "angle-down",
};
