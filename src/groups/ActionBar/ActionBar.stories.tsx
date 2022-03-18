// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import ActionBar from "./ActionBar";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: ActionBar,
  title: "Groups/ActionBar",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof ActionBar>;
const Template: Story<Props> = (args: Props) => <ActionBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  actions: [
    { text: "Dashboard", icon: "dashboard", onClick: () => {}, active: true },
    { text: "Documents", icon: "table", onClick: () => {}, active: false },
    { text: "Compare Analysis", icon: "compare", onClick: () => {}, active: false },
  ],
};
