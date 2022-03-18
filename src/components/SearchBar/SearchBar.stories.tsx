// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import SearchBar from "./SearchBar";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: SearchBar,
  title: "Components/SearchBar",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof SearchBar>;
const Template: Story<Props> = (args: Props) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search for Datasets",
};
