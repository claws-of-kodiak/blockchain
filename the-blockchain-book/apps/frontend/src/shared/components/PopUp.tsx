import { useState } from "react";
import "../../styles/pop-up.css";
import { Button } from "./Button";
import { setPosition } from "../../services/positionClient";

export default function PopUp({
  label,
  component: Component,
  id = "",
  position = null,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
    console.log(position);
    if (position) setPosition(position);
  };
  const closePopup = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button displayed to the user */}
      <Button onClick={openPopup} type="button" id={id}>
        {label}
      </Button>

      {/* Conditionally rendered popup interface */}
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            {/* The 'X' cancellation button */}
            <Button
              className="popup-close-btn"
              onClick={closePopup}
              type="button"
            >
              &times;
            </Button>

            {/* The dynamically injected form or layout element */}
            <Component onClose={closePopup} />
          </div>
        </div>
      )}
    </>
  );
}
