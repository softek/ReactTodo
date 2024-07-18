import React from 'react';
import { Button as BoostrapButton } from 'reactstrap';

export type ButtonType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';

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
   * Button contents, can be any valid JSX that can be nested under a button element
   */
  children?: React.ReactNode;
  /**
   * Sets the color/type of the button.
   */
  type?: ButtonType;
}

/**
 * Button component that supports text and JSX content.
 */
export function Button({
  label, onClick, type, children,
}: ButtonProps) {
  return (
    <BoostrapButton
      color={type}
      aria-label={label}
      onClick={onClick}
    >
      {children ?? label}
    </BoostrapButton>
  );
}
