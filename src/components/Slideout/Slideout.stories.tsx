// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { loremIpsum } from "utils/constants";

// import the component
import Slideout from "./Slideout";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Slideout,
  title: "Components/Slideout",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Slideout>;
const Template: Story<Props> = (args: Props) => <Slideout {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: "Slideout Title",
  content: loremIpsum,
  actions: "This is the footer",
};
