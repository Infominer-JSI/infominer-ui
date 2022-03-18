// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Column from "./Column";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Column,
  title: "Components/Table/Column",
  decorators: [
    (Story: any) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Column>;
const Template: Story<Props> = (args: Props) => <Column {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Column",
  sort: "none",
};
