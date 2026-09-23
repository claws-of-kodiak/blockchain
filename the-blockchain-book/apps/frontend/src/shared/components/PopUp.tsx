import { useState } from "react";
import "../../styles/pop-up.css";

export default function PopUp({ label, component: Component }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button displayed to the user */}
      <button onClick={openPopup} type="button">
        {label}
      </button>

      {/* Conditionally rendered popup interface */}
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            {/* The 'X' cancellation button */}
            <button
              className="popup-close-btn"
              onClick={closePopup}
              type="button"
            >
              &times;
            </button>

            {/* The dynamically injected form or layout element */}
            <Component onClose={closePopup} />
          </div>
        </div>
      )}
    </>
  );
}
