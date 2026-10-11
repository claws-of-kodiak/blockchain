import React from "react";
import "../../styles/shared-list.css";

export interface ListItem {
  id: string | number;
  content: React.ReactNode;
  badge?: string;
  meta?: string;
}

export interface SharedListProps {
  /** Array of items to render */
  items: ListItem[];
  /** Layout direction */
  direction?: "vertical" | "horizontal";
  /** Bullet style option */
  bulletStyle?: "default" | "none" | "emoji";
  /** Custom emoji when bulletStyle is 'emoji' */
  customEmoji?: string;
  /** Optional title for the list header */
  title?: string;
  /** Optional additional class name for the root container */
  className?: string;
}

export const SharedList: React.FC<SharedListProps> = ({
  items,
  direction = "vertical",
  bulletStyle = "default",
  customEmoji = "📌",
  title,
  className = "",
}) => {
  const containerClasses = [
    "retro-list-container",
    `retro-list--${direction}`,
    `retro-bullet--${bulletStyle}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      {title && (
        <div className="retro-list-header">
          <span className="retro-terminal-prompt">&gt;</span>
          <h3 className="retro-list-title">{title}</h3>
          <span className="retro-cursor">_</span>
        </div>
      )}
      <ul className="retro-list">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="retro-list-item"
            style={{ "--item-index": index } as React.CSSProperties}
          >
            {bulletStyle === "emoji" && (
              <span className="retro-bullet-custom" aria-hidden="true">
                {customEmoji}
              </span>
            )}
            <div className="retro-item-content-wrapper">
              <div className="retro-item-main">{item.content}</div>
              {item.badge && <span className="retro-badge">{item.badge}</span>}
              {item.meta && <span className="retro-meta">{item.meta}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedList;
