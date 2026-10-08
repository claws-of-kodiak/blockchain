import PopUp from "../../shared/components/PopUp";
import "../../styles/hover-add-item-button.css";

export function HoverAddItemButton({
  label = "+",
  component,
  id = "",
  position,
}) {
  // NEED TO INTEGRATE POSITION AND PASS TO SERVER FOR REPO
  // THIS WILL LEAD TO PROP DRILLING - NEED BETTER SOLUTION - positionClient.ts??
  console.log(position);
  return (
    <span className="hover-trigger-wrapper">
      <span className="hover-dot" aria-hidden="true" />
      <PopUp label={label} component={component} id={id} />
    </span>
  );
}
