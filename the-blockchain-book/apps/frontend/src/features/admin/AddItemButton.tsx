import PopUp from "../../shared/components/PopUp";
import "../../styles/hover-add-item-button.css";

export function HoverAddItemButton({ label = "+", component, id = "" }) {
  return (
    <span className="hover-trigger-wrapper">
      <span className="hover-dot" aria-hidden="true" />
      <PopUp label={label} component={component} id={id} />
    </span>
  );
}
