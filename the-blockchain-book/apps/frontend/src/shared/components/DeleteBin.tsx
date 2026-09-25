import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "../../styles/delete-bin.css";

type DeleteBinProps = {
  onClick: () => void;
};

type Pixel = {
  id: number;
  x: number;
  y: number;
  color: string;
};

export default function DeleteBin({ onClick }: DeleteBinProps) {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (isDeleting) return;
    setIsDeleting(true); // Adds the .deleting class instantly

    const newPixels = Array.from({ length: 12 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 25 + Math.random() * 45;

      return {
        id: Date.now() + i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        color: Math.random() > 0.4 ? "#ff0000" : "#ff5533",
      };
    });

    setPixels(newPixels);

    setTimeout(() => {
      onClick();
    }, 400);
  };

  return (
    <span
      className={`delete-span ${isDeleting ? "deleting" : ""}`}
      onClick={handleClick}
    >
      {/* Clean JSX with no inline opacity handling */}
      <FaTrash />

      {pixels.map((pixel) => (
        <span
          key={pixel.id}
          className="pixel-particle"
          style={
            {
              "--tx": `${pixel.x}px`,
              "--ty": `${pixel.y}px`,
              backgroundColor: pixel.color,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}
