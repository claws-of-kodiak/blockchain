import { setPosition } from "../../services/positionClient";
import PopUp from "../../shared/components/PopUp";
import "../../styles/hover-add-item-button.css";

type AddItemButtonProps = {
  label?: string;
  component: React.FunctionComponent;
  id?: string;
  position: number;
};

export function HoverAddItemButton({
  label = "+",
  component,
  id,
  position,
}: AddItemButtonProps) {
  return (
    <span className="hover-trigger-wrapper">
      <span className="hover-dot" aria-hidden="true" />
      <PopUp label={label} component={component} id={id} position={position} />
    </span>
  );
}
