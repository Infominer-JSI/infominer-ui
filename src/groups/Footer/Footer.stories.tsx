// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Footer from "./Footer";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Footer,
  title: "Groups/Footer",
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Footer>;
const Template: Story<Props> = () => <Footer />;

export const Default = Template.bind({});
Default.args = {};
