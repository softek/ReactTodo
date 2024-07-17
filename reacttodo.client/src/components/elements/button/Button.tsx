import React from 'react';

export interface ButtonProps {
  /**
   * Button label. Will be used for button content if children are not provided.
   * Always used as aria-label.
   */
  label: string;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Button contents, can be any valid JSX that can be nested under a <button> element
   */
  children?: React.ReactNode;
}

/**
 * Button component that supports text and JSX content.
 */
export function Button({ label, onClick, children }: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="px-4 py-2 bg-cyan-500 text-white rounded-full shadow-sm"
    >
      {children ?? label}
    </button>
  );
}
