// import modules
import React from "react";
import { Story } from "@storybook/react/types-6-0";
// import the component
import Table from "./Table";
import Button from "components/Button";
import Dropdown from "components/Dropdown";

// import the formatters
import { formatNumber, formatString } from "utils/formatters";
import { wrapperPill } from "utils/wrappers";

// ==============================================
// Configure Story
// ==============================================

const storyComponent = {
  component: Table,
  title: "Components/Table",
  decorators: [(Story: any) => <Story />],
};

export default storyComponent;

// ==============================================
// Configure Story Versions
// ==============================================

type Props = React.ComponentProps<typeof Table>;
const Template: Story<Props> = (args: Props) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Documents Metadata Table",
  columns: [
    { dataKey: "id", label: "ID", dataType: "number", dataFormatter: (data) => formatNumber(data) },
    { dataKey: "name", label: "Name" },
    { dataKey: "surname", label: "Surname" },
    {
      dataKey: "age",
      label: "Age",
      dataType: "number",
      dataFormatter: (data) => formatNumber(data),
    },
    { dataKey: "profession", label: "profession", headerFormatter: (label) => formatString(label) },
    {
      dataKey: "livesIn",
      label: "thisIs_aComplex_label",
      headerFormatter: (label) => formatString(label),
    },
    { dataKey: "worksAt", label: "Works At" },
    {
      dataKey: "active",
      label: "Active",
      dataType: "class",
      dataFormatter: (data) => wrapperPill(data),
    },
  ],
  data: [
    { id: 1, name: "Charlie", surname: "Chaplin", age: 45, profession: "Comedian", active: "Yes" },
    { id: 2, name: "Ronnie", surname: "Barker", age: 23, profession: "Comedian", active: "Yes" },
    { id: 3, name: "Peter", surname: "Sellers", age: 10, profession: "Comedian", active: "Yes" },
    { id: 4, name: "Spike", surname: "Milligan", age: 55, profession: "Comedian", active: "Yes" },
    {
      id: 5,
      name: "Rowan",
      surname: "Atkinson",
      age: 76,
      profession: "Comedian Comedian Comedian Comedian",
      active: "No",
    },
    { id: 6, name: "David", surname: "Jason", age: 1, profession: "Comedian", active: "Yes" },
    {
      id: 7,
      name: "John",
      surname: "Cleese",
      age: 100000000,
      profession: "Comedian",
      active: "No",
    },
    { id: 8, name: "Caroline", surname: "Aherne", age: 20, profession: "Comedian", active: "No" },
    {
      id: 9,
      name: "Benny",
      surname: "Hill",
      age: 1234567890,
      profession: "Comedian",
      active: "No",
    },
    {
      id: 10,
      name: "Billy",
      surname: "Connolly",
      age: 0.0987654321,
      profession: "Comedian",
      active: "No",
    },
    {
      id: 11,
      name: "Jimmy",
      surname: "Carr",
      age: 0.000421,
      profession: "Comedian",
      active: "Yes",
    },
  ],
  headActions: (
    <React.Fragment>
      <Button icon="plus" iconPosition="left" type="outline" variant="base">
        Button 1
      </Button>
      <Button type="outline" variant="base">
        Button 2
      </Button>
      <Dropdown
        placeholder="Actions"
        dropdownTitle="Move to Subset"
        dynamicTitle={false}
        noHightlights={true}
        listPosition="right"
        items={[
          { id: "a", label: "Subset Name 1" },
          { id: "b", label: "Subset Name 2" },
          { id: "c", label: "Subset Name 3" },
          { id: "d", label: "Subset Name 4" },
        ]}
        actions={[
          {
            id: "delete",
            label: "Delete from Subset",
            className: "text-warning",
            onClick: () => {
              console.log("Delete");
            },
          },
        ]}
      />
    </React.Fragment>
  ),
  footActions: (
    <React.Fragment>
      <Button type="outline" variant="muted">
        Button 1
      </Button>
    </React.Fragment>
  ),
};
