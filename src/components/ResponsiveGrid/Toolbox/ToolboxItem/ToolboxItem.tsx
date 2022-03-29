// import modules
import Button from "components/Button";

//===============================================
// Define the state interfaces
//===============================================

interface IToolboxItem {
  item: { id: string; label: string; active: boolean; grid?: { [key: string]: any } };
  onClickItem?: (item: IToolboxItem["item"]) => void;
}

//===============================================
// Define the component
//===============================================

export default function ToolboxItem(props: IToolboxItem) {
  const { item, onClickItem } = props;
  return (
    <Button
      onClick={onClickItem?.bind(undefined, item)}
      variant={item.active ? "base" : "inactive"}
      type="outline">
      {item.label}
    </Button>
  );
}
