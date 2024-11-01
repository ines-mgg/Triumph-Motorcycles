import { ButtonProps } from '@triumph-motorcycles/interfaces'
import './Button.css';

export const Button = ({ label, ariaLabel }: ButtonProps) => {
  return (
    <button className="button" aria-label={ariaLabel} data-cy="button">
      {label}
    </button>
  );
};

export default Button;
