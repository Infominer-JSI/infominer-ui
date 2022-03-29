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
  placeholder: "Select Options",
  items: [
    { id: "a", label: "Option 1" },
    { id: "b", label: "Option 2" },
    { id: "c", label: "Option 3" },
    { id: "d", label: "Option 4" },
  ],
};

const advancedPlaceholder = (
  <span className="inline-flex flex-col justify-start items-start">
    <span className="font-semibold text-sm text-base">Method Name</span>
    <span className="font-normal text-xs text-muted">Parameters</span>
  </span>
);

export const ComplexPlaceholder = Template.bind({});
ComplexPlaceholder.args = {
  placeholder: advancedPlaceholder,
  dynamicTitle: false,
  items: [
    { id: "a", label: "Subset Name 1" },
    { id: "b", label: "Subset Name 2" },
    { id: "c", label: "Subset Name 3" },
    { id: "d", label: "Subset Name 4" },
  ],
  className: "w-60",
};

export const ActionsDropdown = Template.bind({});
ActionsDropdown.args = {
  placeholder: "Actions",
  dropdownTitle: "Move to Subset",
  items: [
    { id: "a", label: "Subset Name 1" },
    { id: "b", label: "Subset Name 2" },
    { id: "c", label: "Subset Name 3" },
    { id: "d", label: "Subset Name 4" },
  ],
  actions: [
    {
      id: "delete",
      label: "Delete from Subset",
      className: "text-warning",
      onClick: () => {
        console.log("Delete");
      },
    },
  ],
};
