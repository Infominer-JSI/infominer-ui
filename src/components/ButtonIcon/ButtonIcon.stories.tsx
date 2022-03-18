// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import ButtonIcon from "./ButtonIcon";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: ButtonIcon,
  title: "Components/ButtonIcon",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof ButtonIcon>;
const Template: Story<Props> = (args: Props) => <ButtonIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "full",
};
