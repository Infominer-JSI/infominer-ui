// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";

// import the component
import Modal from "./Modal";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Modal,
  title: "Components/Modal",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Modal>;
const Template: Story<Props> = (args: Props) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: "Modal Title",
  content: "This is the content",
  actions: "This is the footer",
};
