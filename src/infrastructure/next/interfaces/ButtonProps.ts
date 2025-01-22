export interface ButtonProps {
  ariaLabel: string;
  className?: string;
  label?: string;
  onClick?: any;
}

export interface ButtonIconProps extends ButtonProps {
  width?: string;
  height?: string;
  fill?: string;
  className?: string;
}
